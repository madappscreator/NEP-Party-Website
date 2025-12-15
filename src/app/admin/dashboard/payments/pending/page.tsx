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
import { DUMMY_PENDING_PAYMENTS } from "@/lib/constants";
import { CheckCircle2, MoreHorizontal, User, XCircle, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function PendingPaymentsPage() {
  const payments = DUMMY_PENDING_PAYMENTS;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Payment Verification</CardTitle>
        <CardDescription>Verify manually submitted payments to approve memberships.</CardDescription>
      </CardHeader>
      <CardContent>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Ref / Proof</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="font-medium">{payment.name}</div>
                  <div className="text-xs text-muted-foreground">{payment.memberId}</div>
                </TableCell>
                <TableCell>{payment.mobile}</TableCell>
                <TableCell>{payment.location}</TableCell>
                <TableCell className="text-right">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <div className="font-mono text-xs">{payment.transactionRef}</div>
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto">View Screenshot</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Payment Screenshot</DialogTitle>
                      </DialogHeader>
                      <Image src={payment.screenshotUrl} alt={`Screenshot for ${payment.transactionRef}`} width={400} height={800} className="w-full h-auto object-contain rounded-md" data-ai-hint="payment screenshot" />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
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
                      <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                       <DropdownMenuItem className="text-destructive">
                         <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                       <DropdownMenuItem>
                         <User className="mr-2 h-4 w-4" />
                        View Member
                      </DropdownMenuItem>
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
            Showing <strong>1-{payments.length}</strong> of <strong>{payments.length}</strong> pending payments
          </div>
      </CardFooter>
    </Card>
  );
}
