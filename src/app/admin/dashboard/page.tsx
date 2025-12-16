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
import { FileDown, Users, UserCheck, Wallet, Search, Loader2 } from 'lucide-react';
import { indianGeography } from '@/lib/geography';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { useFirebase } from '@/firebase';
import { collection, getDocs, query, where, getCountFromServer, collectionGroup } from 'firebase/firestore';

export default function DashboardPage() {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const [stats, setStats] = React.useState({
      totalMembers: 0,
      pendingApprovals: 0,
      totalDonations: 0
  });
  
  const [membersData, setMembersData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { firestore } = useFirebase();

  const districts = selectedState ? indianGeography.find(s => s.name === selectedState)?.districts || [] : [];

  React.useEffect(() => {
      const fetchStats = async () => {
          if (!firestore) return;
          setIsLoading(true);
          try {
              // 1. Get Totals (Efficiently)
              const membersColl = collection(firestore, 'members');
              const totalMembersSnapshot = await getCountFromServer(membersColl);
              
              const paymentsQuery = query(collectionGroup(firestore, 'payments'), where('status', '==', 'pending'));
              let pendingCount = 0;
              try {
                  const pendingSnapshot = await getCountFromServer(paymentsQuery);
                  pendingCount = pendingSnapshot.data().count;
              } catch (e) {
                  console.warn("Pending count failed (likely index building)", e);
              }

              // 2. Fetch Payments Client-Side for Sum (Bypasses Aggregation Index requirement)
              // Since we don't expect millions of payments yet, this is fine.
              let totalDonations = 0;
              try {
                  const approvedPaymentsQuery = query(collectionGroup(firestore, 'payments'), where('status', '==', 'approved'));
                  const approvedSnap = await getDocs(approvedPaymentsQuery);
                  approvedSnap.forEach(doc => {
                      totalDonations += (doc.data().amount || 0);
                  });
              } catch (e) {
                   console.warn("Client-side sum failed", e);
              }

              // 3. Fetch Actual Data for Analytics
              const q = query(membersColl); 
              const querySnapshot = await getDocs(q);
              
              const fetchedMembers = querySnapshot.docs.map(doc => doc.data());
              setMembersData(fetchedMembers);
              
              setStats({
                  totalMembers: totalMembersSnapshot.data().count,
                  pendingApprovals: pendingCount,
                  totalDonations: totalDonations
              });

          } catch (error) {
              console.error("Dashboard fetch error:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchStats();
  }, [firestore]);

  // --- Filtering Logic ---
  const filteredMembers = React.useMemo(() => {
      return membersData.filter(m => {
          const matchesState = selectedState && selectedState !== 'all' ? m.state === selectedState : true;
          const matchesDistrict = selectedDistrict ? m.district === selectedDistrict : true;
          const matchesSearch = searchTerm ? (
              (m.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (m.mobileNumber?.includes(searchTerm))
          ) : true;
          return matchesState && matchesDistrict && matchesSearch;
      });
  }, [membersData, selectedState, selectedDistrict, searchTerm]);

  // --- Chart Data Preparation ---
  const chartDataByState = React.useMemo(() => {
      if (selectedState && selectedState !== 'all') return []; 
      const counts: Record<string, number> = {};
      filteredMembers.forEach(m => {
          const state = m.state || 'Unknown';
          counts[state] = (counts[state] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value], i) => ({
          name, 
          value, 
          fill: `var(--color-chart-${(i % 5) + 1})`
      }));
  }, [filteredMembers, selectedState]);

  const chartDataByDistrict = React.useMemo(() => {
      if (!selectedState || selectedState === 'all') return []; 
      const counts: Record<string, number> = {};
      filteredMembers.forEach(m => {
          const dist = m.district || 'Unknown';
          counts[dist] = (counts[dist] || 0) + 1;
      });
      return Object.entries(counts).map(([name, value], i) => ({
          name, 
          value, 
          fill: `var(--color-chart-${(i % 5) + 1})`
      }));
  }, [filteredMembers, selectedState]);


  return (
    <div className="flex flex-col gap-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "-" : stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
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
            <div className="text-2xl font-bold">{isLoading ? "-" : stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Waiting for verification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalDonations.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
              Collected so far
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
                 <div className="border rounded-lg p-4 bg-muted/20">
                    <div className="flex flex-wrap items-center gap-4">
                        <Select onValueChange={setSelectedState} value={selectedState}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All States</SelectItem>
                                {indianGeography.map(state => (
                                    <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        <Select onValueChange={setSelectedDistrict} disabled={!selectedState || selectedState === 'all'} value={selectedDistrict}>
                            <SelectTrigger className="w-full md:w-[200px]">
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
                            <Input 
                                placeholder="Search name or mobile..." 
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={() => { setSelectedState(''); setSelectedDistrict(''); setSearchTerm(''); }}
                        >
                            Reset
                        </Button>
                    </div>
                 </div>

                 {isLoading ? (
                     <div className="flex justify-center h-48 items-center"><Loader2 className="animate-spin" /></div>
                 ) : (
                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                        {!selectedState || selectedState === 'all' ? (
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-center">By State</h3>
                                <DonutChart data={chartDataByState} category="value" index="name" className="h-48" />
                            </div>
                        ) : null}

                        {selectedState && selectedState !== 'all' ? (
                            <div className="flex flex-col gap-4">
                                <h3 className="font-semibold text-center">By District (in {selectedState})</h3>
                                {chartDataByDistrict.length > 0 ? (
                                    <DonutChart data={chartDataByDistrict} category="value" index="name" className="h-48" />
                                ) : (
                                    <p className="text-center text-muted-foreground py-10">No data for this state.</p>
                                )}
                            </div>
                        ) : null}
                    </div>
                 )}
            </CardContent>
        </Card>
    </div>
  );
}
