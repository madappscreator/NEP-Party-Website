'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2, RefreshCw } from 'lucide-react';
import { useAdminPayments } from '@/hooks/use-admin-payments';
import { downloadCsv, formatDateForFileName, formatDisplayDate } from '@/lib/admin/csv';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PaymentsReceivedPage() {
  const { payments, isLoading, refreshPayments } = useAdminPayments();
  const { toast } = useToast();

  const exportPayments = () => {
    try {
      const rows = payments.map((payment) => ({
        paymentId: payment.id,
        memberId: payment.memberId,
        memberName: payment.memberName,
        phone: payment.memberPhone,
        amount: payment.amount,
        transactionId: payment.transactionId,
        state: payment.state,
        district: payment.district,
        status: payment.status,
        createdAt: formatDisplayDate(payment.createdAt),
      }));

      downloadCsv(
        `NEP_Payments_Received_${formatDateForFileName(new Date())}.csv`,
        ['paymentId', 'memberId', 'memberName', 'phone', 'amount', 'transactionId', 'state', 'district', 'status', 'createdAt'],
        rows
      );
      toast({ title: 'Export complete', description: 'Payments CSV downloaded successfully.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Export failed', description: 'Unable to export payments CSV.', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Payments Received</CardTitle>
          <CardDescription>View and export approved member payments.</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={refreshPayments}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={exportPayments}>
            <FileDown className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : payments.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">No approved payments found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.memberName}</TableCell>
                  <TableCell>{payment.memberPhone}</TableCell>
                  <TableCell>Rs. {payment.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>{payment.state}, {payment.district}</TableCell>
                  <TableCell>{formatDisplayDate(payment.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
