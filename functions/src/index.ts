import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize the admin SDK once for this function bundle
admin.initializeApp();

const db = admin.firestore();

/**
 * Callable function to generate a sequential membership ID.
 * - Requires an authenticated user (context.auth present).
 * - Uses a Firestore transaction on `counters/members` to increment `last`.
 * - Returns an object: { membershipId: string }
 *
 * Security: this function runs with admin privileges, so Firestore rules
 * are bypassed for the operations inside. The client must authenticate
 * before calling this function (and the caller should enforce server-side
 * checks as needed).
 */
export const generateMembershipId = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to generate membership ID');
  }

  try {
    const counterRef = db.doc('counters/members');

    const membershipId = await db.runTransaction(async (tx) => {
      const snap = await tx.get(counterRef);
      let next = 1;
      if (!snap.exists) {
        tx.set(counterRef, { last: 1 });
        next = 1;
      } else {
        const data: any = snap.data();
        const last = data?.last || 0;
        next = last + 1;
        tx.update(counterRef, { last: next });
      }

      const id = `NEP${String(next).padStart(6, '0')}`;
      return id;
    });

    return { membershipId };
  } catch (err: any) {
    console.error('Error generating membershipId:', err);
    throw new functions.https.HttpsError('internal', 'Failed to generate membership ID');
  }
});
