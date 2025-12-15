import type { LucideIcon } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

export type NavItem = {
  href: string;
  label: string;
  icon?: keyof typeof import('lucide-react')['icons'];
};

export type Language = {
  code: string;
  name: string;
};

export type NewsArticle = {
    id: string;
    title: string;
    date: string;
    source: string;
    imageId: string;
    content: string;
};

export type Member = {
    id: string;
    name:string;
    state: string;
    district: string;
    constituency: string;
    status: 'active' | 'pending' | 'rejected';
    mobileNumber: string;
    createdAt: Timestamp;
};

export type Payment = {
    id: string;
    memberId: string;
    amount: number;
    date: string;
    status: 'approved' | 'pending' | 'failed';
    name: string;
    mobile: string;
    location: string;
    paymentMode: 'UPI' | 'QR' | 'Bank';
    transactionRef: string;
    screenshotUrl: string;
    createdAt: Timestamp;
};


export type ManifestoPoint = {
    title: string;
    description: string;
    icon: keyof typeof import('lucide-react')['icons'];
};

export type AlbumMedia = {
  type: 'image' | 'video';
  url: string;
  alt: string;
  hint: string;
};

export type Album = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  coverImageHint: string;
  media: AlbumMedia[];
};

export type Wing = {
  name: string;
  description: string;
  icon: keyof typeof import('lucide-react')['icons'];
};

export type Donation = {
    id: string;
    donorName: string;
    amount: number;
    date: string;
    status: 'Verified' | 'Pending';
};

export type PendingPayment = {
  id: string;
  memberId: string;
  name: string;
  mobile: string;
  location: string;
  amount: number;
  paymentMode: 'UPI' | 'QR' | 'Bank';
  transactionRef: string;
  screenshotUrl: string;
  status: 'Pending';
  date: string;
};
