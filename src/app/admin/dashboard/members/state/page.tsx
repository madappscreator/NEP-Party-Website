'use client';

import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function MembersByStatePage() {
  const { members, isLoading } = useAdminMembers();

  return (
    <MembersTableSection
      members={members}
      isLoading={isLoading}
      title="Members by State"
      description="State-wise member distribution with drill-down filters and export."
      groupBy="state"
    />
  );
}
