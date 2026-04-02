'use client';
import * as React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import { useLanguage } from '@/context/language-context';

const journeyImages = [
    {id: 'caravan-1', alt: 'NEP Caravan', hint: 'political campaign vehicle', url: '/caravan/caravan1.jpg'},
    {id: 'caravan-2', alt: 'NEP Campaign Vehicle', hint: 'political campaign vehicle', url: '/caravan/caravan2.jpg'},
    {id: 'caravan-3', alt: 'NEP Campaign Truck', hint: 'political campaign vehicle', url: '/caravan/caravan3.jpg'},
];

export function Journey() {
    const { t } = useLanguage();
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

  return (
    <section id="journey" className="bg-muted py-12 md:py-24">
       <div className="container mx-auto flex max-w-5xl flex-col items-center gap-2 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('journey_title')}
            </h2>
      </div>

      <div className="container">
        <Carousel 
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full max-w-4xl mx-auto">
            <CarouselContent>
            {journeyImages.map((image) => (
                <CarouselItem key={image.id}>
                <div className="p-1">
                    <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                        <Image 
                            src={image.url}
                            alt={image.alt}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                            data-ai-hint={image.hint}
                        />
                    </CardContent>
                    </Card>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
