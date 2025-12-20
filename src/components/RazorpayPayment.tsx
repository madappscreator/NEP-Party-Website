'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onFailure: () => void;
  disabled?: boolean;
  buttonText?: string;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayPayment({
  amount,
  onSuccess,
  onFailure,
  disabled = false,
  buttonText = "Pay Now",
  className = ""
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      // Create order
      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paisa
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'National Ex Servicemen Party',
        description: 'Membership Registration',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              onSuccess(response);
            } else {
              onFailure();
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onFailure();
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      onFailure();
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`w-full ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
