// API route to handle member approval and auto-generate membership ID
import { NextRequest, NextResponse } from 'next/server';
import { admin, db } from '@/lib/firebase-admin';
import { collection, query, where, getDocs, updateDoc, doc, writeBatch } from 'firebase-admin/firestore';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * Generate automatic membership ID in format: NEP-CurrentYear-Sequence(100001)
 */
async function generateMembershipId(): Promise<string> {
  try {
    const currentYear = new Date().getFullYear();
    const countersRef = collection(db, 'counters');
    const q = query(countersRef, where('year', '==', currentYear));
    const querySnapshot = await getDocs(q);

    let nextSequence = 100001;
    let counterDocId = '';
    
    if (!querySnapshot.empty) {
      const counterDoc = querySnapshot.docs[0];
      counterDocId = counterDoc.id;
      nextSequence = (counterDoc.data().nextSequence || 100000) + 1;
    } else {
      // Will create a new counter doc if needed
      counterDocId = `counter_${currentYear}`;
    }

    // Update or create counter
    const counterRef = doc(db, 'counters', counterDocId);
    await updateDoc(counterRef, {
      year: currentYear,
      nextSequence: nextSequence,
      updatedAt: Timestamp.now(),
    }).catch(async () => {
      // If update fails, try to create
      await db.collection('counters').doc(counterDocId).set({
        year: currentYear,
        nextSequence: nextSequence,
        createdAt: Timestamp.now(),
      });
    });

    return `NEP-${currentYear}-${nextSequence}`;
  } catch (error) {
    console.error('Error generating membership ID:', error);
    // Fallback: generate ID with timestamp
    return `NEP-${new Date().getFullYear()}-${Date.now() % 1000000}`;
  }
}

/**
 * Approve a member and generate membership ID
 * POST /api/admin/approve-member
 * Body: { memberId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    try {
      await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error('Firebase token verification failed:', error);
      return NextResponse.json({ success: false, error: 'Invalid authentication token' }, { status: 403 });
    }

    const { memberId } = await req.json();

    if (!memberId) {
      return NextResponse.json({ success: false, error: 'Member ID is required' }, { status: 400 });
    }

    // Fetch the member
    const memberRef = doc(db, 'members', memberId);
    const memberSnapshot = await admin.firestore().collection('members').doc(memberId).get();

    if (!memberSnapshot.exists) {
      return NextResponse.json({ success: false, error: 'Member not found' }, { status: 404 });
    }

    const memberData = memberSnapshot.data();

    // Generate membership ID if not already present
    let membershipId = memberData?.membershipId;
    if (!membershipId) {
      membershipId = await generateMembershipId();
    }

    // Calculate membership validity (1 year from today for basic, lifetime for others)
    const membershipType = memberData?.membershipType || 'BASIC';
    let membershipValidUntil = null;
    
    if (membershipType === 'BASIC') {
      const validDate = new Date();
      validDate.setFullYear(validDate.getFullYear() + 1);
      membershipValidUntil = Timestamp.fromDate(validDate);
    }

    // Update member status
    await admin.firestore().collection('members').doc(memberId).update({
      status: 'active',
      membershipId: membershipId,
      membershipValidUntil: membershipValidUntil,
      approvedAt: Timestamp.now(),
      approvedBy: 'admin', // In production, get actual admin user ID
    });

    // Send membership card to WhatsApp after approval
    try {
      const memberPhone = memberData?.mobileNumber || memberData?.phone || memberData?.mobile;
      const memberName = memberData?.name;

      if (memberPhone && memberName) {
        // Get base URL from request
        const baseUrl = req.nextUrl.origin;

        await fetch(`${baseUrl}/api/whatsapp/send-card`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: memberPhone,
            memberName: memberName,
            membershipId: membershipId,
            membershipType: membershipType
          })
        });

        console.log(`WhatsApp card notification sent to ${memberPhone}`);
      }
    } catch (whatsappError) {
      // Don't fail the approval if WhatsApp fails
      console.error('WhatsApp notification failed (non-critical):', whatsappError);
    }

    return NextResponse.json({
      success: true,
      message: 'Member approved successfully',
      membershipId: membershipId,
    });

  } catch (error) {
    console.error('API Error approving member:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
  }
}
