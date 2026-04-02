'use client';

import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function MembersByDistrictPage() {
  const { members, isLoading } = useAdminMembers();

  return (
    <MembersTableSection
      members={members}
      isLoading={isLoading}
      title="Members by District"
      description="District-wise member distribution with drill-down filters and export."
      groupBy="district"
    />
  );
}
