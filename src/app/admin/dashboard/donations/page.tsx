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
import { DUMMY_DONATIONS } from "@/lib/constants";
import { FileDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DonationsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>Approved Payments</CardTitle>
            <CardDescription>View all verified member payments and donations.</CardDescription>
        </div>
        <Button size="sm" variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_DONATIONS.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.donorName}</TableCell>
                <TableCell className="text-right">₹{donation.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>{donation.date}</TableCell>
                <TableCell>
                  <Badge variant={donation.status === "Verified" ? "default" : "secondary"} className={donation.status === "Verified" ? "bg-green-600" : ""}>
                    {donation.status}
                  </Badge>
                </TableCell>
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
                       {donation.status === "Pending" && <DropdownMenuItem>Verify</DropdownMenuItem>}
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                       <DropdownMenuItem>Generate Receipt</DropdownMenuItem>
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
            Showing <strong>1-{DUMMY_DONATIONS.length}</strong> of <strong>{DUMMY_DONATIONS.length}</strong> payments
          </div>
      </CardFooter>
    </Card>
  );
}
