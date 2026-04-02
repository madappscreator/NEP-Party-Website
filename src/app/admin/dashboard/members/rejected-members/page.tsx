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
import { MoreHorizontal, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFirebase } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Member } from "@/lib/types";

export default function RejectedMembersPage() {
  const { firestore } = useFirebase();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!firestore) return;
      try {
        const membersRef = collection(firestore, 'members');
        const q = query(membersRef, where('status', '==', 'rejected'));
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
            status: 'rejected',
            mobileNumber: data.mobileNumber || 'N/A',
            createdAt: data.createdAt,
          });
        });
        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching rejected members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [firestore]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rejected Members</CardTitle>
        <CardDescription>View members whose applications were rejected.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <p className="text-muted-foreground">No rejected members.</p>
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
                    <Badge variant="destructive">
                      Rejected
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Reconsider</DropdownMenuItem>
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
          Showing <strong>1-{members.length}</strong> of <strong>{members.length}</strong> rejected members
        </div>
      </CardFooter>
    </Card>
  );
}
