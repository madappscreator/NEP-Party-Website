import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PendingPaymentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Payment Verification</CardTitle>
        <CardDescription>Verify manually submitted payments to approve memberships.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Pending payments table will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
