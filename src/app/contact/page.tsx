'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { Mail, MapPin, Phone } from "lucide-react";

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
                  <CardContent className="text-muted-foreground text-lg">
                    <p>A4, Vishwaa Pride Apartment, Nookampalayam Main Road, Perumbakkam, Chennai - 600100, Tamil Nadu, India</p>
                  </CardContent>
                </Card>
              </div>
      </section>

      <section className="bg-white">
        <div className="container py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('contact_map_title')}</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.020338959614!2d80.22903581482208!3d12.970591990856516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8b6da2a69d%3A0x6c6c7f5f2b2b6d5!2sVishwaa%20Pride!5e0!3m2!1sen!2sin!4v1620826989421!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
