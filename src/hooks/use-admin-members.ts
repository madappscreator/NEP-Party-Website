'use client';

import * as React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import type { AdminMember } from '@/lib/admin/types';

function toDate(value: any): Date | null {
  if (!value) return null;
  if (value?.toDate && typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function pickString(data: Record<string, any>, keys: string[], fallback = 'N/A'): string {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

export function useAdminMembers() {
  const { firestore } = useFirebase();
  const [members, setMembers] = React.useState<AdminMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchMembers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, 'members'));
      const list: AdminMember[] = snapshot.docs.map((memberDoc) => {
        const data = memberDoc.data();
        return {
          id: memberDoc.id,
          fullName: pickString(data, ['name', 'fullName']),
          phone: pickString(data, ['mobileNumber', 'phone']),
          email: pickString(data, ['email'], ''),
          state: pickString(data, ['state']),
          district: pickString(data, ['district']),
          constituency: pickString(data, ['constituency', 'constitution']),
          membershipType: pickString(data, ['membershipType'], 'Unknown'),
          createdAt: toDate(data.createdAt),
          createdAtRaw: data.createdAt || null,
        };
      });
      list.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setMembers(list);
    } finally {
      setIsLoading(false);
    }
  }, [firestore]);

  React.useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    isLoading,
    refreshMembers: fetchMembers,
  };
}

