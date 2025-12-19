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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { uploadFileServerAction } from '@/app/actions/upload';
import PaymentStatusTracker from '@/components/payment-status-tracker';
import { useLanguage } from '@/context/language-context';

type Step = 'mobile' | 'otp' | 'details' | 'declaration' | 'payment' | 'confirm';

type FormData = {
  name: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  mobileNumber: string;
  educationalQualification: string;
  email: string;
  residentialAddress: string;
  state: string;
  district: string;
  constituency: string;
  membershipAmount: number;
  declarationAccepted: boolean;
  photoFile: File | null;
  transactionId: string;
  paymentScreenshot: File | null;
  ppoCopy: File | null;
  aadharCard: File | null;
};

const initialFormData: FormData = {
    name: '',
    fatherName: '',
    gender: '',
    dateOfBirth: '',
    occupation: '',
    mobileNumber: '',
    educationalQualification: '',
    email: '',
    residentialAddress: '',
    state: '',
    district: '',
    constituency: '',
    membershipAmount: 10,
    declarationAccepted: false,
    photoFile: null,
    transactionId: '',
    paymentScreenshot: null,
    ppoCopy: null,
    aadharCard: null
};

const donationAmounts = [10, 100, 500, 1000, 2000];

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

  React.useEffect(() => {
    if (!auth) return;

    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, automatically triggers auth flow
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      });
    }
  }, [auth]);


  const handleSendOtp = async () => {
    if (!auth) {
      toast({ title: "Error", description: "Authentication service not ready. Please refresh.", variant: "destructive" });
      return;
    }
    if (mobileNumber.length !== 10) {
      toast({ title: "Invalid Number", description: "Please enter a valid 10-digit mobile number.", variant: "destructive" });
      return;
    }
    if (isOtpSending) return;

    setIsOtpSending(true);
    
    try {
      const phoneNumber = `+91${mobileNumber}`;
      const appVerifier = recaptchaVerifierRef.current!;

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setConfirmationResult(confirmation);
      setFormData(prev => ({ ...prev, mobileNumber: phoneNumber }));
      setStep('otp');
      toast({ title: "OTP Sent", description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error: any) {
        console.error("Error sending OTP: ", error);
        
        let errorMessage = "Could not send OTP. Please try again.";
        if (error.code === 'auth/too-many-requests') {
           errorMessage = "You've made too many requests. Please wait a while before trying again.";
        } else if (error.code === 'auth/captcha-check-failed') {
            errorMessage = "reCAPTCHA verification failed. Please try again.";
        }

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

    if (!formData.paymentScreenshot) {
        toast({ title: "Missing Proof", description: "Please upload a payment screenshot.", variant: "destructive" });
        return;
    }
    if(isSubmitting) return;

    setIsSubmitting(true);
    toast({ title: "Submitting Application", description: "Please wait, do not close this page." });

    try {
        await auth.currentUser.getIdToken(true);
        const memberId = auth.currentUser.uid;
        
        const sanitizeFileName = (fileName: string) => fileName.replace(/\s+/g, "_");

        const fileToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
        };

        // Use SERVER ACTION for upload
        const uploadFile = async (file: File, path: string): Promise<string> => {
            if (!file) return '';
            const base64String = await fileToBase64(file);
            
            // Call the server action
            const result = await uploadFileServerAction(path, base64String);
            
            if (!result.success || !result.url) {
                throw new Error(result.error || "Upload failed");
            }
            return result.url;
        }

        const safeScreenshotName = sanitizeFileName(formData.paymentScreenshot.name);
        const paymentScreenshotUrl = await uploadFile(formData.paymentScreenshot, `payment_proofs/${memberId}/${safeScreenshotName}`);
        
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
        
        // Prepare member data
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
            declarationAccepted: formData.declarationAccepted,
            photoUrl: photoUrl,
            ppoCopyUrl: ppoCopyUrl,
            aadharCardUrl: aadharCardUrl,
            status: 'pending', // Initial status
            paymentStatus: 'pending',
            createdAt: serverTimestamp()
        };

        // Prepare payment data
        const paymentData = {
            memberId: memberId,
            amount: formData.membershipAmount,
            paymentMethod: 'UPI',
            transactionId: formData.transactionId,
            paymentScreenshotUrl: paymentScreenshotUrl,
            status: 'pending', // Initial status
            createdAt: serverTimestamp()
        };
        
        // Save documents to Firestore
        await setDoc(doc(firestore, 'members', memberId), memberData);
        await setDoc(doc(firestore, `members/${memberId}/payments`, 'initial-payment'), paymentData);

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

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'photo' | 'screenshot' | 'ppo' | 'aadhar') => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (fileType === 'photo') {
                setPhotoPreview(reader.result as string);
                setFormData(prev => ({...prev, photoFile: file}));
            } else if (fileType === 'screenshot') {
                setFormData(prev => ({...prev, paymentScreenshot: file}));
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
    setFormData(prev => ({...prev, membershipAmount: amount}));
    setCustomAmount('');
}

const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const amountAsNumber = Number(value);
    if (!isNaN(amountAsNumber) && amountAsNumber > 0) {
        setFormData(prev => ({...prev, membershipAmount: amountAsNumber}));
    } else {
        setFormData(prev => ({...prev, membershipAmount: 10}));
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
              <div id="recaptcha-container"></div>
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
                     <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">Tri-Service Personnel should send a copy of their PPO and Aadhar Card Photo to the Office address or attach here below.</p>
                        <div className="grid grid-cols-2 gap-4">
                             <Button asChild variant="outline">
                                <Label htmlFor="ppo" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload PPO {formData.ppoCopy && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                                    <Input id="ppo" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'ppo')}/>
                                </Label>
                            </Button>
                             <Button asChild variant="outline">
                                <Label htmlFor="aadhar" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Aadhar {formData.aadharCard && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                                    <Input id="aadhar" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'aadhar')}/>
                                </Label>
                            </Button>
                        </div>
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

                    <div className="flex flex-col items-center gap-4 bg-muted p-4 rounded-lg">
                        <p className="font-semibold">Pay using UPI</p>
                        <Image src="/upi-qr.png" alt="UPI QR Code" width={200} height={200} className="rounded-md border-2 border-primary" />
                        <p className="text-sm">or pay to UPI ID:</p>
                        <p className="font-mono text-primary font-bold">nexsptn@indianbk</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="transactionId">Transaction ID *</Label>
                            <Input id="transactionId" placeholder="Enter the UPI transaction ID" value={formData.transactionId} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="paymentScreenshot">Upload Payment Screenshot *</Label>
                            <Input id="paymentScreenshot" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'screenshot')} />
                            {formData.paymentScreenshot && <p className="text-xs text-muted-foreground">File selected: {formData.paymentScreenshot.name}</p>}
                        </div>
                    </div>
                    
                    <Button onClick={handleNextStep} className="w-full" disabled={isSubmitting || !auth?.currentUser}>
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Application'}
                    </Button>
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
