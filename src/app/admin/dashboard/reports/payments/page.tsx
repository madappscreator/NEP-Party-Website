'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileDown, Loader2 } from 'lucide-react';
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

export default function PaymentsReportPage() {
  const { payments, isLoading } = useAdminPayments();
  const { toast } = useToast();
  const [dateFilter, setDateFilter] = React.useState<'7d' | '30d' | 'custom'>('30d');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');

  const filtered = React.useMemo(() => {
    const now = new Date();
    let start = new Date(0);
    let end = new Date(now);

    if (dateFilter === '7d') {
      start = new Date(now);
      start.setDate(start.getDate() - 7);
    } else if (dateFilter === '30d') {
      start = new Date(now);
      start.setDate(start.getDate() - 30);
    } else {
      start = fromDate ? new Date(fromDate) : new Date(0);
      end = toDate ? new Date(`${toDate}T23:59:59`) : new Date(now);
    }

    return payments.filter((payment) => {
      if (!payment.createdAt) return false;
      return payment.createdAt >= start && payment.createdAt <= end;
    });
  }, [dateFilter, fromDate, payments, toDate]);

  const totalAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);

  const exportPayments = () => {
    try {
      const rows = filtered.map((payment) => ({
        paymentId: payment.id,
        memberId: payment.memberId,
        memberName: payment.memberName,
        phone: payment.memberPhone,
        amount: payment.amount,
        status: payment.status,
        transactionId: payment.transactionId,
        createdAt: formatDisplayDate(payment.createdAt),
      }));

      downloadCsv(
        `NEP_Payments_Report_${formatDateForFileName(new Date())}.csv`,
        ['paymentId', 'memberId', 'memberName', 'phone', 'amount', 'status', 'transactionId', 'createdAt'],
        rows
      );
      toast({ title: 'Export complete', description: 'Payments report CSV downloaded successfully.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Export failed', description: 'Unable to export payments report.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payments Report</CardTitle>
          <CardDescription>View payments, aggregate totals, and export data by date range.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant={dateFilter === '7d' ? 'default' : 'outline'} onClick={() => setDateFilter('7d')}>Last 7 Days</Button>
            <Button variant={dateFilter === '30d' ? 'default' : 'outline'} onClick={() => setDateFilter('30d')}>Last 30 Days</Button>
            <Button variant={dateFilter === 'custom' ? 'default' : 'outline'} onClick={() => setDateFilter('custom')}>Custom Range</Button>
            <Button variant="outline" onClick={exportPayments}><FileDown className="h-4 w-4 mr-2" />Export CSV</Button>
          </div>

          {dateFilter === 'custom' ? (
            <div className="grid gap-3 md:grid-cols-2">
              <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
              <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Payments Count</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">{filtered.length}</p></CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Total Received Amount</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold">Rs. {totalAmount.toLocaleString('en-IN')}</p></CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="py-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">No payments found for selected range.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.memberName}</TableCell>
                    <TableCell>{payment.memberPhone}</TableCell>
                    <TableCell>Rs. {payment.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>{formatDisplayDate(payment.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
