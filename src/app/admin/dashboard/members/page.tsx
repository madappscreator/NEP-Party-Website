'use client';

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
import { FileDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useFirebase } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Member } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { indianGeography } from "@/lib/geography";
import { Search, Filter, Calendar, MapPin, Phone, Mail, User, FileText } from "lucide-react";

export default function MembersPage() {
  const { firestore } = useFirebase();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!firestore) return;
      try {
        const membersRef = collection(firestore, 'members');
        const q = query(membersRef);
        const querySnapshot = await getDocs(q);

        const membersList: Member[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          membersList.push({
            id: doc.id,
            name: data.name || 'N/A',
            state: data.state || 'N/A',
            district: data.district || 'N/A',
            constituency: data.constituency || 'N/A',
            status: data.status || 'pending',
            mobileNumber: data.mobileNumber || 'N/A',
            createdAt: data.createdAt,
            photoUrl: data.photoUrl,
            fatherName: data.fatherName,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            occupation: data.occupation,
            educationalQualification: data.educationalQualification,
            email: data.email,
            residentialAddress: data.residentialAddress,
            membershipAmount: data.membershipAmount,
            paymentStatus: data.paymentStatus,
            documents: data.documents,
            ppoCopyUrl: data.ppoCopyUrl,
            aadharCardUrl: data.aadharCardUrl,
          });
        });
        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [firestore]);

  // Filtering logic
  useEffect(() => {
    let filtered = members;

    if (selectedState && selectedState !== 'all') {
      filtered = filtered.filter(member => member.state === selectedState);
    }

    if (selectedDistrict && selectedDistrict !== 'all') {
      filtered = filtered.filter(member => member.district === selectedDistrict);
    }

    if (selectedStatus && selectedStatus !== 'all') {
      filtered = filtered.filter(member => member.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mobileNumber.includes(searchTerm)
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(member => {
        const memberDate = member.createdAt?.toDate ? member.createdAt.toDate() : new Date(member.createdAt as any);
        return memberDate >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter(member => {
        const memberDate = member.createdAt?.toDate ? member.createdAt.toDate() : new Date(member.createdAt as any);
        return memberDate <= end;
      });
    }

    setFilteredMembers(filtered);
  }, [members, selectedState, selectedDistrict, selectedStatus, searchTerm, startDate, endDate]);

  const districts = selectedState && selectedState !== 'all'
    ? indianGeography.find(s => s.name === selectedState)?.districts || []
    : [];

  const handleViewDetails = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedStatus('all');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };
  return (
    <>
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
            <CardTitle>All Members</CardTitle>
            <CardDescription>Manage party members and view their details.</CardDescription>
        </div>
        <Button size="sm" variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
        </Button>
      </CardHeader>
      <CardContent>
        {/* Filters Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* State Filter */}
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {indianGeography.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Filter */}
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select
                value={selectedDistrict}
                onValueChange={setSelectedDistrict}
                disabled={!selectedState || selectedState === 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Constituency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.state}</TableCell>
                <TableCell>{member.constituency}</TableCell>
                <TableCell>
                  <Badge variant={member.status === "active" ? "default" : "secondary"} className={member.status === "active" ? "bg-green-600" : ""}>
                    {member.status}
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
                      <DropdownMenuItem onClick={() => handleViewDetails(member)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
            Showing <strong>1-{filteredMembers.length}</strong> of <strong>{members.length}</strong> members
          </div>
      </CardFooter>
    </Card>

    {/* Member Details Modal */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
          <DialogDescription>
            Complete profile information for {selectedMember?.name}
          </DialogDescription>
        </DialogHeader>

        {selectedMember && (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedMember.photoUrl} alt={selectedMember.name} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                <p className="text-sm text-muted-foreground">Member ID: {selectedMember.id}</p>
                <Badge variant={selectedMember.status === "active" ? "default" : "secondary"} className={selectedMember.status === "active" ? "bg-green-600" : ""}>
                  {selectedMember.status}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Details
                </Label>
                <div className="space-y-1 text-sm">
                  <p><strong>Father Name:</strong> {selectedMember.fatherName || 'N/A'}</p>
                  <p><strong>Gender:</strong> {selectedMember.gender || 'N/A'}</p>
                  <p><strong>Date of Birth:</strong> {selectedMember.dateOfBirth || 'N/A'}</p>
                  <p><strong>Occupation:</strong> {selectedMember.occupation || 'N/A'}</p>
                  <p><strong>Educational Qualification:</strong> {selectedMember.educationalQualification || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </Label>
                <div className="space-y-1 text-sm">
                  <p><strong>Mobile:</strong> {selectedMember.mobileNumber}</p>
                  <p><strong>Email:</strong> {selectedMember.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <div className="space-y-1 text-sm">
                <p><strong>Residential Address:</strong> {selectedMember.residentialAddress || 'N/A'}</p>
                <p><strong>State:</strong> {selectedMember.state}</p>
                <p><strong>District:</strong> {selectedMember.district}</p>
                <p><strong>Constituency:</strong> {selectedMember.constituency}</p>
              </div>
            </div>

            <Separator />

            {/* Membership Information */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Membership Details
              </Label>
              <div className="space-y-1 text-sm">
                <p><strong>Joined:</strong> {selectedMember.createdAt ? new Date(selectedMember.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Membership Amount:</strong> ₹{selectedMember.membershipAmount || 'N/A'}</p>
                <p><strong>Payment Status:</strong> {selectedMember.paymentStatus || 'N/A'}</p>
              </div>
            </div>

            {/* Documents */}
            {selectedMember.documents && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documents
                  </Label>
                  <div className="space-y-1 text-sm">
                    {selectedMember.ppoCopyUrl && (
                      <p><strong>PPO Copy:</strong> <a href={selectedMember.ppoCopyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a></p>
                    )}
                    {selectedMember.aadharCardUrl && (
                      <p><strong>Aadhar Card:</strong> <a href={selectedMember.aadharCardUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a></p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
