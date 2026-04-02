'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PresidentPageContent() {
  const { t } = useLanguage();

  const aboutParas = [
    "Born and raised in Ranipet district of Tamil Nadu, Lion. Dr. Suresh Babu carried patriotism from a young age and chose the path of national service.",
    "With a self-driven vision, he joined the Indian Army and served with dedication in multiple departments, including DRDO, through discipline and hard work.",
    "In 2017, he launched an Ex-Servicemen Association in Kanchipuram. In 2019, he established the Indian Ex-Tri Services and Paramilitary Forces Welfare Federation, Tamil Nadu.",
    "Beyond caste and religion, he committed himself to raising the voice of veterans, farmers, workers, youth, and the general public under one inclusive movement."
  ];

  const visionPoints = [
    "Protect the dignity, welfare, and rights of ex-servicemen and their families.",
    "Build transparent, disciplined, and corruption-free public administration.",
    "Unite all communities for equal opportunity, social justice, and national progress.",
    "Transform public service into a people-centric movement rooted in sacrifice and integrity."
  ];

  return (
    <div className="bg-background">
      <section className="bg-muted py-12 md:py-20">
        <div className="container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>

          <div className="mt-6 grid gap-8 md:grid-cols-[320px_1fr] items-center">
            <div className="mx-auto md:mx-0">
              <Image
                src="/NEP President.jpg"
                alt="President"
                width={320}
                height={320}
                className="rounded-xl object-cover shadow-xl"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                National President
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Leadership committed to discipline, service, and national progress.
              </p>
              <div className="space-y-1">
                <p className="text-xl font-semibold text-primary">Lion. Dr. Suresh Babu</p>
                <p className="text-base text-muted-foreground">Founder & National President</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>About the President</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              {aboutParas.map((para, index) => (
                <p key={`about-${index}`}>{para}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vision and Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {visionPoints.map((point, index) => (
                  <li key={`vision-${index}`} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="rounded-xl border bg-muted/50 p-6 md:p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">National President</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">Leadership committed to discipline, service, and national progress.</p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

