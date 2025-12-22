'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function MobileAuthPage() {
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [isOtpSending, setIsOtpSending] = React.useState(false);

  const { auth, firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();

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

      // Store confirmation result in session storage for the OTP page
      sessionStorage.setItem('confirmationResult', JSON.stringify({
        verificationId: confirmation.verificationId,
        phoneNumber: phoneNumber
      }));

      toast({ title: "OTP Sent", description: `An OTP has been sent to ${phoneNumber}.` });

      // Navigate to OTP verification page
      router.push(`/register/otp?phone=${encodeURIComponent(phoneNumber)}`);

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

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Member Registration</CardTitle>
          <CardDescription>Enter your mobile number to begin. We'll send you an OTP for verification.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="recaptcha-container" ref={recaptchaWrapperRef}></div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              disabled={isOtpSending}
            />
          </div>
          <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSending}>
            {isOtpSending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            {isOtpSending ? 'Sending OTP...' : 'Send OTP'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
