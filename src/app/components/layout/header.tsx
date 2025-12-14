'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { LanguageSwitcher } from '../shared/language-switcher';
import { MobileNav } from './mobile-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm ml-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher />
          <Button asChild className="hidden md:inline-flex" variant="secondary">
            <Link href="/donate">Donate Now</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
