'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, ShieldCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';

type Step = 'mobile' | 'otp' | 'details' | 'confirm';

export default function RegisterPage() {
  const [step, setStep] = React.useState<Step>('mobile');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');

  const handleNextStep = () => {
    if (step === 'mobile') setStep('otp');
    if (step === 'otp') setStep('details');
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
              <Button onClick={handleNextStep} className="w-full">Send OTP</Button>
            </CardContent>
          </>
        );
        case 'otp':
            return (
              <>
                <CardHeader>
                  <CardTitle>Verify Mobile Number</CardTitle>
                  <CardDescription>Enter the 6-digit OTP sent to {mobileNumber}.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  </div>
                  <Button onClick={handleNextStep} className="w-full">Verify OTP</Button>
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
      <Card className="w-full max-w-md shadow-lg">
        {renderStep()}
      </Card>
    </div>
  );
}
