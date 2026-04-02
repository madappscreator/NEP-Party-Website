'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="container py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('about_section_title')}
            </h2>
            <p className="text-muted-foreground md:text-lg">
                {t('about_section_p1')}
            </p>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>{t('about_section_li1')}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>{t('about_section_li2')}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>{t('about_section_li3')}</span>
                </li>
            </ul>
            <Button asChild size="lg" style={{backgroundColor: '#FF7A00', color: 'white'}}>
              <Link href="/about">
                {t('learn_more')}
              </Link>
            </Button>
        </div>
        <div className="flex justify-center items-center">
             <div className="relative w-72 h-72">
                <Image src="/NEP Flag.jpg" alt="NEP Flag" fill className="rounded-full object-cover" sizes="18rem" />
            </div>
        </div>
      </div>
    </section>
  );
}
