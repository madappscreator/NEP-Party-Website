import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export const generateMembershipId = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to generate a membership ID.'
      );
    }

    const counterRef = db.doc('counters/members');
    const year = new Date().getFullYear();

    // Use a transaction to ensure atomic increment
    return await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      let nextSequence = 100001; // Starting sequence number

      if (counterDoc.exists) {
        // If counter exists, increment the last sequence number
        const lastSequence = counterDoc.data()?.last || 100000;
        nextSequence = lastSequence + 1;
        transaction.update(counterRef, { 
            last: nextSequence, 
            updatedAt: admin.firestore.FieldValue.serverTimestamp() 
        });
      } else {
        // If counter does not exist, create it with the starting number
        transaction.set(counterRef, { 
            last: nextSequence, 
            createdAt: admin.firestore.FieldValue.serverTimestamp() 
        });
      }

      // Format the membership ID
      const membershipId = `NEP-${year}-${String(nextSequence).padStart(6, '0')}`;
      
      return { membershipId };
    });
  }
);
