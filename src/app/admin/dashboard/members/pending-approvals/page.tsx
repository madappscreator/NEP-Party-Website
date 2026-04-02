'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Loader2, CheckCircle, XCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFirebase } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { approveMemberWithId, rejectMember } from "@/lib/firestore-queries";
import type { Member } from "@/lib/types";

export default function PendingApprovalsPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMembers = async () => {
    if (!firestore) return;
    try {
      const membersRef = collection(firestore, 'members');
      const q = query(membersRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);

      const membersList: Member[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        membersList.push({
          id: doc.id,
          name: data.name || 'N/A',
          state: data.state || 'N/A',
          district: data.district || 'N/A',
          constituency: data.constituency || 'N/A',
          status: 'pending',
          mobileNumber: data.mobileNumber || 'N/A',
          createdAt: data.createdAt,
        });
      });
      setMembers(membersList);
    } catch (error) {
      console.error('Error fetching pending members:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending members',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [firestore]);

  const handleApprove = async (memberId: string, memberName: string) => {
    setActionLoading(memberId);
    try {
      const membershipId = await approveMemberWithId(memberId);
      toast({
        title: 'Success',
        description: `Member ${memberName} approved. Membership ID: ${membershipId}`,
      });
      setMembers(members.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Error approving member:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve member',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (memberId: string, memberName: string) => {
    setActionLoading(memberId);
    try {
      await rejectMember(memberId);
      toast({
        title: 'Success',
        description: `Member ${memberName} rejected`,
      });
      setMembers(members.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Error rejecting member:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject member',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Member Approvals</CardTitle>
        <CardDescription>Review and approve new member registrations.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <p className="text-muted-foreground">No pending members at this time.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.state}</TableCell>
                  <TableCell>{member.district}</TableCell>
                  <TableCell>{member.mobileNumber}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-yellow-600">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost" disabled={actionLoading === member.id}>
                          {actionLoading === member.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem 
                          onClick={() => handleApprove(member.id, member.name)}
                          disabled={actionLoading === member.id}
                          className="text-green-600 cursor-pointer"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve & Generate ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => handleReject(member.id, member.name)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{members.length}</strong> of <strong>{members.length}</strong> pending members
        </div>
      </CardFooter>
    </Card>
  );
}
