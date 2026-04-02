'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function WhyJoinCard() {
    const { t } = useLanguage();

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('why_join_hero_card_title')}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {t('why_join_hero_card_desc')}
                    </p>
                    <Button asChild size="sm" style={{ backgroundColor: '#FF7A00', color: 'white' }} className="w-full">
                        <Link href="/why-join">{t('why_join_hero_card_button')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
