'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { InfinityIcon, Star, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderSection />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <StatsStrip />
    </>
  );
}

function AboutHero() {
  const { t } = useLanguage();
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
      <div className="container text-center">
        <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
          {t('about_title')}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
          {t('about_subtitle')}
        </p>
      </div>
    </section>
  );
}

function FounderSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">{t('founder_title')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
                <Image
                    src="/NEP President.jpg"
                    alt="Founder President — Lion. Dr. Suresh Babu K"
                    width={350}
                    height={350}
                    className="rounded-lg object-cover shadow-xl"
                    data-ai-hint="portrait man leader"
                />
                <Badge className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-lg px-4 py-2">{t('founder_badge')}</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{t('founder_name')}</h3>
            <p className="text-muted-foreground text-lg">
                {t('founder_bio1')}
            </p>
            <p className="text-muted-foreground text-lg">
                 {t('founder_bio2')}
            </p>
            <div className="border-l-4 border-primary pl-4 py-2 mt-6">
                <p className="text-xl font-medium italic text-foreground">
                    {t('founder_quote')}
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function OurStory() {
    const { t } = useLanguage();
    return (
        <section className="py-12 md:py-24 bg-muted">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                     <Image
                        src="https://picsum.photos/seed/story/600/400"
                        alt="Our Story"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-xl"
                        data-ai-hint="Indian crowd meeting"
                    />
                </div>
                 <div className="space-y-6">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">{t('story_title')}</h2>
                    <p className="text-muted-foreground md:text-lg">
                        {t('story_p1')}
                    </p>
                     <p className="text-muted-foreground md:text-lg">
                        {t('story_p2')}
                    </p>
                     <p className="text-muted-foreground md:text-lg">
                        {t('story_p3')}
                    </p>
                    <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}}>
                        <Link href="/register">{t('join_party')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function VisionMission() {
    const { t } = useLanguage();
    return (
        <section className="py-12 md:py-24 bg-background">
            <div className="container grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('vision_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-lg">
                            {t('vision_desc')}
                        </p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t('mission_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-lg">
                            {t('mission_desc')}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

function CoreValues() {
    const { t } = useLanguage();
    const values = [
        { title: t('values_discipline_title'), description: t('values_discipline_desc') },
        { title: t('values_integrity_title'), description: t('values_integrity_desc') },
        { title: t('values_equality_title'), description: t('values_equality_desc') },
        { title: t('values_service_title'), description: t('values_service_desc') },
    ];
    return (
        <section className="py-12 md:py-24 bg-muted">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">{t('values_title')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map(value => (
                        <Card key={value.title} className="text-center items-center p-6">
                            <CardTitle>{value.title}</CardTitle>
                            <CardContent className="p-0 mt-2">
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatsStrip() {
    const { t } = useLanguage();
    const stats = [
        { value: '22', label: t('stats_strip_wings'), icon: <Users/> },
        { value: '37', label: t('stats_strip_districts'), icon: <Target/> },
        { value: '2024', label: t('stats_strip_founded'), icon: <Star/> },
        { value: '∞', label: t('stats_strip_dedication'), icon: <InfinityIcon/> }
    ];
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map(stat => (
                    <div key={stat.label} className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {stat.icon}
                            <p className="text-4xl font-bold">{stat.value}</p>
                        </div>
                        <p className="text-lg text-primary-foreground/80 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
