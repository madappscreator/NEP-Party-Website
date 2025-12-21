export const generateMembershipId = functions
  .region('us-central1')
  .runWith({ runtime: 'nodejs18', timeoutSeconds: 30 })
  .https.onCall(async (_, context) => {

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const db = admin.firestore();
    const counterRef = db.doc('counters/members');
    const year = new Date().getFullYear();

    try {
      const membershipId = await db.runTransaction(async (tx) => {
        const snap = await tx.get(counterRef);

        let nextValue = 100001;

        if (snap.exists) {
          const last = snap.data()?.last;
          nextValue = typeof last === 'number' ? last + 1 : 100001;
          tx.update(counterRef, {
            last: nextValue,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          tx.set(counterRef, {
            last: nextValue,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        }

        return `NEP-${year}-${String(nextValue).padStart(6, '0')}`;
      });

      return { membershipId };

    } catch (err) {
      console.error('generateMembershipId failed', err);
      throw new functions.https.HttpsError(
        'internal',
        'Membership ID generation failed'
      );
    }
  });
