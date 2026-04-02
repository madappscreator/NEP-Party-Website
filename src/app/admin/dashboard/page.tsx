'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MembersTableSection } from '@/components/admin/members-table-section';
import { useAdminMembers } from '@/hooks/use-admin-members';

export default function DashboardPage() {
  const { members, isLoading } = useAdminMembers();

  const membershipTypeStats = React.useMemo(() => {
    const counts = members.reduce((acc, member) => {
      const type = member.membershipType || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topThree = sorted.slice(0, 3);
    const othersCount = sorted.slice(3).reduce((sum, [, value]) => sum + value, 0);

    return { topThree, othersCount };
  }, [members]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Membership insights and member management.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '-' : members.length}</div>
            <CardDescription>All registered members</CardDescription>
          </CardContent>
        </Card>

        {membershipTypeStats.topThree.map(([type, count]) => (
          <Card key={type}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Membership Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{type}</div>
              <CardDescription>{count} members</CardDescription>
            </CardContent>
          </Card>
        ))}

        {membershipTypeStats.othersCount > 0 ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Other Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membershipTypeStats.othersCount}</div>
              <CardDescription>Combined from remaining membership types</CardDescription>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <MembersTableSection
        members={members}
        isLoading={isLoading}
        title="Members"
        description="Search and filter members directly from the dashboard."
      />
    </div>
  );
}
