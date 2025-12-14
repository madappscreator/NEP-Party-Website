import Link from 'next/link';
import { Logo } from './logo';
import { NAV_LINKS } from '@/lib/constants';
import { Twitter, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear() + 1;
  const quickLinks = NAV_LINKS.slice(0, 5);
  const moreLinks = NAV_LINKS.slice(5);

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
                A party for ex-servicemen and common people of India.
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
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
                <li><Link href="/register" className="text-sm hover:text-primary transition-colors">Join Party</Link></li>
                <li><Link href="/design-card" className="text-sm hover:text-primary transition-colors">Member Card</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">More Links</h3>
             <ul className="space-y-2">
              {moreLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
                <li><Link href="/donate" className="text-sm hover:text-primary transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
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
                <p className="text-sm">Tamil Nadu, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-6 text-sm text-center md:flex md:justify-between">
          <div className="space-x-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms & Conditions</Link>
            <Link href="#" className="hover:text-primary">Refund Policy</Link>
          </div>
          <p className="mt-4 md:mt-0">© {year} National Ex-Servicemen Party. All Rights Reserved.</p>
        </div>
      </div>
      <div className="bg-background text-foreground py-4 text-center text-xs">
          <p className="text-muted-foreground">OUR TECHNOLOGY PARTNER</p>
          <p className="font-semibold">MadAppsCreator</p>
          <p className="text-muted-foreground">Web • Mobile • Cloud • AI Solutions</p>
          <div className="flex justify-center gap-4 mt-1 text-muted-foreground">
             <a href="mailto:contact@madappscreator.in" className="hover:text-primary">contact@madappscreator.in</a>
             <span>•</span>
             <a href="tel:+919625788018" className="hover:text-primary">+91 96257 88018</a>
          </div>
      </div>
    </footer>
  );
}
