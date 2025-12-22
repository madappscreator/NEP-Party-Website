'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, Menu, User } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Logo />
        <div className="flex flex-col h-full mt-8">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4 py-4">
             <Button asChild className="w-full" variant="outline">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                    <User className="mr-2 h-4 w-4" />Member Login
                </Link>
            </Button>
             <Button asChild className="w-full" variant="outline">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="mr-2 h-4 w-4" />{t('nav_donate_now')}
                </Link>
            </Button>
            <Button asChild className="w-full" style={{backgroundColor: '#FF7A00'}}>
                <Link href="/register" onClick={() => setIsOpen(false)}>{t('join_party')}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
