
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
    aadharCard: null
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

  const { auth, firestore, user } = useFirebase();
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


  const handleSendOtp = async () => {
    if (!auth) {
      toast({ title: "Error", description: "Authentication service not ready. Please refresh.", variant: "destructive" });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast({ title: "Invalid Number", description: "Please enter a valid 10-digit Indian mobile number.", variant: "destructive" });
      return;
    }
    if (isOtpSending) return;

    setIsOtpSending(true);

    try {
        // Clear any existing reCAPTCHA verifier first
        if (recaptchaVerifierRef.current) {
            try {
                recaptchaVerifierRef.current.clear();
            } catch (error) {
                console.warn('Error clearing existing reCAPTCHA:', error);
            }
            recaptchaVerifierRef.current = null;
        }

        // Clear the container element
        if (recaptchaWrapperRef.current) {
            recaptchaWrapperRef.current.innerHTML = '';
        }

        // Initialize reCAPTCHA verifier
        if (recaptchaWrapperRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaWrapperRef.current, {
                'size': 'invisible',
                'callback': () => {
                    // reCAPTCHA solved, automatically triggers auth flow
                },
                'expired-callback': () => {
                    // Response expired. User needs to try sending OTP again.
                }
            });
        } else {
            throw new Error("reCAPTCHA container not found");
        }

      const phoneNumber = `+91${mobileNumber}`;
      const appVerifier = recaptchaVerifierRef.current!;

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setConfirmationResult(confirmation);
      setFormData(prev => ({ ...prev, mobileNumber: phoneNumber }));
      setStep('otp');
      toast({ title: "OTP Sent", description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error: any) {
        console.error("Error sending OTP: ", error);

        let errorMessage = "An unexpected error occurred. Please try again.";
        switch (error.code) {
            case 'auth/too-many-requests':
                errorMessage = "You've made too many requests. Please wait a while before trying again.";
                break;
            case 'auth/invalid-phone-number':
                errorMessage = "The phone number is not valid. Please check and try again.";
                break;
            case 'auth/captcha-check-failed':
                errorMessage = "reCAPTCHA verification failed. Please refresh the page and try again.";
                break;
            case 'auth/network-request-failed':
                errorMessage = "Network error. Please check your internet connection and try again.";
                break;
            case 'auth/invalid-app-credential':
                errorMessage = "Authentication configuration error. Please refresh the page.";
                break;
        }

        // Clear reCAPTCHA on error
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        }

        toast({ title: "Error sending OTP", description: errorMessage, variant: "destructive" });
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
    }
    if(isOtpVerifying) return;
    setIsOtpVerifying(true);
    try {
        const userCredential = await confirmationResult.confirm(otp);
        if (!userCredential.user) {
            throw new Error("User authentication failed after OTP verification.");
        }
        const memberId = userCredential.user.uid;
        if (!firestore) {
            throw new Error("Firestore not available");
        }
        const memberDoc = await getDoc(doc(firestore, 'members', memberId));
        if (memberDoc.exists()) {
             toast({ title: "Already Registered", description: "You are already a member. Redirecting to your profile." });
             // In a real app, you'd redirect here.
             // router.push('/profile');
        } else {
            setStep('details');
            toast({ title: "Success", description: "Mobile number verified successfully." });
        }

    } catch (error) {
        console.error("Error verifying OTP: ", error);
        toast({ title: "Error", description: "Invalid OTP. Please try again.", variant: "destructive" });
    } finally {
        setIsOtpVerifying(false);
    }
};

const handleFinalSubmit = async () => {
    if (!auth?.currentUser) {
        toast({ title: "Authentication Error", description: "User not authenticated. Please restart the process.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    if(isSubmitting) return;

    setIsSubmitting(true);
    toast({ title: "Submitting Application", description: "Please wait, do not close this page." });

    try {
        const memberId = auth.currentUser.uid;
        const storage = getStorage();
        
        const sanitizeFileName = (fileName: string) => fileName.replace(/\s+/g, "_");

        const uploadFile = async (file: File, path: string): Promise<string> => {
            try {
                const fileRef = ref(storage, path);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            } catch (err: any) {
                console.error('Upload failed for', path, err);
                // Return empty string so member creation can continue even if uploads fail
                return '';
            }
        }

        let photoUrl = '';
        if (formData.photoFile) {
             const safePhotoName = sanitizeFileName(formData.photoFile.name);
             photoUrl = await uploadFile(formData.photoFile, `profile_photos/${memberId}/${safePhotoName}`);
        }
       
        let ppoCopyUrl = '';
        if (formData.ppoCopy) {
            const safePpoName = sanitizeFileName(formData.ppoCopy.name);
            ppoCopyUrl = await uploadFile(formData.ppoCopy, `documents/${memberId}/${safePpoName}`);
        }

        let aadharCardUrl = '';
        if (formData.aadharCard) {
            const safeAadharName = sanitizeFileName(formData.aadharCard.name);
            aadharCardUrl = await uploadFile(formData.aadharCard, `documents/${memberId}/${safeAadharName}`);
        }
        
        // Prepare member data (without membershipId yet)
        const memberData = {
            id: memberId,
            name: formData.name,
            fatherName: formData.fatherName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            occupation: formData.occupation,
            mobileNumber: formData.mobileNumber,
            educationalQualification: formData.educationalQualification,
            email: formData.email,
            residentialAddress: formData.residentialAddress,
            state: formData.state,
            district: formData.district,
            constituency: formData.constituency,
            wing: formData.wing,
            aadharNumber: formData.aadharNumber,
            membershipAmount: formData.membershipAmount,
            membershipType: formData.membershipType,
            declarationAccepted: formData.declarationAccepted,
            photoUrl: photoUrl,
            ppoCopyUrl: ppoCopyUrl,
            aadharCardUrl: aadharCardUrl,
            status: 'active', // Set to active for Razorpay payments
            paymentStatus: 'approved',
            membershipApprovedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        };

        // Prepare payment data
        const paymentData = {
            memberId: memberId,
            amount: formData.membershipAmount,
            paymentMethod: 'Razorpay',
            transactionId: formData.transactionId,
            status: 'approved', // Set to approved for Razorpay payments
            createdAt: serverTimestamp()
        };
        
        // Save documents to Firestore using a transaction so we can atomically generate a sequential membershipId
        if (!firestore) {
            throw new Error("Firestore is not initialized.");
        }

        const memberRef = doc(firestore, 'members', memberId);

        // Call the Cloud Function to generate a sequential membership ID
        const functions = getFunctions();
        const generateMembershipId = httpsCallable(functions, 'generateMembershipId');
        let membershipId = '';
        
        try {
          const result = await generateMembershipId();
          membershipId = (result.data as any).membershipId;
        } catch (err: any) {
          console.error('Error calling generateMembershipId:', err);
          throw new Error('Failed to generate membership ID. Please try again.');
        }

        const memberDataWithId = {
            ...memberData,
            membershipId,
        };

        // Write member document and initial payment document directly.
        // These writes require only that the authenticated user can write their own member doc.
        await setDoc(memberRef, memberDataWithId);

        const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await setDoc(doc(firestore, `members/${memberId}/payments`, paymentId), { ...paymentData, membershipId });

        setStep('confirm');

    } catch (error: any) {
        console.error("Form submission error:", error);
        let description = "There was an error submitting your application. Please try again.";
        if (error.message) {
            description = `Upload Error: ${error.message}`;
        }
        toast({ title: "Submission Failed", description: description, variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
}


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


  const handleNextStep = () => {
    if (step === 'mobile') handleSendOtp();
    if (step === 'otp') handleVerifyOtp();
    if (step === 'details') setStep('declaration');
    if (step === 'declaration') setStep('payment');
    if (step === 'payment') handleFinalSubmit();
  };

  const renderStep = () => {
    switch (step) {
      case 'mobile':
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserPlus /> Member Registration</CardTitle>
              <CardDescription>Enter your mobile number to begin. We'll send you an OTP for verification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div id="recaptcha-container" ref={recaptchaWrapperRef}></div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="98765 43210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} disabled={isOtpSending} />
              </div>
              <Button onClick={handleNextStep} className="w-full" disabled={isOtpSending}>
                {isOtpSending ? <Loader2 className="animate-spin" /> : 'Send OTP'}
              </Button>
            </CardContent>
          </>
        );
        case 'otp':
            return (
              <>
                <CardHeader>
                  <CardTitle>Verify Mobile Number</CardTitle>
                  <CardDescription>Enter the 6-digit OTP sent to +91{mobileNumber}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={isOtpVerifying} />
                  </div>
                  <Button onClick={handleNextStep} className="w-full" disabled={isOtpVerifying}>
                    {isOtpVerifying ? <Loader2 className="animate-spin" /> : 'Verify & Proceed'}
                  </Button>
                   <Button variant="link" size="sm" className="w-full" onClick={() => setStep('mobile')}>Change Number</Button>
                </CardContent>
              </>
            );
      case 'details':
        return (
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
      case 'declaration':
        return (
            <>
                <CardHeader>
                    <CardTitle>Declaration and Pledge</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold">DECLARATION</h3>
                        <p className="text-sm text-muted-foreground">I do hereby declare that the contribution is from my personal fund and voluntary by nature.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">PLEDGE</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                           <li>I believe in integral Humanism which is the basic philosophy of NATIONAL EX SERVICEMEN PARTY.</li>
                           <li>I am committed to Nationalism and national Integration, Democracy, ‘Gandhian approach to saocio-economic issues leading to the establishment of an egalitarian society free from exploitation, Positive Secularism, (May you be united with all religions) and value-based politics.</li>
                           <li>I subscribe to the concept of the Secular State and Nation not based on religion.</li>
                           <li>I firmly believe that this task can be achieved by peaceful means alone.</li>
                           <li>I do not Believe in discrimination based on caste, sex or religion.</li>
                           <li>I do not observe or recognize untouchability in any shape or form.</li>
                           <li>I am not a member of any other political party.</li>
                           <li>I undertake to abide by the Constitution, Rules Discipline of the Party.</li>
                        </ul>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="declarationAccepted" checked={formData.declarationAccepted} onCheckedChange={(checked) => setFormData(prev => ({...prev, declarationAccepted: !!checked}))} />
                        <label
                            htmlFor="declarationAccepted"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I accept the declaration and pledge.
                        </label>
                    </div>
                    <Button onClick={handleNextStep} className="w-full" disabled={!formData.declarationAccepted}>Proceed to Payment</Button>
                </CardContent>
            </>
        );
        case 'payment':
            return (
                <>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wallet/>Membership Payment</CardTitle>
                    <CardDescription>Complete your registration by paying the membership fee. The minimum amount is <span className="font-sans">₹</span>10.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Select Amount</Label>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                            {donationAmounts.map(amount => (
                                <Button
                                    key={amount}
                                    variant={formData.membershipAmount === amount && customAmount === '' ? 'default' : 'outline'}
                                    onClick={() => handleAmountSelect(amount)}
                                    className="font-sans"
                                >
                                    ₹{amount}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                        <Input id="customAmount" type="number" placeholder="e.g. 501" value={customAmount} onChange={handleCustomAmountChange}/>
                    </div>

                    <div className="text-center font-bold text-lg font-sans">
                        Total Amount: ₹{formData.membershipAmount}
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/30 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground font-semibold uppercase">Membership Type</p>
                                <p className="text-lg font-bold text-primary mt-2">{formData.membershipType}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-muted-foreground font-semibold uppercase">Valid For</p>
                                <p className="text-lg font-bold text-secondary mt-2">{getMembershipValidity(formData.membershipType)}</p>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-primary/20 text-center">
                            <p className="text-sm text-muted-foreground">This membership will give you access to all NEP benefits and member privileges</p>
                        </div>
                    </div>

                    <RazorpayPayment
                        amount={formData.membershipAmount}
                        onSuccess={async (paymentData) => {
                            // Update form data with payment info
                            setFormData(prev => ({
                                ...prev,
                                transactionId: paymentData.razorpay_payment_id,
                                paymentScreenshot: null // Not needed for Razorpay
                            }));
                            // Auto-submit after successful payment
                            await handleFinalSubmit();
                        }}
                        onFailure={() => {
                            toast({ title: "Payment Failed", description: "Please try again or contact support.", variant: "destructive" });
                        }}
                        disabled={isSubmitting}
                        buttonText={isSubmitting ? "Processing..." : "Pay Now"}
                    />
                </CardContent>
                </>
            );
    case 'confirm':
        return user ? <PaymentStatusTracker userId={user.uid} t={t} /> : <div>Loading...</div>;
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-3xl shadow-lg">
        {renderStep()}
      </Card>
    </div>
  );
}
