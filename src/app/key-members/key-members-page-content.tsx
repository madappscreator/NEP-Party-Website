'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const keyMembers = []; // Will update soon; no confirmed members yet


export function KeyMembersPageContent() {
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
              {t('key_members.page_title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              {t('key_members.page_subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl border border-muted p-10 text-center">
            <h2 className="text-3xl font-bold">{t('key_members.section_title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('key_members.under_construction')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

