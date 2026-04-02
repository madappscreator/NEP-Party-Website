'use client';

import { useLanguage } from "@/context/language-context";
import { Phone, Mail } from "lucide-react";

export function ContactStrip() {
    const { t } = useLanguage();
    return (
        <section id="contact-strip" className="py-12 bg-background">
            <div className="container">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center mb-8">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
                        {t('contact_strip_title')}
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    <a href="tel:+919176101115" className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-6 w-6 text-primary" />
                        <span>+91 91761 01115</span>
                    </a>
                    <a href="tel:+919176102229" className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-6 w-6 text-primary" />
                        <span>+91 91761 02229</span>
                    </a>
                    <a href="mailto:allindianep@gmail.com" className="flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                        <span>allindianep@gmail.com</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
