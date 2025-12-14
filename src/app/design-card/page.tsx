'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { designMembershipCard, MembershipCardDesignOutput } from '@/ai/flows/membership-card-design';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Palette } from 'lucide-react';
import Image from 'next/image';

export default function DesignCardPage() {
  const [description, setDescription] = React.useState('A modern, patriotic membership card with the Indian flag colors, a silhouette of a soldier, and a clean, minimalist layout. The party name "National Ex-Servicemen Party" should be prominent.');
  const [result, setResult] = React.useState<MembershipCardDesignOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const output = await designMembershipCard({ description });
      setResult(output);
      toast({
        title: "Card Designed!",
        description: "Your personalized membership card has been generated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate card design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette/> Design Your Membership Card</CardTitle>
            <CardDescription>Use AI to create a unique digital membership card. Describe the theme, colors, and elements you'd like to see.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Design Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., A card with olive green, our party flag, and a lion emblem..."
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Card
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="min-h-[300px] flex items-center justify-center bg-muted/40 aspect-[1.586] w-full">
          <CardContent className="p-0 w-full h-full flex items-center justify-center">
            {isLoading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
            {!isLoading && result?.cardImageDataUri && (
                <Image src={result.cardImageDataUri} alt="Generated membership card" width={500} height={315} className="rounded-lg object-contain" />
            )}
            {!isLoading && !result && (
              <div className="text-center text-muted-foreground p-4">
                <Palette className="mx-auto h-12 w-12 mb-2" />
                <p>Your generated card will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
