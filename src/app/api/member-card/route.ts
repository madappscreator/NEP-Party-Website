import { NextRequest, NextResponse } from 'next/server';
import { admin, db } from '@/lib/firebase-admin';
import { collection, query, where, getDocs, Timestamp } from 'firebase-admin/firestore';

/**
 * Interface for the member data sent to the client.
 */
interface MemberCardData {
  membershipId: string;
  name: string;
  fatherName: string | null;
  phone: string;
  photoUrl: string | null;
  district: string;
  state: string;
  membershipType: string;
  membershipValidUntil: string | null;
  status: string;
  createdAt: string;
  isExServiceman: boolean;
  rank: string | null;
  regiment: string | null;
}

/**
 * API route to fetch member card details after OTP verification.
 * @param req - The incoming NextRequest.
 * @returns A NextResponse with the member data or an error.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];

    try {
      await admin.auth().verifyIdToken(token);
      // The token is valid, proceed.
    } catch (error) {
      console.error('Firebase token verification failed:', error);
      return NextResponse.json({ success: false, error: 'Invalid authentication token' }, { status: 403 });
    }

    // 2. Get phone number from query parameters
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }
    
    const formattedPhone = `+91${phone}`;

    // 3. Query Firestore for the member
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('mobileNumber', '==', formattedPhone));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ success: false, error: 'No membership found for this phone number.' }, { status: 404 });
    }

    // Assuming one phone number corresponds to one member
    const memberDoc = querySnapshot.docs[0];
    const memberData = memberDoc.data();

    // 4. Verify member status
    if (memberData.status !== 'active' || memberData.paymentStatus !== 'approved') {
      let errorMsg = 'Your membership is not active yet.';
      if(memberData.status === 'rejected') {
          errorMsg = 'Your membership application was not approved.';
      } else if (memberData.paymentStatus === 'pending') {
           errorMsg = 'Your payment is still under review.';
      } else {
          errorMsg = 'Your application is still being processed. Please check back later.';
      }
      return NextResponse.json({ success: false, error: errorMsg }, { status: 403 });
    }
    
    // Helper to convert Firestore Timestamp to ISO string
    const toISOString = (ts: Timestamp | Date | undefined) => {
        if (!ts) return null;
        if (ts instanceof Timestamp) return ts.toDate().toISOString();
        if (ts instanceof Date) return ts.toISOString();
        return null;
    };

    // 5. Format data to match the frontend interface
    const responseData: MemberCardData = {
      membershipId: memberData.memberId || `NEP-MEMBER-${memberDoc.id}`,
      name: memberData.name || 'N/A',
      fatherName: memberData.fatherName || null,
      phone: memberData.mobileNumber || formattedPhone,
      photoUrl: memberData.photoUrl || null,
      district: memberData.district || 'N/A',
      state: memberData.state || 'N/A',
      // Assuming `paymentType` field from registration, defaulting to 'BASIC'
      membershipType: memberData.paymentType || 'BASIC',
      membershipValidUntil: toISOString(memberData.membershipApprovedAt), // Example field
      status: memberData.status,
      createdAt: toISOString(memberData.createdAt) || new Date().toISOString(),
      isExServiceman: memberData.isExServiceman || false,
      rank: memberData.rank || null,
      regiment: memberData.regiment || null,
    };

    return NextResponse.json({ success: true, member: responseData });

  } catch (error) {
    console.error('API Error fetching member card:', error);
    return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
  }
}
