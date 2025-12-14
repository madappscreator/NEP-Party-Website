'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { LanguageSwitcher } from '../shared/language-switcher';
import { MobileNav } from './mobile-nav';
import { Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-10 z-40 w-full border-b border-secondary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
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
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                <Link href="/donate"><Heart className="mr-2 h-4 w-4 fill-primary" /> Donate</Link>
            </Button>
            <Button asChild style={{backgroundColor: '#FF7A00'}}>
                <Link href="/register">Join Party</Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
