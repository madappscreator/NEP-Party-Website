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
  const recaptchaWidgetId = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);
  
  const handleSendOtp = async () => {
    if (!auth) {
      toast({ title: 'Error', description: 'Authentication service not ready. Please refresh.', variant: 'destructive' });
      return;
    }
    if (mobileNumber.length < 10) {
      toast({ title: 'Invalid Number', description: 'Please enter a valid 10-digit mobile number.', variant: 'destructive' });
      return;
    }
    if (isOtpSending) return;
  
    setIsOtpSending(true);
  
    try {
      const phoneNumber = `+91${mobileNumber}`;
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
  
      if (recaptchaWrapperRef.current) {
        recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container-inner"></div>`;
        const verifier = new RecaptchaVerifier(auth, 'recaptcha-container-inner', {
          size: 'invisible',
          callback: () => {},
        });
        recaptchaVerifierRef.current = verifier;
      }
  
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current!);
      setConfirmationResult(confirmation);
      setStep('otp');
      toast({ title: 'OTP Sent', description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error: any) {
      console.error('Error sending OTP: ', error);
  
      if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
      }
      if (typeof window !== 'undefined' && window.grecaptcha && recaptchaWidgetId.current !== null) {
          window.grecaptcha.reset(recaptchaWidgetId.current);
      }
  
      let errorMessage = 'Could not send OTP. Please try again.';
      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'You\'ve made too many requests. Please wait a while before trying again.';
      }
      toast({ title: 'Error sending OTP', description: errorMessage, variant: 'destructive' });
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
      return;
    }
    if (isOtpVerifying) return;
    setIsOtpVerifying(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const loggedInUser = result.user;

      if (!firestore) {
          throw new Error("Firestore not initialized");
      }
      // Check if user is already registered
      const memberDoc = await getDoc(doc(firestore, 'members', loggedInUser.uid));
      if (memberDoc.exists()) {
          setStep('confirm');
      } else {
          setFormData(prev => ({...prev, mobileNumber: loggedInUser.phoneNumber || `+91${mobileNumber}`}));
          setStep('details');
      }

      toast({ title: 'Success', description: 'Login successful.' });
    } catch (error) {
      console.error('Error verifying OTP: ', error);
      toast({ title: 'Error', description: 'Invalid OTP. Please try again.', variant: 'destructive' });
    } finally {
      setIsOtpVerifying(false);
    }
  };
  
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

  const uploadFile = async (file: File, path: string): Promise<string> => {
    if (!firebaseApp) throw new Error('Firebase app not ready');
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };
  
  const handleFinalSubmit = async (paymentResult: any) => {
    if (!user || !firestore) {
      toast({ title: 'Error', description: 'You are not logged in or database is not available.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
  
    try {
      let photoUrl: string | null = null;
      let ppoCopyUrl: string | null = null;
      let aadharCardUrl: string | null = null;
  
      if (formData.photoFile) {
        photoUrl = await uploadFile(formData.photoFile, `member_photos/${user.uid}/${formData.photoFile.name}`);
      }
      if (formData.ppoCopy) {
        ppoCopyUrl = await uploadFile(formData.ppoCopy, `documents/${user.uid}/ppo/${formData.ppoCopy.name}`);
      }
      if (formData.aadharCard) {
        aadharCardUrl = await uploadFile(formData.aadharCard, `documents/${user.uid}/aadhar/${formData.aadharCard.name}`);
      }
  
      const memberData = {
        ...formData,
        uid: user.uid,
        createdAt: serverTimestamp(),
        status: 'pending', // Set initial status to pending
        paymentStatus: 'pending', // Assume payment is pending manual verification
        photoUrl,
        ppoCopyUrl,
        aadharCardUrl,
        transactionId: paymentResult.razorpay_payment_id || 'N/A',
      };
      // Remove file objects before saving to firestore
      delete (memberData as any).photoFile;
      delete (memberData as any).ppoCopy;
      delete (memberData as any).aadharCard;

      await setDoc(doc(firestore, 'members', user.uid), memberData);
      
      // Also record the payment in a subcollection
      await setDoc(doc(firestore, `members/${user.uid}/payments`, paymentResult.razorpay_payment_id), {
          amount: formData.membershipAmount,
          transactionId: paymentResult.razorpay_payment_id,
          orderId: paymentResult.razorpay_order_id,
          signature: paymentResult.razorpay_signature,
          status: 'pending', // Payment needs to be verified by an admin
          createdAt: serverTimestamp(),
      });

      setStep('confirm');
    } catch (error: any) {
      console.error('Final submission error:', error);
      toast({ title: 'Submission Error', description: error.message || 'An error occurred during submission.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = (nextStep: Step) => {
    // Add validation logic here if needed before moving to the next step
    setStep(nextStep);
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
              <div ref={recaptchaWrapperRef}></div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} disabled={isOtpSending} />
              </div>
              <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSending}>
                {isOtpSending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                {isOtpSending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
               <div className="text-center text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
              </div>
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
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={isOtpVerifying}/>
              </div>
              <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpVerifying}>
                {isOtpVerifying ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                {isOtpVerifying ? 'Verifying...' : 'Verify & Proceed'}
              </Button>
              <Button variant="link" size="sm" className="w-full" onClick={() => setStep('mobile')}>
                Change Number
              </Button>
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

                <Button onClick={() => handleNextStep('declaration')} className="w-full">Proceed to Declaration</Button>
                </CardContent>
            </>
        );
      case 'declaration':
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck /> Declaration</CardTitle>
              <CardDescription>Please review and accept the following declarations to proceed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 text-sm text-muted-foreground p-4 border rounded-lg max-h-60 overflow-y-auto">
                    <p>1. I am a citizen of India and have completed 18 years of age.</p>
                    <p>2. I am not a member of any other political party.</p>
                    <p>3. I believe in the principles and policies of the National Ex-Servicemen Party.</p>
                    <p>4. I will not engage in any activity that is prejudicial to the interests of the party and the nation.</p>
                    <p>5. I declare that the information provided by me is true and correct to the best of my knowledge.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="declarationAccepted" checked={formData.declarationAccepted} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, declarationAccepted: !!checked }))}/>
                    <Label htmlFor="declarationAccepted">I have read and agree to the declarations.</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => setStep('details')}>Back</Button>
                    <Button onClick={() => handleNextStep('payment')} disabled={!formData.declarationAccepted}>Proceed to Payment</Button>
                </div>
            </CardContent>
          </>
        );
      case 'payment':
        return (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wallet /> Membership Fee</CardTitle>
              <CardDescription>Select a membership level or enter a custom amount. Your contribution supports the party's mission.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Selected Membership</p>
                    <p className="text-2xl font-bold text-primary">{formData.membershipType}</p>
                    <p className="text-xs text-muted-foreground">Valid for {getMembershipValidity(formData.membershipType)}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {donationAmounts.map(amount => (
                        <Button 
                            key={amount} 
                            variant={formData.membershipAmount === amount && !customAmount ? 'default' : 'outline'}
                            onClick={() => handleAmountSelect(amount)}
                        >
                            ₹{amount}
                        </Button>
                    ))}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customAmount">Or Enter a Custom Amount</Label>
                    <Input id="customAmount" type="number" placeholder="e.g., 251" value={customAmount} onChange={handleCustomAmountChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => setStep('declaration')}>Back</Button>
                    <RazorpayPayment
                        amount={formData.membershipAmount}
                        onSuccess={handleFinalSubmit}
                        onFailure={() => toast({ title: 'Payment Failed', description: 'Please try again.', variant: 'destructive'})}
                        disabled={isSubmitting}
                        buttonText={isSubmitting ? "Processing..." : `Pay ₹${formData.membershipAmount} Now`}
                        className="w-full"
                    />
                </div>
                 <div className="text-xs text-muted-foreground text-center pt-4">
                    All payments are securely processed by Razorpay.
                </div>
            </CardContent>
          </>
        );
      case 'confirm':
        return <PaymentStatusTracker userId={user!.uid} t={t} />;
      default:
        return null;
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-lg shadow-lg">
        <Progress value={(Object.values( {mobile:0, otp:20, details:40, declaration:60, payment:80, confirm:100} )[Object.keys({mobile:0, otp:20, details:40, declaration:60, payment:80, confirm:100}).indexOf(step)])} className="w-full" />
        {renderStep()}
      </Card>
    </div>
  );
}
