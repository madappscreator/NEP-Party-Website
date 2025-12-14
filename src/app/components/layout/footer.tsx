'use client';

import Link from 'next/link';
import { Logo } from './logo';
import { NAV_LINKS } from '@/lib/constants';
import { Twitter, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const quickLinks = NAV_LINKS.slice(0, 5);
  const moreLinks = NAV_LINKS.slice(5);

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
                {t('footer_party_bio')}
            </p>
            <div className="flex items-center gap-4">
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="Facebook">
                    <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t('footer_quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary transition-colors">{t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}</Link></li>
              ))}
                <li><Link href="/register" className="text-sm hover:text-primary transition-colors">{t('join_party')}</Link></li>
                <li><Link href="/design-card" className="text-sm hover:text-primary transition-colors">{t('nav_member_card')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t('footer_more_links')}</h3>
             <ul className="space-y-2">
              {moreLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary transition-colors">{t(`nav_${link.label.toLowerCase().replace(/ /g, '_')}`)}</Link></li>
              ))}
                <li><Link href="/donate" className="text-sm hover:text-primary transition-colors">{t('nav_donate')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">{t('footer_contact_info')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <a href="tel:+919176101115" className="text-sm hover:text-primary transition-colors">+91 91761 01115</a><br/>
                  <a href="tel:+919176102229" className="text-sm hover:text-primary transition-colors">+91 91761 02229</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <a href="mailto:allindianep@gmail.com" className="text-sm hover:text-primary transition-colors">allindianep@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary" />
                <p className="text-sm">{t('footer_address')}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-6 text-sm text-center md:flex md:justify-between">
          <div className="space-x-4">
            <Link href="#" className="hover:text-primary">{t('footer_privacy')}</Link>
            <Link href="#" className="hover:text-primary">{t('footer_terms')}</Link>
            <Link href="#" className="hover:text-primary">{t('footer_refund')}</Link>
          </div>
          <p className="mt-4 md:mt-0">© {year} {t('footer_copyright')}.</p>
        </div>
      </div>
      <div className="bg-background text-foreground py-4 text-center text-xs">
          <p className="text-muted-foreground">{t('footer_tech_partner_title')}</p>
          <p className="font-semibold">MadAppsCreator</p>
          <p className="text-muted-foreground">{t('footer_tech_partner_services')}</p>
          <div className="flex justify-center gap-4 mt-1 text-muted-foreground">
             <a href="mailto:contact@madappscreator.in" className="hover:text-primary">contact@madappscreator.in</a>
             <span>•</span>
             <a href="tel:+919625788018" className="hover:text-primary">+91 96257 88018</a>
          </div>
      </div>
    </footer>
  );
}
