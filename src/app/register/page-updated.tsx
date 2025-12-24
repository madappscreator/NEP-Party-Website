'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, ShieldCheck, Upload, Wallet, CheckCircle, Mail, HelpCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianGeography, State, District, Constituency } from '@/lib/geography';
import { WINGS_DATA } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import PaymentStatusTracker from '@/components/payment-status-tracker';
import { useLanguage } from '@/context/language-context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import RazorpayPayment from '@/components/RazorpayPayment';
import { getFunctions, httpsCallable } from 'firebase/functions';


type Step = 'mobile' | 'otp' | 'details' | 'declaration' | 'payment' | 'confirm';

type FormData = {
  name: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
    wing: string;
  mobileNumber: string;
  educationalQualification: string;
  email: string;
  residentialAddress: string;
  state: string;
  district: string;
  constituency: string;
  membershipAmount: number;
  membershipType: string;
  declarationAccepted: boolean;
  photoFile: File | null;
  transactionId: string;
  aadharNumber: string;
  ppoCopy: File | null;
  aadharCard: File | null;
  isExServiceman: boolean;
  rank: string;
  grade: string;
  batchNumber: string;
};

const initialFormData: FormData = {
    name: '',
    fatherName: '',
    gender: '',
    dateOfBirth: '',
    occupation: '',
    wing: '',
    mobileNumber: '',
    educationalQualification: '',
    email: '',
    residentialAddress: '',
    state: '',
    district: '',
    constituency: '',
    membershipAmount: 10,
    membershipType: 'Basic Membership',
    declarationAccepted: false,
    photoFile: null,
    transactionId: '',
    aadharNumber: '',
    ppoCopy: null,
    aadharCard: null,
    isExServiceman: false,
    rank: '',
    grade: '',
    batchNumber: ''
};

const donationAmounts = [10, 100, 500, 1000, 2000];

const getMembershipType = (amount: number): string => {
  if (amount >= 1001) return 'Lifetime Membership';
  if (amount >= 501) return 'Exclusive Membership';
  if (amount >= 251) return 'Premium Membership';
  return 'Basic Membership';
};

const getMembershipValidity = (membershipType: string): string => {
  switch (membershipType) {
    case 'Lifetime Membership':
      return 'Lifetime';
    case 'Exclusive Membership':
      return '3 Years';
    case 'Premium Membership':
      return '2 Years';
    default:
      return '1 Year';
  }
};

export default function RegisterPage() {
  const [step, setStep] = React.useState<Step>('mobile');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const [isOtpSending, setIsOtpSending] = React.useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  const [districts, setDistricts] = React.useState<District[]>([]);
  const [constituencies, setConstituencies] = React.useState<Constituency[]>([]);
  const [customAmount, setCustomAmount] = React.useState('');

    const { firebaseApp, auth, firestore, user } = useFirebase();
  const { toast } = useToast();
  const { t } = useLanguage();

  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier | null>(null);
  const recaptchaWrapperRef = React.useRef<HTMLDivElement>(null);

  // Clean up reCAPTCHA on component unmount
  React.useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (error) {
          console.warn('Error clearing reCAPTCHA on unmount:', error);
        }
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // ... existing code ...

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'photo' | 'ppo' | 'aadhar') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (fileType === 'photo') {
          setPhotoPreview(reader.result as string);
          setFormData(prev => ({...prev, photoFile: file}));
        } else if (fileType === 'ppo') {
           setFormData(prev => ({...prev, ppoCopy: file}));
        } else if (fileType === 'aadhar') {
          setFormData(prev => ({...prev, aadharCard: file}));
        }
      }
      reader.readAsDataURL(file);
    }
  };

  const handleAmountSelect = (amount: number) => {
    const membershipType = getMembershipType(amount);
    setFormData(prev => ({...prev, membershipAmount: amount, membershipType}));
    setCustomAmount('');
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const amountAsNumber = Number(value);
    if (!isNaN(amountAsNumber) && amountAsNumber > 0) {
      const membershipType = getMembershipType(amountAsNumber);
      setFormData(prev => ({...prev, membershipAmount: amountAsNumber, membershipType}));
    } else {
      setFormData(prev => ({...prev, membershipAmount: 10, membershipType: 'Basic Membership'}));
    }
  }


  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({...prev, [id]: value}));

    if (id === 'state') {
      const selectedState = indianGeography.find(s => s.name === value);
      setDistricts(selectedState?.districts || []);
      setFormData(prev => ({...prev, district: '', constituency: ''}));
      setConstituencies([]);
    } else if (id === 'district') {
      const selectedDistrict = districts.find(d => d.name === value);
      setConstituencies(selectedDistrict?.constituencies || []);
      setFormData(prev => ({...prev, constituency: ''}));
    }
  }

  const handleSendOtp = async () => {
    setIsOtpSending(true);
    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
      }
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${mobileNumber}`, recaptchaVerifierRef.current);
      setConfirmationResult(confirmationResult);
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: 'Please check your mobile for the OTP.',
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsOtpVerifying(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        setFormData(prev => ({ ...prev, mobileNumber: `+91${mobileNumber}` }));
        setStep('details');
        toast({
          title: 'OTP Verified',
          description: 'Your mobile number has been verified.',
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: 'Error',
        description: 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsOtpVerifying(false);
    }
  };

  const handleNextStep = () => {
    // Implement next step logic
    setStep('declaration');
  };

  const renderStep = () => {
    let content;
    switch (step) {
      case 'mobile':
        content = (
          <>
            <CardHeader>
              <CardTitle>Register for Membership</CardTitle>
              <CardDescription>Enter your mobile number to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={10}
                />
              </div>
              <Button onClick={handleSendOtp} disabled={mobileNumber.length !== 10 || isOtpSending} className="w-full">
                {isOtpSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Send OTP
              </Button>
              <div id="recaptcha-container"></div>
            </CardContent>
          </>
        );
        break;
      case 'otp':
        content = (
          <>
            <CardHeader>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>Enter the 6-digit OTP sent to your mobile number.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={handleVerifyOtp} disabled={otp.length !== 6 || isOtpVerifying} className="w-full">
                {isOtpVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Verify OTP
              </Button>
            </CardContent>
          </>
        );
        break;
      case 'details':
        content = (
          <>
            <CardHeader>
              <CardTitle>Membership Form</CardTitle>
              <CardDescription>Please fill in your information. Fields marked with * are required.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24 border-2 border-dashed">
                        <AvatarImage src={photoPreview || undefined} alt="Member photo" />
                        <AvatarFallback className="bg-muted">
                            <UserPlus className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <Button asChild variant="outline" size="sm">
                        <Label htmlFor="photo" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                            <Input id="photo" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')}/>
                        </Label>
                    </Button>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fatherName">Father Name *</Label>
                    <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                     <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
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
                    <Input id="occupation" value={formData.occupation} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="wing">Wing (Optional)</Label>
                     <Select onValueChange={(value) => handleSelectChange('wing', value)} value={formData.wing}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Wing" />
                        </SelectTrigger>
                        <SelectContent>
                            {WINGS_DATA.map(w => (
                                <SelectItem key={w.name} value={w.name}>{w.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Contact Number</Label>
                    <Input id="mobileNumber" value={formData.mobileNumber || `+91${mobileNumber}`} readOnly disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="educationalQualification">Educational Qualification</Label>
                    <Input id="educationalQualification" value={formData.educationalQualification} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <Input id="aadharNumber" placeholder="12-digit Aadhar number" value={formData.aadharNumber} onChange={handleInputChange} />
                </div>
              </div>

              {/* Ex-Serviceman Checkbox */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isExServiceman"
                    checked={formData.isExServiceman}
                    onCheckedChange={(checked) => setFormData(prev => ({...prev, isExServiceman: !!checked}))}
                  />
                  <label htmlFor="isExServiceman" className="text-sm font-medium">
                    Are you an Ex-Serviceman?
                  </label>
                </div>

                {formData.isExServiceman && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                    <div className="space-y-2">
                      <Label htmlFor="rank">Rank</Label>
                      <Input id="rank" value={formData.rank} onChange={handleInputChange} placeholder="e.g. Captain, Major" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" value={formData.grade} onChange={handleInputChange} placeholder="e.g. Officer, JCO, OR" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batchNumber">Batch Number</Label>
                      <Input id="batchNumber" value={formData.batchNumber} onChange={handleInputChange} placeholder="e.g. 2020-05" />
                    </div>
                  </div>
                )}
              </div>

                <div className="space-y-2">
                    <Label htmlFor="residentialAddress">Residential Address *</Label>
                    <Input id="residentialAddress" value={formData.residentialAddress} onChange={handleInputChange} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                         <Select onValueChange={(value) => handleSelectChange('state', value)} value={formData.state}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                {indianGeography.map(state => (
                                    <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="district">District *</Label>
                        <Select onValueChange={(value) => handleSelectChange('district', value)} value={formData.district} disabled={!formData.state}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map(district => (
                                    <SelectItem key={district.name} value={district.name}>{district.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="constituency">Constituency *</Label>
                        <Select onValueChange={(value) => handleSelectChange('constituency', value)} value={formData.constituency} disabled={!formData.district}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Constituency" />
                            </SelectTrigger>
                            <SelectContent>
                                {constituencies.map(c => (
                                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                 </div>

              <Button onClick={handleNextStep} className="w-full">Proceed to Declaration</Button>
            </CardContent>
          </>
        );
        break;
      default:
        content = null;
    }
    return content;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {renderStep()}
    </Card>
  );
}
