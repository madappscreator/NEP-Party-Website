import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
    const presidentImage = "/NEP President.jpg";

    return (
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
            <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-32 min-h-[70vh]">
                <div className="flex flex-col items-start gap-6 text-left z-10">
                    <Badge variant="secondary" className="bg-white/20 text-white">Serving Those Who Served</Badge>
                    <h1 className="text-5xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                        National Ex-Servicemen Party
                    </h1>
                    <p className="max-w-xl text-lg md:text-xl text-primary-foreground/80">
                        This party is not only for ex-servicemen but entirely for the general public. We welcome everyone who wishes to serve the nation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button asChild size="lg" style={{backgroundColor: '#FF7A00'}}>
                            <Link href="/register">Join Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                            <Link href="/manifesto">Manifesto</Link>
                        </Button>
                    </div>
                     <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">1,00,000+</p>
                            <p className="text-base text-primary-foreground/80">Registered Members</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold">28+</p>
                            <p className="text-base text-primary-foreground/80">States & Union Territories</p>
                        </div>
                         <div className="text-center">
                            <p className="text-4xl font-bold">100+</p>
                            <p className="text-base text-primary-foreground/80">District Teams</p>
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
                            data-ai-hint="portrait man"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
