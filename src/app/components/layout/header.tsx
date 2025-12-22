'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { LanguageSwitcher } from '../shared/language-switcher';
import { MobileNav } from './mobile-nav';
import { Heart, User } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function Header() {
  const { t } = useLanguage();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full bg-blue-600 text-white text-center py-2 text-sm font-semibold">
          सेवा • अनुशासन • राष्ट्र प्रथम | Service • Discipline • Nation First
        </div>
        <header className="w-full border-b border-secondary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-20 items-center">
            <Logo />
            <nav className="hidden md:flex md:items-center md:gap-6 text-sm ml-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}
                </Link>
              ))}
            </nav>

            <div className="flex flex-1 items-center justify-end gap-2">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button asChild variant="outline">
                  <Link href="/login"><User className="mr-2 h-4 w-4" /> Member Login</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                  <Link href="/donate"><Heart className="mr-2 h-4 w-4 fill-primary" /> {t('nav_donate')}</Link>
                </Button>
                <Button asChild style={{ backgroundColor: '#FF7A00' }}>
                  <Link href="/register">{t('join_party')}</Link>
                </Button>
              </div>
              <MobileNav />
            </div>
          </div>
        </header>
      </div>
      <div className="h-28" />
    </>
  );
}
