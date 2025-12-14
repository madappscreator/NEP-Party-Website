'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            {t('contact_title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            {t('contact_subtitle')}
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{t('contact_phone')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-lg">
                <a href="tel:+919176101115" className="block hover:text-primary transition-colors">+91 91761 01115</a>
                <a href="tel:+919176102229" className="block hover:text-primary transition-colors">+91 91761 02229</a>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg">
             <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{t('contact_email')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-lg">
               <a href="mailto:allindianep@gmail.com" className="block hover:text-primary transition-colors">allindianep@gmail.com</a>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg md:col-span-2 lg:col-span-1">
             <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{t('contact_address')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground text-lg">
               <p>{t('contact_address_l1')}</p>
               <p>{t('contact_address_l2')}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
