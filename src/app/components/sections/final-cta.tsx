'use client';

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

export function FinalCta() {
    const { t } = useLanguage();
    return (
        <section id="final-cta" className="py-20 text-white" style={{background: 'linear-gradient(to right, #6B7F2A, #FF7A00)'}}>
            <div className="container text-center space-y-6">
                <h2 className="text-4xl font-headline font-bold">{t('final_cta_title')}</h2>
                <p className="text-lg max-w-2xl mx-auto text-white/80">{t('final_cta_subtitle')}</p>
                <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}} className="text-white hover:opacity-90">
                    <Link href="/register">{t('register_now')}</Link>
                </Button>
            </div>
        </section>
    )
}
