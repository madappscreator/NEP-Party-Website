import type { Timestamp } from 'firebase/firestore';

export type AdminMember = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  constituency: string;
  membershipType: string;
  createdAt: Date | null;
  createdAtRaw?: Timestamp | null;
};

export type AdminPayment = {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  amount: number;
  status: string;
  transactionId: string;
  state: string;
  district: string;
  createdAt: Date | null;
  createdAtRaw?: Timestamp | null;
};

