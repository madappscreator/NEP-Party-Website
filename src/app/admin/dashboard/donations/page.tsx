import { redirect } from 'next/navigation';

export default function DonationsAliasPage() {
  redirect('/admin/dashboard/payments/received');
}
