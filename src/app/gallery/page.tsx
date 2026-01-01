'use client';

import { useState, useEffect } from 'react';
import GalleryClient from './gallery-client';
import { getGalleryAlbums } from '@/lib/gallery-service';
import type { Album } from '@/lib/types';

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const data = await getGalleryAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error loading gallery albums:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAlbums();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">Gallery</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">Our journey through the years...</p>
        </div>
      </section>

      {loading ? (
        <section className="container py-12 md:py-24">
          <div className="text-center">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </section>
      ) : albums.length === 0 ? (
        <section className="container py-12 md:py-24">
          <div className="text-center">
            <p className="text-gray-600">No albums available yet. Check back soon!</p>
          </div>
        </section>
      ) : (
        <GalleryClient albums={albums} />
      )}
    </>
  );
}
