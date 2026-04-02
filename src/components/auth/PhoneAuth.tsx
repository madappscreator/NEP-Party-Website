'use client';

import { useState, useEffect, useRef } from 'react';
import { useFirebase } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhoneAuthProps {
  onVerified: (user: any) => void;
}

export function PhoneAuth({ onVerified }: PhoneAuthProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const { auth } = useFirebase();
  const { toast } = useToast();
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);

  const handleSendOtp = async () => {
    if (!auth) return;
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast({ title: "Invalid Number", description: "Please enter a valid 10-digit Indian mobile number.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      if (!recaptchaVerifierRef.current && recaptchaWrapperRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaWrapperRef.current, {
          'size': 'invisible',
          'callback': () => {},
          'expired-callback': () => {}
        });
      }

      const confirmation = await signInWithPhoneNumber(auth, `+91${mobileNumber}`, recaptchaVerifierRef.current!);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      toast({ title: "OTP Sent", description: `OTP sent to +91 ${mobileNumber}` });
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error.message || "Failed to send OTP", variant: "destructive" });
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) return;
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      onVerified(result.user);
      toast({ title: "Success", description: "Mobile number verified successfully" });
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: "Invalid OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container" ref={recaptchaWrapperRef}></div>
      
      {!isOtpSent ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 border rounded-md bg-muted text-muted-foreground">+91</span>
              <Input 
                id="mobile" 
                placeholder="98765 43210" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <Button onClick={handleSendOtp} className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Send OTP
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input 
              id="otp" 
              placeholder="123456" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleVerifyOtp} className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Verify OTP
          </Button>
          <Button variant="link" className="w-full" onClick={() => setIsOtpSent(false)} disabled={loading}>
            Change Number
          </Button>
        </div>
      )}
    </div>
  );
}
