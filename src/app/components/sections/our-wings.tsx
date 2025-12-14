'use client';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { OUR_WINGS_PREVIEW } from "@/lib/constants";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function OurWings() {
    const { t } = useLanguage();
    const [activeWing, setActiveWing] = React.useState(OUR_WINGS_PREVIEW[0]);

    return (
        <section id="our-wings" className="bg-muted py-12 md:py-24">
            <div className="container text-center">
                 <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center mb-12">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    {t('our_wings_title')}
                    </h2>
                    <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
                    {t('our_wings_subtitle')}
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                    {OUR_WINGS_PREVIEW.map(wing => (
                        <Badge 
                            key={wing}
                            onClick={() => setActiveWing(wing)}
                            variant={activeWing === wing ? 'default' : 'secondary'}
                            className="text-lg px-4 py-2 cursor-pointer transition-all"
                        >
                            {t(`wings_${wing.toLowerCase().replace(/ /g, '_').replace(/'/g, '')}_name`)}
                        </Badge>
                    ))}
                </div>

                <Button asChild variant="outline" className="mt-12 bg-background border-secondary text-secondary hover:bg-secondary/10">
                    <Link href="/wings">{t('view_all_wings')}</Link>
                </Button>
            </div>
        </section>
    )
}
