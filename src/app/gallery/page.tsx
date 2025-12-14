
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
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
import type { Album, AlbumMedia } from '@/lib/types';
import { Film, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = React.useState<Album | null>(null);
  const { t } = useLanguage();

  const getMediaCounts = (album: Album) => {
    const imageCount = album.media.filter(m => m.type === 'image').length;
    const videoCount = album.media.filter(m => m.type === 'video').length;
    return { imageCount, videoCount };
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            {t('gallery_title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            {t('gallery_subtitle')}
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ALBUMS.map((album) => {
            const { imageCount, videoCount } = getMediaCounts(album);
            const albumName = t(`gallery_album_${album.id.replace(/-/g, '_')}_name`);
            return (
              <Card 
                key={album.id} 
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                onClick={() => setSelectedAlbum(album)}
              >
                <CardContent className="p-0 aspect-video relative">
                  <Image
                    src={album.coverImage}
                    alt={albumName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={album.coverImageHint}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{albumName}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      {imageCount > 0 && <p className="flex items-center gap-1"><ImageIcon className="h-4 w-4"/> {imageCount}</p>}
                      {videoCount > 0 && <p className="flex items-center gap-1"><Film className="h-4 w-4"/> {videoCount}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
  const { t } = useLanguage();
  const albumName = t(`gallery_album_${album.id.replace(/-/g, '_')}_name`);
  const albumDescription = t(`gallery_album_${album.id.replace(/-/g, '_')}_desc`);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{albumName}</DialogTitle>
          <DialogDescription>{albumDescription}</DialogDescription>
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
              {album.media.map((media, index) => {
                const mediaAlt = t(`gallery_album_${album.id.replace(/-/g, '_')}_media_${index}_alt`);
                return (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative bg-black rounded-lg">
                      {media.type === 'image' ? (
                        <Image 
                          src={media.url} 
                          alt={mediaAlt}
                          fill 
                          className="object-contain"
                          data-ai-hint={media.hint}
                        />
                      ) : (
                        <video 
                          src={media.url} 
                          controls
                          className="w-full h-full object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
