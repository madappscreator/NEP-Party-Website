'use client';

import React, { useEffect, useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Mail, HelpCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFirebase } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import NEPCard from '@/components/NEPCard';

interface PaymentStatusTrackerProps {
  userId: string;
  t: (key: string) => string;
}

interface MemberData {
  name: string;
  fatherName: string | null;
  phone: string;
  mobileNumber: string;
  photoUrl: string | null;
  district: string;
  state: string;
  membershipType: string;
  membershipId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'pending' | 'active' | 'rejected';
  paymentStatus: string;
  membershipValidUntil: string | null;
}

export default function PaymentStatusTracker({ userId, t }: PaymentStatusTrackerProps) {
  const { firestore } = useFirebase();
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusSteps, setStatusSteps] = useState<Array<{ label: string; status: 'complete' | 'pending' | 'incomplete' }>>([]);

  useEffect(() => {
    if (!firestore || !userId) return;

    const memberRef = doc(firestore, 'members', userId);

    const unsubscribe = onSnapshot(memberRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as MemberData;
        setMemberData(data);
        updateStatusSteps(data);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching member data:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, userId]);

  const updateStatusSteps = (data: MemberData) => {
    const status = data.status?.toUpperCase();
    const isApproved = status === 'APPROVED' || status === 'ACTIVE';
    const isPending = status === 'PENDING';

    const steps = [
      { label: 'Payment Submitted', status: 'complete' as const },
      { label: 'Application Received', status: 'complete' as const },
      { label: 'Verifying Payment', status: isPending ? ('pending' as const) : ('complete' as const) },
      { label: 'Membership Approved', status: isApproved ? ('complete' as const) : ('incomplete' as const) },
      { label: 'Card Ready', status: isApproved ? ('complete' as const) : ('incomplete' as const) },
    ];

    setStatusSteps(steps);
  };

  const getProgressValue = () => {
    if (!memberData) return 20;
    const status = memberData.status?.toUpperCase();
    if (status === 'PENDING') return 40;
    if (status === 'REJECTED') return 100;
    if (status === 'APPROVED' || status === 'ACTIVE') return 100;
    return 40;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading member data. Please refresh the page.
      </div>
    );
  }

  const isApproved = memberData.status?.toUpperCase() === 'APPROVED' || memberData.status?.toUpperCase() === 'ACTIVE';
  const isRejected = memberData.status?.toUpperCase() === 'REJECTED';

  if (isApproved) {
    return (
      <>
        <CardHeader className="items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl">🎉 Membership Approved!</CardTitle>
          <CardDescription className="max-w-md">
            Your membership has been approved! Here's your official membership card.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-8">
          <div className="border rounded-lg p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="font-semibold text-lg mb-6">Your Membership Card</h3>
            <div className="flex justify-center">
              <NEPCard
                member={{
                  ...memberData,
                  phone: memberData.mobileNumber || memberData.phone,
                  membershipType: memberData.membershipType || 'BASIC'
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full h-12 text-base bg-primary hover:bg-primary/90">
              <Link href="/profile">View Full Profile</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 text-base">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </>
    );
  }

  if (isRejected) {
    return (
      <>
        <CardHeader className="items-center text-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <CardTitle className="text-2xl">Application Rejected</CardTitle>
          <CardDescription className="max-w-md">
            Unfortunately, your application could not be approved. Please contact our support team for more information.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-8">
          <div className="border rounded-lg p-4 bg-red-50">
            <h3 className="font-semibold mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Need Help?</h3>
            <p className="text-sm text-muted-foreground">Contact our support team:</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>Email:</strong> support@allindianep.com</li>
              <li><strong>WhatsApp:</strong> +91 XXXXX XXXXX</li>
              <li className="text-xs">Helpline: 9 AM – 7 PM (All Days)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full h-12">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </>
    );
  }

  const whatYouGet = [
    'Digital Membership ID',
    'Membership Card (PDF + QR Code)',
    'Access to member updates and announcements',
    'Eligibility for volunteer and leadership programs',
  ];

  return (
    <>
      <CardHeader className="items-center text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <CardTitle className="text-2xl">Thank You for Your Contribution!</CardTitle>
        <CardDescription className="max-w-md">
          Your payment has been successfully submitted and is currently under review. Our verification team will manually validate the transaction.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">What Happens Next?</h3>
          <div className="border rounded-lg p-4 bg-muted/50 max-w-sm mx-auto">
            <ul className="space-y-3 text-left">
              {statusSteps.map((s, index) => (
                <li key={index} className="flex items-center gap-3">
                  {s.status === 'complete' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                  {s.status === 'pending' && (
                    <div className="h-5 w-5 flex-shrink-0 relative flex items-center justify-center">
                      <div className="h-2 w-2 bg-primary rounded-full animate-ping absolute"></div>
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                  {s.status === 'incomplete' && <div className="h-5 w-5 flex-shrink-0 border-2 border-muted-foreground rounded-full" />}
                  <span className={s.status === 'incomplete' ? 'text-muted-foreground' : 'font-medium'}>{s.label}</span>
                </li>
              ))}
            </ul>
            <Progress value={getProgressValue()} className="mt-4 h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Expected Approval Time: 30 minutes to 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">What You Will Receive</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-4 flex flex-col justify-center">
            <h3 className="font-semibold mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Need Help?</h3>
            <p className="text-sm text-muted-foreground">If you have any issues, feel free to contact us:</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>Email:</strong> support@allindianep.com</li>
              <li><strong>WhatsApp:</strong> +91 XXXXX XXXXX</li>
              <li className="text-xs">Helpline: 9 AM – 7 PM (All Days)</li>
            </ul>
          </div>
        </div>

        <blockquote className="border-l-4 border-primary pl-4 text-left italic text-muted-foreground">
          "Thank you for standing with those who served the nation. Together, we build a stronger India."
        </blockquote>

        <div className="space-y-4">
          <Button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 w-full"
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </CardContent>
    </>
  );
}
