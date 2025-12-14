'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { useFirebase } from '@/firebase'; 
import { useToast } from '@/hooks/use-toast';


type Step = 'mobile' | 'otp' | 'details' | 'confirm';

export default function RegisterPage() {
  const [step, setStep] = React.useState<Step>('mobile');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const [isOtpSending, setIsOtpSending] = React.useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);

  const { auth } = useFirebase();
  const { toast } = useToast();

  React.useEffect(() => {
    if (auth && !(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, [auth]);


  const handleSendOtp = async () => {
    if (!auth) {
        toast({ title: "Error", description: "Firebase not initialized.", variant: "destructive" });
        return;
    }
    if (mobileNumber.length < 10) {
        toast({ title: "Invalid Number", description: "Please enter a valid 10-digit mobile number.", variant: "destructive" });
        return;
    }
    setIsOtpSending(true);
    try {
        const phoneNumber = `+91${mobileNumber}`;
        const appVerifier = (window as any).recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setStep('otp');
        toast({ title: "OTP Sent", description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error) {
        console.error("Error sending OTP: ", error);
        toast({ title: "Error", description: "Failed to send OTP. Please try again.", variant: "destructive" });
    } finally {
        setIsOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
    }
    setIsOtpVerifying(true);
    try {
        await confirmationResult.confirm(otp);
        setStep('details');
        toast({ title: "Success", description: "Mobile number verified successfully." });
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        toast({ title: "Error", description: "Invalid OTP. Please try again.", variant: "destructive" });
    } finally {
        setIsOtpVerifying(false);
    }
};


  const handleNextStep = () => {
    if (step === 'mobile') handleSendOtp();
    if (step === 'otp') handleVerifyOtp();
    if (step === 'details') setStep('confirm');
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
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="98765 43210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <Button onClick={handleNextStep} className="w-full" disabled={isOtpSending}>{isOtpSending ? 'Sending...' : 'Send OTP'}</Button>
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
                    <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  </div>
                  <Button onClick={handleNextStep} className="w-full" disabled={isOtpVerifying}>{isOtpVerifying ? 'Verifying...' : 'Verify OTP'}</Button>
                   <Button variant="link" size="sm" className="w-full" onClick={() => setStep('mobile')}>Change Number</Button>
                </CardContent>
              </>
            );
      case 'details':
        return (
          <>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Please fill in your information. All fields are required.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Rajesh Kumar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Punjab" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <Input id="constituency" placeholder="Amritsar" />
              </div>
              <Button onClick={handleNextStep} className="w-full">Complete Registration</Button>
            </CardContent>
          </>
        );
      case 'confirm':
        return (
          <>
            <CardHeader className="items-center text-center">
              <ShieldCheck className="h-16 w-16 text-green-500" />
              <CardTitle className="text-2xl">Registration Successful!</CardTitle>
              <CardDescription>Welcome to the National Ex-Servicemen Party. Your membership is pending approval.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>You can now design your personalized digital membership card.</p>
              <Button asChild>
                <Link href="/design-card">Design Your Card</Link>
              </Button>
            </CardContent>
          </>
        );
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-md shadow-lg">
        {renderStep()}
      </Card>
    </div>
  );
}

    