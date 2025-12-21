
'use client';

import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Quote } from "lucide-react";

export function Leadership() {
    const { t } = useLanguage();
    const founderImage = "/NEP President.jpg";
    return (
        <section id="leadership" className="bg-muted py-12 md:py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                     <Image
                        src={founderImage}
                        alt="Founder President — Lion. Dr. Suresh Babu K"
                        width={400}
                        height={400}
                        className="rounded-lg object-cover shadow-xl"
                        style={{ width: "auto", height: "auto" }}
                        data-ai-hint="portrait man leader"
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary">{t('leadership_title')}</h3>
                    <p className="text-muted-foreground text-lg">
                        {t('leadership_bio')}
                    </p>
                    <div className="border-l-4 border-primary pl-4 py-2 space-y-2">
                        <Quote className="h-8 w-8 text-primary/50" />
                         <p className="text-xl font-medium italic text-foreground">
                           {t('leadership_quote')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
