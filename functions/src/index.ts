export const generateMembershipId = functions.https.onCall(
  async (data, context) => {

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const uid = context.auth.uid;
    const memberRef = db.doc(`members/${uid}`);
    const counterRef = db.doc('counters/members');
    const year = new Date().getFullYear();

    return await db.runTransaction(async (tx) => {
      const memberSnap = await tx.get(memberRef);

      // 🔒 Prevent double ID generation
      if (memberSnap.exists && memberSnap.data()?.membershipId) {
        return { membershipId: memberSnap.data()!.membershipId };
      }

      const counterSnap = await tx.get(counterRef);

      let next = 100001;

      if (counterSnap.exists) {
        next = (counterSnap.data()?.last || 100000) + 1;
        tx.update(counterRef, { last: next });
      } else {
        tx.set(counterRef, { last: next });
      }

      const membershipId = `NEP-${year}-${String(next).padStart(6, '0')}`;

      // 🔐 Save membershipId to user
      tx.set(
        memberRef,
        { membershipId, membershipIdGeneratedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );

      return { membershipId };
    });
  }
);
