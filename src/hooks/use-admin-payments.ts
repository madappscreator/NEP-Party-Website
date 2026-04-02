'use client';

import * as React from 'react';
import { collectionGroup, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import type { AdminPayment } from '@/lib/admin/types';

function toDate(value: any): Date | null {
  if (!value) return null;
  if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function pickString(data: Record<string, any>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

export function useAdminPayments() {
  const { firestore } = useFirebase();
  const [payments, setPayments] = React.useState<AdminPayment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPayments = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const approvedPayments = await getDocs(
        query(collectionGroup(firestore, 'payments'), where('status', '==', 'approved'))
      );

      const memberCache = new Map<string, any>();

      const list = await Promise.all(
        approvedPayments.docs.map(async (paymentDoc) => {
          const data = paymentDoc.data();
          const memberId = pickString(data, ['memberId'], '');

          if (memberId && !memberCache.has(memberId)) {
            try {
              const memberSnap = await getDoc(doc(firestore, 'members', memberId));
              memberCache.set(memberId, memberSnap.exists() ? memberSnap.data() : null);
            } catch {
              memberCache.set(memberId, null);
            }
          }

          const memberData = memberId ? memberCache.get(memberId) : null;
          return {
            id: paymentDoc.id,
            memberId: memberId || 'N/A',
            memberName: pickString(memberData || data, ['name', 'fullName'], 'Unknown'),
            memberPhone: pickString(memberData || data, ['mobileNumber', 'phone'], 'N/A'),
            amount: Number(data.amount || 0),
            status: pickString(data, ['status'], 'unknown'),
            transactionId: pickString(data, ['transactionId', 'paymentId'], 'N/A'),
            state: pickString(memberData || data, ['state'], 'N/A'),
            district: pickString(memberData || data, ['district'], 'N/A'),
            createdAt: toDate(data.createdAt),
            createdAtRaw: data.createdAt || null,
          } as AdminPayment;
        })
      );

      list.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setPayments(list);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  React.useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    isLoading,
    refreshPayments: fetchPayments,
  };
}

