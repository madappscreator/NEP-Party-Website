// Server component: build albums from /public/gallery and render client UI
import fs from 'fs';
import path from 'path';
import GalleryClient from './gallery-client';
import { useLanguage } from '@/context/language-context';
import type { Album } from '@/lib/types';

function isImageFile(name: string) {
  return /\.(jpe?g|png|webp|gif|svg)$/i.test(name);
}

export default function GalleryPage() {
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery');
  let albums: Album[] = [];

  try {
    const entries = fs.readdirSync(galleryRoot, { withFileTypes: true });
    const folders = entries.filter(e => e.isDirectory()).map(d => d.name);

    albums = folders.map(folder => {
      const folderPath = path.join(galleryRoot, folder);
      const files = fs.readdirSync(folderPath).filter(f => isImageFile(f));
      const media = files.map((file) => ({ type: 'image', url: `/gallery/${folder}/${file}`, alt: file, hint: file }));
      const coverImage = media.length > 0 ? media[0].url : '/placeholder.png';
      return {
        id: folder.replace(/\s+/g, '-').toLowerCase(),
        name: folder,
        description: '',
        coverImage,
        coverImageHint: folder,
        media,
      } as Album;
    }).filter(a => a.media.length > 0);
  } catch (e) {
    // if folder doesn't exist or read fails, fall back to empty albums
    albums = [];
  }

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">Gallery</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">Our journey through the years...</p>
        </div>
      </section>

      <GalleryClient albums={albums} />
    </>
  );
}
