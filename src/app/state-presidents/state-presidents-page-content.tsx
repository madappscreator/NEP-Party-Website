'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const states = [
  {
    slug: 'andhra-pradesh',
    i18nKey: 'state_presidents.andhra',
    members: '150+',
    image: '/Andra_president.jpeg'
  },
  {
    slug: 'tamil-nadu',
    i18nKey: 'state_presidents.tamil',
    members: '5000+',
    image: '/president.jpg'
  }
];

export function StatePresidentsPageContent() {
  const { t } = useLanguage();

  return (
    <div className="bg-background">
      <section className="bg-muted py-12 md:py-20">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            ← {t('back_to_home')}
          </Link>
          <div className="mt-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('state_presidents.page_title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              {t('state_presidents.page_subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {states.map((state, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Image
                  src={state.image}
                  alt={t(`${state.i18nKey}.president`)}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-lg leading-tight">{t(`${state.i18nKey}.name`)}</CardTitle>
                  <CardTitle className="text-primary font-bold">{t(`${state.i18nKey}.president`)}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t(`${state.i18nKey}.title`)}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${state.i18nKey}.bio`)}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {state.members} {t('state_presidents.members_label')}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/state-presidents/${state.slug}`}>
                    {t('state_presidents.details_button')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

