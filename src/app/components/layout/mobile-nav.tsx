'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Heart, Menu, User, ChevronDown, ChevronUp } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Logo } from './logo';
import { useLanguage } from '@/context/language-context';
import { LanguageSwitcher } from '../shared/language-switcher';

const LEADERSHIP_LINKS = [
  { href: '/founder', labelKey: 'nav_founder', label: 'Founder' },
  { href: '/state-presidents', labelKey: 'nav_state_presidents', label: 'State Presidents' },
  { href: '/key-members', labelKey: 'nav_key_members', label: 'Key Members' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [leadershipOpen, setLeadershipOpen] = React.useState(false);
  const { t } = useLanguage();

  const close = () => {
    setIsOpen(false);
    setLeadershipOpen(false);
  };

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
        <SheetHeader className="p-6 pb-0 flex flex-row justify-between items-center">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">Main menu for mobile devices</SheetDescription>
          <Logo />
          <LanguageSwitcher />
        </SheetHeader>

        <div className="flex flex-col h-full mt-8 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-1">

            {/* Regular nav links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="text-lg font-medium py-2 border-b border-gray-100 hover:text-primary transition-colors"
              >
                {t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}
              </Link>
            ))}

            {/* Leadership accordion */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setLeadershipOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-lg font-medium py-2 hover:text-primary transition-colors"
                aria-expanded={leadershipOpen}
              >
                <span>{t('nav_leadership') || 'Leadership'}</span>
                {leadershipOpen
                  ? <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  : <ChevronDown className="h-5 w-5 text-muted-foreground" />
                }
              </button>

              {leadershipOpen && (
                <div className="flex flex-col mb-2 ml-4 space-y-1 border-l-2 border-primary/30 pl-3">
                  {LEADERSHIP_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="text-base font-medium py-1.5 text-foreground/70 hover:text-primary transition-colors"
                    >
                      {t(item.labelKey) || item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Bottom action buttons */}
          <div className="mt-auto flex flex-col gap-4 py-6">
            <Button asChild className="w-full" variant="outline">
              <Link href="/login" onClick={close}>
                <User className="mr-2 h-4 w-4" />{t('Member Login')}
              </Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link href="/donate" onClick={close} className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                <Heart className="mr-2 h-4 w-4 fill-primary" />{t('nav_donate')}
              </Link>
            </Button>
            <Button asChild className="w-full" style={{ backgroundColor: '#FF7A00' }}>
              <Link href="/register" onClick={close}>{t('join_party')}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
