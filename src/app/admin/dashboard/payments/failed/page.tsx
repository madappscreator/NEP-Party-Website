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
import { Loader2, RefreshCcw, XCircle } from "lucide-react";
import * as React from 'react';
import { useFirebase } from "@/firebase";
import { collectionGroup, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

type FailedPayment = {
  id: string;
  memberId: string;
  donorName: string;
  amount: number;
  date: string;
  rawDate: any;
  status: string;
  reason?: string;
};

export default function FailedPaymentsPage() {
  const [payments, setPayments] = React.useState<FailedPayment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const fetchPayments = React.useCallback(async () => {
    if (!firestore) return;
    setIsLoading(true);
    try {
      // Query rejected or failed payments
      // We might need an 'in' query or just fetch rejected for now.
      const q = query(collectionGroup(firestore, 'payments'), where('status', '==', 'rejected'));
      const querySnapshot = await getDocs(q);
      
      const fetchedPayments: FailedPayment[] = [];

      const paymentDocs = querySnapshot.docs;
      
      await Promise.all(paymentDocs.map(async (pDoc) => {
          const data = pDoc.data();
          let donorName = "Unknown";
          
          try {
              if (data.memberId) {
                const memberSnap = await getDoc(doc(firestore, 'members', data.memberId));
                if (memberSnap.exists()) {
                    donorName = memberSnap.data().name || "Unknown";
                }
              }
          } catch (e) {
              console.error("Error fetching donor name", e);
          }

          fetchedPayments.push({
              id: pDoc.id,
              memberId: data.memberId,
              donorName: donorName,
              amount: data.amount || 0,
              date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'N/A',
              rawDate: data.createdAt,
              status: 'Rejected',
              reason: data.rejectionReason || 'Verification Failed'
          });
      }));

      // Client-side sort (Newest first)
      fetchedPayments.sort((a, b) => (b.rawDate?.seconds || 0) - (a.rawDate?.seconds || 0));

      setPayments(fetchedPayments);

    } catch (error) {
      console.error("Error fetching failed payments:", error);
      toast({ title: "Error", description: "Failed to load payments.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [firestore, toast]);

  React.useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>Failed / Rejected Payments</CardTitle>
            <CardDescription>Payments that were rejected or failed verification.</CardDescription>
        </div>
        <Button size="icon" variant="outline" onClick={fetchPayments} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
             <div className="flex justify-center py-8"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
        ) : payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No failed payments found.</div>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                    {payment.donorName}
                    <div className="text-xs text-muted-foreground">{payment.memberId}</div>
                </TableCell>
                <TableCell className="text-right">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="text-muted-foreground">{payment.reason}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="flex w-fit items-center gap-1">
                    <XCircle className="h-3 w-3" /> {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
      <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{payments.length}</strong> records
          </div>
      </CardFooter>
    </Card>
  );
}
