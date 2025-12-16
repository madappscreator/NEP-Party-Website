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
import { CheckCircle2, MoreHorizontal, User, XCircle, Eye, Loader2, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import * as React from 'react';
import { useFirebase } from "@/firebase";
import { collectionGroup, query, where, getDocs, doc, runTransaction, getDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

type PendingPayment = {
  id: string; // payment doc id
  memberId: string;
  amount: number;
  transactionRef: string;
  screenshotUrl: string;
  date: string;
  memberName: string;
  mobile: string;
  location: string;
  rawDate: any;
};

export default function PendingPaymentsPage() {
  const [payments, setPayments] = React.useState<PendingPayment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [processingId, setProcessingId] = React.useState<string | null>(null);
  const [debugError, setDebugError] = React.useState<string | null>(null);
  
  const { firestore } = useFirebase();
  const { toast } = useToast();

  const fetchPendingPayments = React.useCallback(async () => {
    if (!firestore) return;
    setIsLoading(true);
    setDebugError(null);
    try {
      console.log("Fetching pending payments...");
      
      // Index is enabled now, so we can use the efficient query
      const q = query(
          collectionGroup(firestore, 'payments'), 
          where('status', '==', 'pending')
      );
      
      const querySnapshot = await getDocs(q);
      console.log(`Found ${querySnapshot.size} pending payment documents.`);

      if (querySnapshot.empty) {
          setPayments([]);
          return;
      }

      const fetchedPayments: PendingPayment[] = [];

      for (const paymentDoc of querySnapshot.docs) {
        const paymentData = paymentDoc.data();
        const memberId = paymentData.memberId;
        
        // Fetch detailed member info
        let memberName = "Unknown";
        let mobile = "Unknown";
        let location = "Unknown";

        try {
            const memberDoc = await getDoc(doc(firestore, 'members', memberId));
            if (memberDoc.exists()) {
                const memberData = memberDoc.data();
                memberName = memberData.name || "Unknown";
                mobile = memberData.mobileNumber || "Unknown";
                location = `${memberData.state || ''} / ${memberData.district || ''}`;
            } else {
                console.warn(`Member document ${memberId} not found for payment ${paymentDoc.id}`);
            }
        } catch (e) {
            console.error(`Error fetching member ${memberId}:`, e);
        }

        fetchedPayments.push({
          id: paymentDoc.id,
          memberId: memberId,
          amount: paymentData.amount || 0,
          transactionRef: paymentData.transactionId || 'N/A',
          screenshotUrl: paymentData.paymentScreenshotUrl || '',
          date: paymentData.createdAt?.toDate ? paymentData.createdAt.toDate().toLocaleDateString() : 'N/A',
          rawDate: paymentData.createdAt,
          memberName,
          mobile,
          location
        });
      }
      
      // Client-side sort
      fetchedPayments.sort((a, b) => {
          const timeA = a.rawDate?.seconds || 0;
          const timeB = b.rawDate?.seconds || 0;
          return timeB - timeA;
      });

      setPayments(fetchedPayments);
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      setDebugError(error.message);
      toast({ title: "Error", description: "Failed to load pending payments.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [firestore, toast]);

  React.useEffect(() => {
    fetchPendingPayments();
  }, [fetchPendingPayments]);

  const handleApprove = async (payment: PendingPayment) => {
    if (!firestore) return;
    setProcessingId(payment.id);

    try {
        await runTransaction(firestore, async (transaction) => {
            // 1. Get the global counter for ID generation
            const counterRef = doc(firestore, 'counters', 'members');
            const counterDoc = await transaction.get(counterRef);
            
            let newCount = 100001; // Default start
            if (counterDoc.exists()) {
                newCount = counterDoc.data().current + 1;
            }

            // 2. Generate new ID with CURRENT YEAR
            const currentYear = new Date().getFullYear();
            const newMemberId = `NEP-${currentYear}-${newCount}`;

            // 3. References
            const paymentRef = doc(firestore, `members/${payment.memberId}/payments`, payment.id);
            const memberRef = doc(firestore, `members/${payment.memberId}`);

            // 4. Updates
            transaction.set(counterRef, { current: newCount }, { merge: true });
            
            // Update Payment Status
            transaction.update(paymentRef, { 
                status: 'approved',
                approvedAt: serverTimestamp()
            });
            
            // Update Member Status AND Payment Status on Member Doc
            transaction.update(memberRef, { 
                status: 'APPROVED',
                paymentStatus: 'approved',
                membershipId: newMemberId,
                membershipValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                membershipApprovedAt: serverTimestamp()
            });
        });

        toast({ title: "Approved", description: `Member approved successfully.` });
        fetchPendingPayments(); // Refresh list

    } catch (error) {
        console.error("Approval error:", error);
        toast({ title: "Error", description: "Failed to approve payment.", variant: "destructive" });
    } finally {
        setProcessingId(null);
    }
  };

  const handleReject = async (payment: PendingPayment) => {
      if (!firestore) return;
      if (!confirm("Are you sure you want to reject this payment?")) return;
      setProcessingId(payment.id);
      try {
          const paymentRef = doc(firestore, `members/${payment.memberId}/payments`, payment.id);
          const memberRef = doc(firestore, `members/${payment.memberId}`);

           await runTransaction(firestore, async (transaction) => {
                transaction.update(paymentRef, { 
                    status: 'rejected',
                    rejectedAt: serverTimestamp()
                });
                transaction.update(memberRef, { 
                    status: 'REJECTED',
                    paymentStatus: 'rejected'
                });
           });
           
           toast({ title: "Rejected", description: "Payment has been rejected." });
           fetchPendingPayments();
      } catch (error) {
          console.error("Rejection error:", error);
          toast({ title: "Error", description: "Failed to reject payment.", variant: "destructive" });
      } finally {
          setProcessingId(null);
      }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Pending Payment Verification</CardTitle>
            <CardDescription>Verify manually submitted payments to approve memberships.</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={fetchPendingPayments} disabled={isLoading}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {debugError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4 text-sm font-mono break-all">
                Query Error: {debugError}
            </div>
        )}

        {isLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
        ) : payments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No pending payments found.</div>
        ) : (
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
                  <div className="font-medium">{payment.memberName}</div>
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
                      <div className="relative w-full h-[60vh]">
                        {payment.screenshotUrl ? (
                             <Image 
                                src={payment.screenshotUrl} 
                                alt={`Screenshot for ${payment.transactionRef}`} 
                                fill
                                className="object-contain rounded-md" 
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">No Image Available</div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0" 
                        onClick={() => handleApprove(payment)}
                        disabled={!!processingId}
                      >
                          {processingId === payment.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleReject(payment)}
                        disabled={!!processingId}
                      >
                          <XCircle className="h-4 w-4" />
                      </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
       <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{payments.length}</strong> pending payments
          </div>
      </CardFooter>
    </Card>
  );
}
