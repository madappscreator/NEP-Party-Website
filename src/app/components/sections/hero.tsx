import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

    return (
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container flex flex-col items-center gap-6">
                <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                    For the Nation. For the People.
                </h1>
                <p className="max-w-3xl text-lg md:text-xl text-primary-foreground/80">
                    The National Ex-Servicemen Party is dedicated to upholding the values of discipline, integrity, and selfless service. Join us in building a stronger, more secure India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button asChild size="lg">
                        <Link href="/register">Become a Member</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/donate">Support Our Cause</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
