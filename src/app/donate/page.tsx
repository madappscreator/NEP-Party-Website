'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import RazorpayPayment from '@/components/RazorpayPayment';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const donationAmounts = [100, 250, 500, 1000, 2500, 5000];

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Support Our Mission
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Your contribution powers our movement for a stronger, more disciplined India. Every donation, big or small, makes a significant impact.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Select an amount to donate</h2>
            <div className="grid grid-cols-3 gap-4">
              {donationAmounts.map(amount => (
                <Button key={amount} variant="outline" className="h-16 text-lg">
                  ₹{amount}
                </Button>
              ))}
            </div>
            <Input type="number" placeholder="Or enter a custom amount" className="h-16 text-lg mt-4" />
            <Button className="w-full mt-4 h-14 text-lg">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Secure Payment with Razorpay</CardTitle>
                    <CardDescription>Make your donation securely using Razorpay. All major payment methods accepted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">₹{selectedAmount}</p>
                        <p className="text-sm text-muted-foreground">Selected amount</p>
                    </div>
                    <RazorpayPayment
                        amount={selectedAmount}
                        onSuccess={(paymentData: any) => {
                            // Handle successful donation
                            console.log('Donation successful:', paymentData);
                            // You could redirect to a thank you page or show success message
                            alert('Thank you for your donation! Your payment has been processed successfully.');
                        }}
                        onFailure={() => {
                            alert('Payment failed. Please try again.');
                        }}
                        buttonText="Donate Now"
                        className="w-full"
                    />
                </CardContent>
            </Card>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Other Ways to Contribute</CardTitle>
                    <CardDescription>Choose from our suggested donation amounts or make a custom contribution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {donationAmounts.slice(1).map(amount => (
                            <Button
                                key={amount}
                                variant="outline"
                                className="h-12"
                                onClick={() => {
                                    // Update selected amount and trigger payment
                                    const newAmount = amount;
                                    // For now, we'll just alert - in a real implementation you'd update state
                                    alert(`Donation amount ₹${newAmount} selected. Razorpay integration would open here.`);
                                }}
                            >
                                ₹{amount}
                            </Button>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customAmount">Custom Amount</Label>
                        <Input id="customAmount" type="number" placeholder="Enter amount" />
                        <Button className="w-full" variant="outline">
                            Donate Custom Amount
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
