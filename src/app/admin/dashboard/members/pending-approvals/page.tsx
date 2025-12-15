import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PendingApprovalsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Member Approvals</CardTitle>
        <CardDescription>Review and approve new member registrations.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Pending approvals table will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
