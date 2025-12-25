'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { indianGeography, District, Constituency } from '@/lib/geography';
import { WINGS_DATA } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type MemberFormData = {
  name: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  wing: string;
  educationalQualification: string;
  email: string;
  residentialAddress: string;
  state: string;
  district: string;
  constituency: string;
  aadharNumber: string;
  isExServiceman: boolean;
  rank: string;
  serviceNumber: string;
  photoFile: File | null;
};

interface MemberFormProps {
  mobileNumber: string;
  onSubmit: (data: MemberFormData) => void;
  isLoading?: boolean;
}

export function MemberForm({ mobileNumber, onSubmit, isLoading = false }: MemberFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    fatherName: '',
    gender: '',
    dateOfBirth: '',
    occupation: '',
    wing: '',
    educationalQualification: '',
    email: '',
    residentialAddress: '',
    state: '',
    district: '',
    constituency: '',
    aadharNumber: '',
    isExServiceman: false,
    rank: '',
    serviceNumber: '',
    photoFile: null,
  });

  const [districts, setDistricts] = useState<District[]>([]);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof MemberFormData, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === 'state') {
      const selectedState = indianGeography.find(s => s.name === value);
      setDistricts(selectedState?.districts || []);
      setFormData(prev => ({ ...prev, district: '', constituency: '' }));
      setConstituencies([]);
    } else if (id === 'district') {
      const selectedDistrict = districts.find(d => d.name === value);
      setConstituencies(selectedDistrict?.constituencies || []);
      setFormData(prev => ({ ...prev, constituency: '' }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isExServiceman: !!checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photoFile: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields: (keyof MemberFormData)[] = [
      'name', 'fatherName', 'gender', 'dateOfBirth', 
      'residentialAddress', 'state', 'district', 'constituency', 'aadharNumber'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        const readableField = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        toast({ 
            title: "Missing Information", 
            description: `Please fill in the ${readableField} field.`, 
            variant: "destructive" 
        });
        return false;
      }
    }

    if (!formData.photoFile) {
        toast({ title: "Missing Photo", description: "Please upload a passport size photo.", variant: "destructive" });
        return false;
    }

    if (formData.isExServiceman) {
        if (!formData.rank) {
            toast({ title: "Missing Ex-Servicemen Details", description: "Please enter your Rank.", variant: "destructive" });
            return false;
        }
        if (!formData.serviceNumber) {
            toast({ title: "Missing Ex-Servicemen Details", description: "Please enter your Service Number.", variant: "destructive" });
            return false;
        }
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
        onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <Label className="text-base font-semibold">Passport Size Photo *</Label>
        <Avatar className="h-32 w-32 border-2 border-dashed">
          <AvatarImage src={photoPreview || undefined} className="object-cover" />
          <AvatarFallback className="bg-muted">
            <UserPlus className="h-10 w-10 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="relative">
            <Button variant="outline" size="sm" className="relative cursor-pointer" type="button">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
                <input 
                    id="photoFile" 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fatherName">Father Name *</Label>
          <Input id="fatherName" placeholder="Enter father's name" value={formData.fatherName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select onValueChange={(val) => handleSelectChange('gender', val)} value={formData.gender}>
            <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input id="occupation" placeholder="Your occupation" value={formData.occupation} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label>Wing (Optional)</Label>
          <Select onValueChange={(val) => handleSelectChange('wing', val)} value={formData.wing}>
            <SelectTrigger><SelectValue placeholder="Select Wing" /></SelectTrigger>
            <SelectContent>
              {WINGS_DATA.map(w => <SelectItem key={w.name} value={w.name}>{w.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Contact Number</Label>
          <Input value={mobileNumber} disabled className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="educationalQualification">Educational Qualification</Label>
          <Input id="educationalQualification" placeholder="Highest qualification" value={formData.educationalQualification} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Number *</Label>
          <Input id="aadharNumber" placeholder="12-digit Aadhar number" value={formData.aadharNumber} onChange={handleInputChange} maxLength={12} />
        </div>
      </div>

      <div className="flex items-center space-x-2 py-4 border-t border-b bg-gray-50/50 p-4 rounded-md">
        <Checkbox id="isExServiceman" checked={formData.isExServiceman} onCheckedChange={handleCheckboxChange} />
        <label
            htmlFor="isExServiceman"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
            Are you an Ex-Serviceman?
        </label>
      </div>

      {formData.isExServiceman && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-md bg-blue-50/30 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-2">
                <Label htmlFor="rank">Rank *</Label>
                <Input id="rank" placeholder="e.g. Havildar" value={formData.rank} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="serviceNumber">Service Number *</Label>
                <Input id="serviceNumber" placeholder="Service No." value={formData.serviceNumber} onChange={handleInputChange} />
            </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="residentialAddress">Residential Address *</Label>
        <Input id="residentialAddress" placeholder="Full address with pincode" value={formData.residentialAddress} onChange={handleInputChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>State *</Label>
          <Select onValueChange={(val) => handleSelectChange('state', val)} value={formData.state}>
            <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
            <SelectContent>
              {indianGeography.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>District *</Label>
          <Select onValueChange={(val) => handleSelectChange('district', val)} value={formData.district} disabled={!formData.state}>
            <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
            <SelectContent>
              {districts.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Constituency *</Label>
          <Select onValueChange={(val) => handleSelectChange('constituency', val)} value={formData.constituency} disabled={!formData.district}>
            <SelectTrigger><SelectValue placeholder="Select Constituency" /></SelectTrigger>
            <SelectContent>
              {constituencies.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white shadow-md transition-all hover:scale-[1.01]" disabled={isLoading}>
        {isLoading && <Loader2 className="animate-spin mr-2 h-5 w-5" />}
        Proceed to Declaration
      </Button>
    </div>
  );
}
