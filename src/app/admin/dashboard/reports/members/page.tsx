'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function MembersReportPage() {
  const { members, isLoading } = useAdminMembers();

  const byState = members.reduce((acc, member) => {
    const key = member.state || 'N/A';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byMembershipType = members.reduce((acc, member) => {
    const key = member.membershipType || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topStates = Object.entries(byState).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topTypes = Object.entries(byMembershipType).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Members</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{members.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Top States</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            {topStates.length ? topStates.map(([name, count]) => <p key={name}>{name}: {count}</p>) : <p>N/A</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Top Membership Types</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            {topTypes.length ? topTypes.map(([name, count]) => <p key={name}>{name}: {count}</p>) : <p>N/A</p>}
          </CardContent>
        </Card>
      </div>

      <MembersTableSection
        members={members}
        isLoading={isLoading}
        title="Members Report"
        description="Filter and export members with aggregate insights by state and membership type."
      />
    </div>
  );
}
