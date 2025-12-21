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
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to generate membership ID');
  }

  try {
    const counterRef = db.doc('counters/members');
    const currentYear = new Date().getFullYear();
    let membershipId = '';

    // Use a simple document update with field values
    const counterDoc = await counterRef.get();
    
    if (!counterDoc.exists) {
      // Initialize counter at 100001
      await counterRef.set({ last: 100001, createdAt: new Date() });
      membershipId = `NEP-${currentYear}-100001`;
    } else {
      // Increment counter
      const currentData = counterDoc.data();
      const lastValue = currentData?.last || 100000;
      const nextValue = lastValue + 1;
      
      await counterRef.update({ last: nextValue });
      membershipId = `NEP-${currentYear}-${String(nextValue).padStart(6, '0')}`;
    }

    return { membershipId };
  } catch (err: any) {
    console.error('Error generating membershipId:', err);
    throw new functions.https.HttpsError('internal', `Failed to generate membership ID: ${err.message}`);
  }
});
