"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from "@/context/language-context";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50">
      <header className="bg-primary text-primary-foreground text-center py-12 md:py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold">{t('contact_title')}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{t('contact_subtitle')}</p>
        </div>
      </header>

      <section className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">{t('contact_information') || t('contact_title')}</h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('contact_phone')}</h3>
                <div className="text-muted-foreground mt-2">
                  <a href="tel:+919176101115" className="block hover:text-primary transition-colors">+91 91761 01115</a>
                  <a href="tel:+919176102229" className="block hover:text-primary transition-colors">+91 91761 02229</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('contact_email')}</h3>
                <div className="text-muted-foreground mt-2">
                  <a href="mailto:allindianep@gmail.com" className="block hover:text-primary transition-colors">allindianep@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('contact_address')}</h3>
                <div className="text-muted-foreground mt-2">
                  <p>{t('contact_address_l1') || 'National Ex-Servicemen Party'}</p>
                  <p>{t('contact_address_l2') || 'A4, Vishwaa Pride Apartment, Nookampalayam Main Road, Perumbakkam, Chennai - 600100, Tamil Nadu, India'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3 className="font-semibold">{t('contact_office_hours_title') || 'Office Hours'}</h3>
                <div className="text-muted-foreground mt-2">{t('contact_office_hours') || 'Mon - Sat: 10 AM - 6 PM'}</div>
              </div>
            </div>
          </div>

          {/* Right: Contact form card */}
          <div>
            <Card className="shadow-lg rounded-md">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl">{t('contact_send_message_title') || 'Send us a Message'}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <Label htmlFor="name">{t('contact_form_name') || 'Name *'}</Label>
                    <Input id="name" name="name" placeholder="" />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t('contact_form_phone') || 'Phone *'}</Label>
                    <Input id="phone" name="phone" placeholder="" />
                  </div>

                  <div>
                    <Label htmlFor="email">{t('contact_form_email') || 'Email'}</Label>
                    <Input id="email" name="email" placeholder="" />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('contact_form_message') || 'Message *'}</Label>
                    <Textarea id="message" name="message" rows={5} />
                  </div>

                  <div>
                    <Button type="submit" className="w-full" style={{ backgroundColor: '#29A9E1' }}>
                      <Send className="mr-2 h-4 w-4" /> {t('contact_send_message') || 'Send Message'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{t('contact_map_title')}</h2>
          <div className="mx-auto max-w-3xl h-48 md:h-64 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps?q=V5WX+W9+Chennai,+Tamil+Nadu&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
