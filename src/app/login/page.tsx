
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [step, setStep] = React.useState<'mobile' | 'otp'>('mobile');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const [isOtpSending, setIsOtpSending] = React.useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = React.useState(false);
  
  const { auth } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!auth) {
        toast({ title: "Error", description: "Authentication service not ready. Please refresh.", variant: "destructive" });
        return;
    }
    if (mobileNumber.length < 10) {
        toast({ title: "Invalid Number", description: "Please enter a valid 10-digit mobile number.", variant: "destructive" });
        return;
    }
    setIsOtpSending(true);

    try {
        const phoneNumber = `+91${mobileNumber}`;
        
        // Create a new verifier for every attempt
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
            }
        });
        
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setStep('otp');
        toast({ title: "OTP Sent", description: `An OTP has been sent to ${phoneNumber}.` });
    } catch (error: any) {
        console.error("Error sending OTP: ", error);
        toast({ title: "Error sending OTP", description: "Could not send OTP. Please ensure your number is correct and try again later.", variant: "destructive" });
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
        toast({ title: "Success", description: "Login successful. Redirecting to your profile..." });
        router.push('/profile');
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        toast({ title: "Error", description: "Invalid OTP. Please try again.", variant: "destructive" });
    } finally {
        setIsOtpVerifying(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-sm">
        {step === 'mobile' && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LogIn /> Member Login</CardTitle>
              <CardDescription>Enter your registered mobile number to log in and view your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="98765 43210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSending}>
                {isOtpSending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </CardContent>
          </>
        )}

        {step === 'otp' && (
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
              <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpVerifying}>
                {isOtpVerifying ? 'Verifying...' : 'Login'}
              </Button>
              <Button variant="link" size="sm" className="w-full" onClick={() => setStep('mobile')}>
                Change Number
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
