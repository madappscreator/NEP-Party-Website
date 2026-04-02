import { redirect } from 'next/navigation';

export default function DashboardReportsRootPage() {
  redirect('/admin/dashboard/reports/members');
}
