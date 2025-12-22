'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

export function Hero() {
    const { t } = useLanguage();
    const presidentImage = "/NEP President.jpg";

    const policyLeaders = [
        { name: "Dr. B.R. Ambedkar", image: "/Policy leaders/Dr._Bhimrao_Ambedkar.jpg" },
        { name: "Abdul Kalam", image: "/Policy leaders/Abdul_Kalam.jpg" },
        { name: "Kamarajar", image: "/Policy leaders/Kamarajar.jpg" },
        { name: "Muthuramalinga Thevar", image: "/Policy leaders/Muthuramalinga_Thevar.jpg" },
        { name: "Netaji", image: "/Policy leaders/Netaji.png" }
    ];

    return (
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-32 min-h-[70vh]">
                <div className="flex flex-col items-start gap-6 text-left z-10">
                    <Badge variant="secondary" className="bg-white/20 text-white">{t('hero_badge')}</Badge>
                    <h1 className="text-5xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                        {t('hero_title')}
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-primary-foreground/80">
                        {t('hero_subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}}>
                            <Link href="/register">{t('join_now')}</Link>
                        </Button>
                        <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}}>
                            <Link href="/manifesto">{t('manifesto')}</Link>
                        </Button>
                    </div>
                     <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">{t('stats_members_value')}</p>
                            <p className="text-base text-primary-foreground/80">{t('stats_members_label')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold">{t('stats_states_value')}</p>
                            <p className="text-base text-primary-foreground/80">{t('stats_states_label')}</p>
                        </div>
                         <div className="text-center">
                            <p className="text-4xl font-bold">{t('stats_teams_value')}</p>
                            <p className="text-base text-primary-foreground/80">{t('stats_teams_label')}</p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 z-0">
                    <div className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20">
                         <Image
                            src={presidentImage}
                            alt="National President"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            data-ai-hint="portrait man"
                        />
                    </div>
                </div>
            </div>

            {/* Policy Leaders Section */}
            <div className="bg-white/10 backdrop-blur-sm py-12">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                        கொள்கை தலைவர்கள் (Policy Leaders)
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {policyLeaders.map((leader, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-white text-sm md:text-base font-medium mt-2 text-center max-w-24">
                                    {leader.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
