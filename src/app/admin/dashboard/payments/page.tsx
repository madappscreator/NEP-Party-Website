import { redirect } from 'next/navigation';

export default function DashboardPaymentsRootPage() {
  redirect('/admin/dashboard/payments/received');
}
