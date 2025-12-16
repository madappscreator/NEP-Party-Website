// Firestore utility functions for fetching members and related data
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getSdks } from '@/firebase';
import type { Member } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

/**
 * Generate automatic membership ID in format: NEP-CurrentYear-Sequence(100001)
 * This function is called when a member is approved
 * @returns Generated membership ID string
 */
export async function generateMembershipId(): Promise<string> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) throw new Error('Firestore not initialized');

    const currentYear = new Date().getFullYear();
    const counterDocId = `year-${currentYear}`;
    const counterRef = doc(firestore, 'membershipCounters', counterDocId);
    
    try {
      const counterSnap = await getDocs(query(collection(firestore, 'membershipCounters'), where('year', '==', currentYear)));
      
      let nextSequence = 100001;
      if (!counterSnap.empty) {
        const counterDoc = counterSnap.docs[0];
        nextSequence = (counterDoc.data().nextSequence || 100000) + 1;
        await updateDoc(doc(firestore, 'membershipCounters', counterDoc.id), {
          nextSequence: nextSequence,
          updatedAt: new Date(),
        });
      }
      return `NEP-${currentYear}-${nextSequence}`;
    } catch {
      return `NEP-${currentYear}-${100001}`;
    }
  } catch (error) {
    console.error('Error generating membership ID:', error);
    return `NEP-${new Date().getFullYear()}-${100001 + Math.floor(Math.random() * 1000)}`;
  }
}

/**
 * Fetch all active members from Firestore.
 * @returns Array of active members.
 */
export async function getActiveMembers(): Promise<Member[]> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) {
      console.warn('Firestore not initialized');
      return [];
    }

    const membersRef = collection(firestore, 'members');
    const q = query(membersRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);

    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name || 'N/A',
        state: data.state || 'N/A',
        district: data.district || 'N/A',
        constituency: data.constituency || 'N/A',
        status: 'active',
        mobileNumber: data.mobileNumber || 'N/A',
        createdAt: data.createdAt || Timestamp.now(),
      });
    });

    return members;
  } catch (error) {
    console.error('Error fetching active members:', error);
    return [];
  }
}

/**
 * Fetch all pending members awaiting approval from Firestore.
 * @returns Array of pending members.
 */
export async function getPendingMembers(): Promise<Member[]> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) {
      console.warn('Firestore not initialized');
      return [];
    }

    const membersRef = collection(firestore, 'members');
    const q = query(membersRef, where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);

    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name || 'N/A',
        state: data.state || 'N/A',
        district: data.district || 'N/A',
        constituency: data.constituency || 'N/A',
        status: 'pending',
        mobileNumber: data.mobileNumber || 'N/A',
        createdAt: data.createdAt || Timestamp.now(),
      });
    });

    return members;
  } catch (error) {
    console.error('Error fetching pending members:', error);
    return [];
  }
}

/**
 * Fetch all rejected members from Firestore.
 * @returns Array of rejected members.
 */
export async function getRejectedMembers(): Promise<Member[]> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) {
      console.warn('Firestore not initialized');
      return [];
    }

    const membersRef = collection(firestore, 'members');
    const q = query(membersRef, where('status', '==', 'rejected'));
    const querySnapshot = await getDocs(q);

    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name || 'N/A',
        state: data.state || 'N/A',
        district: data.district || 'N/A',
        constituency: data.constituency || 'N/A',
        status: 'rejected',
        mobileNumber: data.mobileNumber || 'N/A',
        createdAt: data.createdAt || Timestamp.now(),
      });
    });

    return members;
  } catch (error) {
    console.error('Error fetching rejected members:', error);
    return [];
  }
}

/**
 * Approve a member and generate their membership ID
 * @param memberId - The ID of the member to approve
 * @returns Promise resolving with the generated membership ID
 */
export async function approveMemberWithId(memberId: string): Promise<string> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) throw new Error('Firestore not initialized');

    const membershipId = await generateMembershipId();
    const memberRef = doc(firestore, 'members', memberId);
    
    await updateDoc(memberRef, {
      status: 'APPROVED',
      membershipId: membershipId,
      approvedAt: new Date(),
      membershipValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });

    return membershipId;
  } catch (error) {
    console.error('Error approving member:', error);
    throw error;
  }
}

/**
 * Reject a member
 * @param memberId - The ID of the member to reject
 * @param reason - Optional reason for rejection
 */
export async function rejectMember(memberId: string, reason?: string): Promise<void> {
  try {
    const { firestore } = getSdks({} as any);
    if (!firestore) throw new Error('Firestore not initialized');

    const memberRef = doc(firestore, 'members', memberId);
    await updateDoc(memberRef, {
      status: 'REJECTED',
      rejectedAt: new Date(),
      rejectionReason: reason || '',
    });
  } catch (error) {
    console.error('Error rejecting member:', error);
    throw error;
  }
}
