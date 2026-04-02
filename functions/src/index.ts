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

function formatDate(value: any): string {
  if (!value) return 'N/A';
  if (value?.toDate && typeof value.toDate === 'function') {
    return value.toDate().toLocaleString('en-IN');
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'N/A';
  return parsed.toLocaleString('en-IN');
}

const adminEmails = (process.env.ADMIN_NOTIFICATION_EMAILS || '')
  .split(',')
  .map((email) => email.trim())
  .filter(Boolean);

export const notifyAdminOnMemberRegistration = functions.firestore
  .document('members/{memberId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data() || {};

    if (adminEmails.length === 0) {
      functions.logger.warn('Admin email notification skipped: ADMIN_NOTIFICATION_EMAILS is not configured.');
      return null;
    }

    const memberName = data.name || data.fullName || 'N/A';
    const memberPhone = data.mobileNumber || data.phone || 'N/A';
    const memberEmail = data.email || 'N/A';
    const state = data.state || 'N/A';
    const district = data.district || 'N/A';
    const membershipType = data.membershipType || 'Unknown';
    const registrationTime = formatDate(data.createdAt);

    const subject = 'New Member Registration - NEP';
    const text = [
      'A new member has registered in NEP.',
      '',
      `Member ID: ${context.params.memberId}`,
      `Name: ${memberName}`,
      `Phone: ${memberPhone}`,
      `Email: ${memberEmail}`,
      `State: ${state}`,
      `District: ${district}`,
      `Membership Type: ${membershipType}`,
      `Registration Time: ${registrationTime}`,
    ].join('\n');

    await db.collection('mail').add({
      to: adminEmails,
      message: {
        subject,
        text,
        html: `
        <p>A new member has registered in NEP.</p>
        <ul>
          <li><strong>Member ID:</strong> ${context.params.memberId}</li>
          <li><strong>Name:</strong> ${memberName}</li>
          <li><strong>Phone:</strong> ${memberPhone}</li>
          <li><strong>Email:</strong> ${memberEmail}</li>
          <li><strong>State:</strong> ${state}</li>
          <li><strong>District:</strong> ${district}</li>
          <li><strong>Membership Type:</strong> ${membershipType}</li>
          <li><strong>Registration Time:</strong> ${registrationTime}</li>
        </ul>
      `,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    functions.logger.info('Admin member registration email sent', {
      memberId: context.params.memberId,
      to: adminEmails,
    });

    return null;
  });
