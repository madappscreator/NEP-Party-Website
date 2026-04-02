'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { LanguageSwitcher } from '../shared/language-switcher';
import { MobileNav } from './mobile-nav';
import { Heart, User, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { t } = useLanguage();

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      const navigationEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const wasBackForward = navigationEntries.length > 0 && navigationEntries[0].type === 'back_forward';
      if (event.persisted || wasBackForward) {
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full bg-blue-600 text-white text-center py-2 text-sm font-semibold">
          Party of the People • Service to All • Integrity in Service • Discipline • Nation First
        </div>
        <header className="w-full border-b border-secondary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-20 items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Logo />
              <nav className="hidden md:flex items-center gap-4 text-sm min-w-0 overflow-hidden whitespace-nowrap">

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground/80 shrink-0"
                >
                  {t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 font-medium text-foreground/60 transition-colors hover:text-foreground/80 shrink-0">
                  {t('nav_leadership')} <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/founder">{t('nav_founder')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/state-presidents">{t('nav_state_presidents')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/key-members">{t('nav_key_members')}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            </div>

            <div className="flex items-center justify-end gap-2 min-w-0">
              <div className="hidden md:flex items-center gap-2 min-w-0">
                <LanguageSwitcher />
                <Button asChild variant="outline" className="min-w-max">
                  <Link href="/login"><User className="mr-2 h-4 w-4" /> {t('Member Login')}</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary min-w-max">
                  <Link href="/donate"><Heart className="mr-2 h-4 w-4 fill-primary" /> {t('nav_donate')}</Link>
                </Button>
                <Button asChild style={{backgroundColor: '#FF7A00'}} className="min-w-max">
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
