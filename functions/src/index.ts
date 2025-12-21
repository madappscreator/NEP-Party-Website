import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize the admin SDK once for this function bundle
admin.initializeApp();

const db = admin.firestore();

/**
 * Callable function to generate a sequential membership ID.
 * - Requires an authenticated user (context.auth present).
 * - Uses a Firestore document in `counters/members` to track the sequence.
 * - Returns an object: { membershipId: string }
 * - Format: NEP-<YYYY>-<6-digit-sequence> (e.g., NEP-2025-100007)
 */
export const generateMembershipId = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  console.log('generateMembershipId called with auth:', context.auth?.uid);
  
  // Verify user is authenticated
  if (!context.auth) {
    console.log('User not authenticated');
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to generate membership ID');
  }

  try {
    console.log('Starting membership ID generation');
    const counterRef = db.doc('counters/members');
    const currentYear = new Date().getFullYear();
    let membershipId = '';

    // Use a simple document update with field values
    const counterDoc = await counterRef.get();
    console.log('Counter doc exists:', counterDoc.exists);
    
    if (!counterDoc.exists) {
      console.log('Initializing counter at 100001');
      // Initialize counter at 100001
      await counterRef.set({ last: 100001, createdAt: admin.firestore.Timestamp.now() });
      membershipId = `NEP-${currentYear}-100001`;
    } else {
      console.log('Counter doc data:', counterDoc.data());
      // Increment counter
      const currentData = counterDoc.data();
      const lastValue = currentData?.last || 100000;
      const nextValue = lastValue + 1;
      
      console.log(`Incrementing counter from ${lastValue} to ${nextValue}`);
      await counterRef.update({ last: nextValue, updatedAt: admin.firestore.Timestamp.now() });
      membershipId = `NEP-${currentYear}-${String(nextValue).padStart(6, '0')}`;
    }

    console.log('Generated membership ID:', membershipId);
    return { membershipId };
  } catch (err: any) {
    console.error('Error generating membershipId:', err);
    const errorMessage = err?.message || 'Unknown error';
    throw new functions.https.HttpsError('internal', `Failed to generate membership ID: ${errorMessage}`);
  }
});
