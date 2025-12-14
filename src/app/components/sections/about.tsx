import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, BookOpenCheck, Waves, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About NEP
            </h2>
            <p className="text-muted-foreground md:text-lg">
                For the first time in Indian history, a political party has been started in Tamil Nadu by ex-servicemen under the name National Ex-Servicemen Party (NEP).
            </p>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>Veterans welfare & employment guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>Free quality education and healthcare for all</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>Water & natural resource protection</span>
                </li>
            </ul>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
        </div>
        <div className="flex justify-center items-center">
            <Card className="p-8 bg-muted/20 flex flex-col items-center justify-center aspect-square w-64 h-64 rounded-full">
                <Image src="/NEP Flag.jpg" alt="NEP Flag" width={96} height={96} className="w-24 h-24" />
                <p className="text-2xl font-bold mt-2">NEP</p>
                <p className="text-sm text-muted-foreground text-center">National Ex-Servicemen Party</p>
            </Card>
        </div>
      </div>
    </section>
  );
}
