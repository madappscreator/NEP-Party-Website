'use client';

import { useState } from 'react';
import { CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Loader2 } from 'lucide-react';
import Image from 'next/image';
import RazorpayPayment from '@/components/RazorpayPayment';

interface PaymentSelectorProps {
  onPaymentSuccess: (paymentData: any) => void;
  isLoading?: boolean;
}

const AMOUNTS = [10, 100, 500, 1000, 2000];

export function PaymentSelector({ onPaymentSuccess, isLoading }: PaymentSelectorProps) {
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const val = Number(e.target.value);
    if (!isNaN(val) && val > 0) setAmount(val);
  };

  const getMembershipType = (amt: number) => {
    if (amt >= 1001) return 'Lifetime Membership';
    if (amt >= 501) return 'Exclusive Membership';
    if (amt >= 251) return 'Premium Membership';
    return 'Basic Membership';
  };

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center gap-2"><Wallet /> Membership Payment</CardTitle>
        <CardDescription>Minimum amount is ₹10.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-2">
          <Label>Select Amount</Label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {AMOUNTS.map(a => (
              <Button 
                key={a} 
                variant={amount === a && !customAmount ? 'default' : 'outline'}
                onClick={() => { setAmount(a); setCustomAmount(''); }}
              >
                ₹{a}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Or Enter Custom Amount</Label>
          <Input type="number" placeholder="e.g. 501" value={customAmount} onChange={handleCustomChange} />
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="font-bold text-lg">Total: ₹{amount}</p>
          <p className="text-sm text-primary font-semibold mt-1">{getMembershipType(amount)}</p>
        </div>

        <RazorpayPayment 
          amount={amount}
          onSuccess={onPaymentSuccess}
          onFailure={() => {}}
          disabled={isLoading}
          buttonText={isLoading ? "Processing..." : "Pay Now"}
        />
      </CardContent>
    </div>
  );
}
