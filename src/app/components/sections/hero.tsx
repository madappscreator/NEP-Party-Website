import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
    const presidentImage = "/president.jpg";

    return (
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start gap-4 text-left">
                    <Badge variant="secondary" className="bg-white/20 text-white">Serving Those Who Served</Badge>
                    <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl leading-tight tracking-tighter">
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
                     <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold">1,00,000+</p>
                            <p className="text-sm text-primary-foreground/80">Registered Members</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold">28+</p>
                            <p className="text-sm text-primary-foreground/80">States & Union Territories</p>
                        </div>
                         <div className="text-center">
                            <p className="text-3xl font-bold">100+</p>
                            <p className="text-sm text-primary-foreground/80">District Teams</p>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <div className="text-center">
                        <Image
                            src={presidentImage}
                            alt="National President"
                            width={200}
                            height={200}
                            className="rounded-full object-cover border-4 border-white shadow-2xl mx-auto"
                            priority
                            data-ai-hint="portrait man"
                        />
                        <p className="mt-4 font-semibold text-lg">National President</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
