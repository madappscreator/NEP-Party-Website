'use server';

import { firebaseConfig } from "@/firebase/config";

// Helper function to perform the raw upload
async function performUpload(bucketName: string, path: string, contentType: string, buffer: Buffer) {
    const encodedPath = encodeURIComponent(path);
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o?name=${encodedPath}`;
    
    console.log(`Server Action: Attempting upload to ${uploadUrl}`);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
      },
      body: buffer,
    });

    return { response, encodedPath, usedBucket: bucketName };
}

export async function uploadFileServerAction(path: string, base64Data: string) {
  try {
    const projectId = firebaseConfig.projectId || "studio-8928688313-be767";
    
    // Candidate buckets to try in order
    const candidates = [
        firebaseConfig.storageBucket, // The one from config (if exists)
        `${projectId}.firebasestorage.app`, // New default
        `${projectId}.appspot.com`, // Legacy default
        // Add the exact one user provided just in case config was wrong
        "studio-8928688313-be767.firebasestorage.app"
    ].filter(Boolean); // Remove null/undefined

    // Remove duplicates
    const uniqueCandidates = [...new Set(candidates)];

    // 1. Parse Base64
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid input string');
    }
    const contentType = matches[1];
    const b64Data = matches[2];
    const buffer = Buffer.from(b64Data, 'base64');

    let lastErrorResponse = "";
    let successfulResponse = null;
    let successfulBucket = "";
    let encodedPath = "";

    // 2. Try Loop
    for (const bucket of uniqueCandidates) {
        console.log(`Server Action: Trying bucket candidate: ${bucket}`);
        const result = await performUpload(bucket, path, contentType, buffer);
        
        if (result.response.ok) {
            successfulResponse = result.response;
            successfulBucket = result.usedBucket;
            encodedPath = result.encodedPath;
            break; // Success!
        } else {
            lastErrorResponse = await result.response.text();
            console.warn(`Server Action: Failed on ${bucket}: ${result.response.status} - ${lastErrorResponse}`);
            // If it's NOT a 404, it might be a perm issue, but we continue trying just in case.
        }
    }

    if (!successfulResponse) {
        throw new Error(`All attempts failed. Last error: ${lastErrorResponse}`);
    }

    const data = await successfulResponse.json();

    // 4. Construct Download URL
    const downloadToken = data.downloadTokens;
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${successfulBucket}/o/${encodedPath}?alt=media&token=${downloadToken}`;

    return { success: true, url: downloadURL };

  } catch (error: any) {
    console.error("Server Action Upload Error:", error);
    return { success: false, error: error.message || "Unknown server error" };
  }
}
