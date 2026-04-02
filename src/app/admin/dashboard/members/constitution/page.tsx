'use client';

import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function MembersByConstitutionPage() {
  const { members, isLoading } = useAdminMembers();

  return (
    <MembersTableSection
      members={members}
      isLoading={isLoading}
      title="Members by Constitution"
      description="Constitution/constituency-wise member distribution with drill-down filters and export."
      groupBy="constituency"
    />
  );
}
