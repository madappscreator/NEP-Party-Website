'use client';

import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function MembersPage() {
  const { members, isLoading } = useAdminMembers();

  return (
    <MembersTableSection
      members={members}
      isLoading={isLoading}
      title="All Members"
      description="View, filter, and export all NEP members."
    />
  );
}
