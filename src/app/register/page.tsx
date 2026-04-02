'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { PhoneAuth } from '@/components/auth/PhoneAuth';
import { MemberForm, MemberFormData } from '@/components/registration/MemberForm';
import { Declaration } from '@/components/registration/Declaration';
import { PaymentSelector } from '@/components/registration/PaymentSelector';
import { MembershipCard } from '@/components/card/MembershipCard';
import { useFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

type Step = 'auth' | 'form' | 'declaration' | 'payment' | 'success';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('auth');
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<MemberFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [membershipId, setMembershipId] = useState<string>('');

  const { firestore } = useFirebase();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAuthSuccess = async (authUser: any) => {
    setUser(authUser);
    if (firestore) {
      const docRef = doc(firestore, 'members', authUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        toast({ title: "Already Registered", description: "Redirecting to your profile..." });
        window.location.href = '/profile';
        return;
      }
    }
    setStep('form');
  };

  const handleFormSubmit = (data: MemberFormData) => {
    setFormData(data);
    setStep('declaration');
  };

  const handleDeclarationAccept = () => {
    setStep('payment');
  };

  const uploadFile = async (file: File, path: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    if (!user || !formData || !firestore) return;
    setIsLoading(true);

    try {
      const photoUrl = formData.photoFile 
        ? await uploadFile(formData.photoFile, `members/${user.uid}/photo.jpg`)
        : '';
      
      const newMembershipId = `NEP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`; 
      setMembershipId(newMembershipId);

      const memberData = {
        ...formData,
        uid: user.uid,
        mobile: user.phoneNumber,
        photoUrl,
        membershipId: newMembershipId,
        membershipType: getMembershipType(paymentData.amount / 100),
        status: 'APPROVED',
        paymentId: paymentData.razorpay_payment_id,
        createdAt: serverTimestamp(),
      };

      delete (memberData as any).photoFile;

      await setDoc(doc(firestore, 'members', user.uid), memberData);

      fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: user.phoneNumber,
          memberName: formData.name,
          amount: paymentData.amount / 100,
          membershipId: newMembershipId
        })
      });

      setStep('success');
      toast({ title: "Welcome!", description: "Registration successful." });

    } catch (error: any) {
      console.error(error);
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipType = (amount: number) => {
    if (amount >= 1001) return 'Lifetime Membership';
    if (amount >= 501) return 'Exclusive Membership';
    if (amount >= 251) return 'Premium Membership';
    return 'Basic Membership';
  };

  return (
    <div className="container flex items-center justify-center min-h-[90vh] py-12">
      <Card className="w-full max-w-2xl shadow-xl overflow-hidden">
        <div className="h-2 bg-muted w-full">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: step === 'auth' ? '10%' : step === 'form' ? '40%' : step === 'declaration' ? '60%' : step === 'payment' ? '80%' : '100%' }} 
          />
        </div>

        <div className="p-6">
          {step === 'auth' && <PhoneAuth onVerified={handleAuthSuccess} />}
          
          {step === 'form' && (
            <MemberForm 
              mobileNumber={user?.phoneNumber || ''} 
              onSubmit={handleFormSubmit} 
            />
          )}

          {step === 'declaration' && (
            <Declaration onAccept={handleDeclarationAccept} />
          )}

          {step === 'payment' && (
            <PaymentSelector 
              onPaymentSuccess={handlePaymentSuccess} 
              isLoading={isLoading} 
            />
          )}

          {step === 'success' && formData && (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="text-center space-y-2">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-primary">Registration Complete!</h2>
                <p className="text-muted-foreground">Welcome to the National Ex Servicemen Party.</p>
              </div>

              <MembershipCard 
                member={{
                  name: formData.name,
                  membershipId: membershipId,
                  membershipType: getMembershipType(formData.membershipAmount),
                  photoUrl: formData.photoFile ? URL.createObjectURL(formData.photoFile) : undefined,
                  district: formData.district,
                  state: formData.state,
                  mobile: user.phoneNumber
                }} 
              />

              <div className="flex gap-4 w-full">
                <Button asChild className="flex-1" variant="outline">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/profile">Go to Profile</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
