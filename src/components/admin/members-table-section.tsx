'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { downloadCsv, formatDateForFileName, formatDisplayDate } from '@/lib/admin/csv';
import type { AdminMember } from '@/lib/admin/types';
import { FileDown, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type GroupBy = 'state' | 'district' | 'constituency';

type Props = {
  members: AdminMember[];
  isLoading?: boolean;
  title: string;
  description: string;
  groupBy?: GroupBy;
};

function getUniqueValues(list: string[]) {
  return Array.from(new Set(list.filter(Boolean).filter((item) => item !== 'N/A'))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function MembersTableSection({ members, isLoading = false, title, description, groupBy }: Props) {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [state, setState] = React.useState('all');
  const [district, setDistrict] = React.useState('all');
  const [constituency, setConstituency] = React.useState('all');
  const [membershipType, setMembershipType] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  React.useEffect(() => {
    const handle = setTimeout(() => setSearch(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(handle);
  }, [searchInput]);

  const states = React.useMemo(() => getUniqueValues(members.map((member) => member.state)), [members]);
  const districts = React.useMemo(() => {
    const base = state === 'all' ? members : members.filter((member) => member.state === state);
    return getUniqueValues(base.map((member) => member.district));
  }, [members, state]);
  const constituencies = React.useMemo(() => {
    const base = state === 'all' ? members : members.filter((member) => member.state === state);
    return getUniqueValues(base.map((member) => member.constituency));
  }, [members, state]);
  const membershipTypes = React.useMemo(
    () => getUniqueValues(members.map((member) => member.membershipType)),
    [members]
  );

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) => {
      const searchPass =
        !search ||
        member.fullName.toLowerCase().includes(search) ||
        member.phone.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search);
      const statePass = state === 'all' || member.state === state;
      const districtPass = district === 'all' || member.district === district;
      const constituencyPass = constituency === 'all' || member.constituency === constituency;
      const membershipTypePass = membershipType === 'all' || member.membershipType === membershipType;
      return searchPass && statePass && districtPass && constituencyPass && membershipTypePass;
    });
  }, [constituency, district, members, membershipType, search, state]);

  React.useEffect(() => {
    setPage(1);
  }, [search, state, district, constituency, membershipType]);

  const groupedCounts = React.useMemo(() => {
    if (!groupBy) return [];
    const counts = new Map<string, number>();
    const base = members.filter((member) => {
      const statePass = state === 'all' || member.state === state;
      const districtPass = district === 'all' || member.district === district;
      const constituencyPass = constituency === 'all' || member.constituency === constituency;
      const membershipTypePass = membershipType === 'all' || member.membershipType === membershipType;
      return statePass && districtPass && constituencyPass && membershipTypePass;
    });
    for (const member of base) {
      const key = member[groupBy] || 'N/A';
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [constituency, district, groupBy, members, membershipType, state]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const pagedMembers = filteredMembers.slice((page - 1) * pageSize, page * pageSize);

  const applyGroupFilter = (value: string) => {
    if (!groupBy) return;
    if (groupBy === 'state') setState(value);
    if (groupBy === 'district') setDistrict(value);
    if (groupBy === 'constituency') setConstituency(value);
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearch('');
    setState('all');
    setDistrict('all');
    setConstituency('all');
    setMembershipType('all');
  };

  const exportMembers = () => {
    try {
      const rows = filteredMembers.map((member) => ({
        memberId: member.id,
        fullName: member.fullName,
        phone: member.phone,
        email: member.email,
        state: member.state,
        district: member.district,
        constitution: member.constituency,
        membershipType: member.membershipType,
        createdAt: formatDisplayDate(member.createdAt),
      }));
      const fileDate = formatDateForFileName(new Date());
      downloadCsv(`NEP_Members_${fileDate}.csv`, [
        'memberId',
        'fullName',
        'phone',
        'email',
        'state',
        'district',
        'constitution',
        'membershipType',
        'createdAt',
      ], rows);
      toast({ title: 'Export complete', description: 'Members CSV downloaded successfully.' });
    } catch (error) {
      console.error('Members export failed', error);
      toast({ title: 'Export failed', description: 'Unable to export members CSV.', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button variant="outline" onClick={exportMembers}>
          <FileDown className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Input
            placeholder="Search name / phone / email"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districts.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={constituency} onValueChange={setConstituency}>
            <SelectTrigger><SelectValue placeholder="Constitution" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Constitutions</SelectItem>
              {constituencies.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={membershipType} onValueChange={setMembershipType}>
            <SelectTrigger><SelectValue placeholder="Membership Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Membership Types</SelectItem>
              {membershipTypes.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {filteredMembers.length} members</p>
          <Button variant="ghost" size="sm" onClick={resetFilters}>Reset Filters</Button>
        </div>

        {groupBy && groupedCounts.length > 0 ? (
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium mb-2">Grouping Summary</p>
            <div className="flex flex-wrap gap-2">
              {groupedCounts.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => applyGroupFilter(item.name)}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  <Badge variant="secondary">{item.name}: {item.count}</Badge>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {isLoading ? (
          <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">No members found for selected filters.</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Membership Type</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.fullName}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.state}</TableCell>
                    <TableCell>{member.district}</TableCell>
                    <TableCell>{member.membershipType}</TableCell>
                    <TableCell>{formatDisplayDate(member.createdAt)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

