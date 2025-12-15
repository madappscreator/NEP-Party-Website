'use client';

import { BarChart, DonutChart } from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileDown, Users, UserCheck, Wallet, Search } from 'lucide-react';
import { indianGeography } from '@/lib/geography';
import * as React from 'react';
import { Input } from '@/components/ui/input';

const memberDataByState = [
  { name: 'Tamil Nadu', value: 120, fill: 'var(--color-chart-1)' },
  { name: 'Maharashtra', value: 98, fill: 'var(--color-chart-2)' },
  { name: 'Uttar Pradesh', value: 87, fill: 'var(--color-chart-3)' },
  { name: 'Karnataka', value: 76, fill: 'var(--color-chart-4)' },
  { name: 'Delhi', value: 54, fill: 'var(--color-chart-5)' },
  { name: 'Other', value: 112, fill: 'hsl(var(--muted))' },
];

const memberDataByDistrict = [
    { name: 'Chennai', value: 45, fill: 'var(--color-chart-1)' },
    { name: 'Coimbatore', value: 32, fill: 'var(--color-chart-2)' },
    { name: 'Madurai', value: 28, fill: 'var(--color-chart-3)' },
    { name: 'Salem', value: 15, fill: 'var(--color-chart-4)' },
];

const registrationActivity = [
    { date: "Jan", registrations: 23 },
    { date: "Feb", registrations: 31 },
    { date: "Mar", registrations: 45 },
    { date: "Apr", registrations: 62 },
    { date: "May", registrations: 53 },
    { date: "Jun", registrations: 78 },
];


export default function DashboardPage() {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');

  const districts = selectedState ? indianGeography.find(s => s.name === selectedState)?.districts || [] : [];
  
  return (
    <div className="flex flex-col gap-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+0 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              New applicants waiting for verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            <p className="text-xs text-muted-foreground">
              +₹0 this month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
              <CardTitle className="text-sm font-medium">Download Reports</CardTitle>
              <CardDescription className="text-xs">Export member or payment data.</CardDescription>
          </CardHeader>
          <CardContent>
                <Button size="sm" className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Data
                </Button>
          </CardContent>
        </Card>
      </div>

        <Card>
            <CardHeader>
                <CardTitle>Member Analytics</CardTitle>
                <CardDescription>Visualize member registrations across different regions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="border rounded-lg p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <Select onValueChange={setSelectedState}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                {indianGeography.map(state => (
                                    <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSelectedDistrict} disabled={!selectedState}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map(district => (
                                    <SelectItem key={district.name} value={district.name}>{district.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search name or mobile..." className="pl-9"/>
                        </div>
                        <Button variant="outline">Reset</Button>
                    </div>
                 </div>
                 <div className="grid md:grid-cols-2 gap-8 pt-4">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-center">By State</h3>
                        <DonutChart data={memberDataByState} category="value" index="name" className="h-48" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-center">By District (in Tamil Nadu)</h3>
                        <DonutChart data={memberDataByDistrict} category="value" index="name" className="h-48" />
                    </div>
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registration Activity</CardTitle>
          <CardDescription>
            Track new member registrations over the past 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={registrationActivity}
            index="date"
            categories={['registrations']}
            colors={['primary']}
            className="h-64"
          />
        </CardContent>
      </Card>

    </div>
  );
}
