
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GALLERY_ALBUMS } from '@/lib/constants';
import type { Album, AlbumImage } from '@/lib/types';
import { ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = React.useState<Album | null>(null);

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            Our Gallery
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Moments from our journey across the nation.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ALBUMS.map((album) => (
            <Card 
              key={album.id} 
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
              onClick={() => setSelectedAlbum(album)}
            >
              <CardContent className="p-0 aspect-video relative">
                <Image
                  src={album.coverImage}
                  alt={album.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={album.coverImageHint}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{album.name}</h3>
                  <p className="text-sm text-white/80 flex items-center gap-2"><ImageIcon className="h-4 w-4"/> {album.images.length} photos</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          isOpen={!!selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </>
  );
}

function AlbumViewer({ album, isOpen, onClose }: { album: Album; isOpen: boolean; onClose: () => void; }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{album.name}</DialogTitle>
          <DialogDescription>{album.description}</DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {album.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                    <Image 
                      src={image.url} 
                      alt={image.alt} 
                      fill 
                      className="object-contain rounded-lg"
                      data-ai-hint={image.hint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
