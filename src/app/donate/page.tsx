import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function DonatePage() {
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
                    <CardTitle>Scan to Pay with UPI</CardTitle>
                    <CardDescription>Use any UPI app to scan the QR code and make your contribution instantly.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg">
                     <Image 
                        src="https://picsum.photos/seed/qr/256/256"
                        alt="UPI QR Code"
                        width={256}
                        height={256}
                        data-ai-hint="QR code"
                        className="rounded-md"
                      />
                    </div>
                </CardContent>
            </Card>

            <Separator />
            
            <Card>
                <CardHeader>
                    <CardTitle>Manual Payment Verification</CardTitle>
                    <CardDescription>If you've already made a donation, enter the details here for verification and receipt generation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="transactionId">Transaction ID</Label>
                        <Input id="transactionId" placeholder="Your payment transaction ID" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="Enter your full name" />
                    </div>
                    <Button className="w-full">Verify Payment</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
