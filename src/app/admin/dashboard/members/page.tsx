'use client';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFirebase } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Member } from "@/lib/types";

export default function MembersPage() {
  const { firestore } = useFirebase();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!firestore) return;
      try {
        const membersRef = collection(firestore, 'members');
        const q = query(membersRef, where('status', '==', 'active'));
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
            status: 'active',
            mobileNumber: data.mobileNumber || 'N/A',
            createdAt: data.createdAt,
          });
        });
        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [firestore]);
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>All Members</CardTitle>
            <CardDescription>Manage party members and view their details.</CardDescription>
        </div>
        <Button size="sm" variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Constituency</TableHead>
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
                <TableCell>{member.constituency}</TableCell>
                <TableCell>
                  <Badge variant={member.status === "active" ? "default" : "secondary"} className={member.status === "active" ? "bg-green-600" : ""}>
                    {member.status}
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
                       {member.status === "pending" && <DropdownMenuItem>Approve</DropdownMenuItem>}
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{members.length}</strong> of <strong>{members.length}</strong> members
          </div>
      </CardFooter>
    </Card>
  );
}
