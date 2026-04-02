'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FounderPageContent() {
  const { t } = useLanguage();

  const aboutParas = [
    t('founder.sections.aboutPara1'),
    t('founder.sections.aboutPara2'),
    t('founder.sections.aboutPara3'),
    t('founder.sections.aboutPara4'),
  ];

  const visionPoints = [
    t('founder.sections.visionPoint1'),
    t('founder.sections.visionPoint2'),
    t('founder.sections.visionPoint3'),
    t('founder.sections.visionPoint4'),
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
            {t('founder.hero.ctaBack')}
          </Link>

          <div className="mt-6 grid gap-8 md:grid-cols-[320px_1fr] items-center">
            <div className="mx-auto md:mx-0">
              <Image
                src="/NEP President.jpg"
                alt={t('founder.profile.name')}
                width={320}
                height={320}
                className="rounded-xl object-cover shadow-xl"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t('founder.hero.heading')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t('founder.hero.subheading')}
              </p>
              <div className="space-y-1">
                <p className="text-xl font-semibold text-primary">{t('founder.profile.name')}</p>
                <p className="text-base text-muted-foreground">{t('founder.profile.title')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('founder.sections.aboutTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              {aboutParas.map((para, index) => (
                <p key={`about-${index}`}>{para}</p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('founder.sections.visionTitle')}</CardTitle>
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
            <h2 className="text-2xl font-bold">{t('founder.hero.heading')}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">{t('founder.hero.subheading')}</p>
            <Button asChild>
              <Link href="/">{t('founder.hero.ctaBack')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

