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

const journeyImages = [
    {id: 'journey-1', alt: 'Campaign vehicle', hint: 'political campaign', url: 'https://picsum.photos/seed/journey1/800/450'},
    {id: 'journey-2', alt: 'Public outreach', hint: 'community meeting', url: 'https://picsum.photos/seed/journey2/800/450'},
    {id: 'journey-3', alt: 'Party meeting', hint: 'political discussion', url: 'https://picsum.photos/seed/journey3/800/450'},
    {id: 'journey-4', alt: 'Campaign rally', hint: 'political rally', url: 'https://picsum.photos/seed/journey4/800/450'},
];

export function Journey() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

  return (
    <section id="journey" className="container py-12 md:py-24 bg-muted">
       <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Journey
            </h2>
      </div>

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
            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
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
    </section>
  );
}
