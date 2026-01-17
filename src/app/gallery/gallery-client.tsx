"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Album } from "@/lib/types";
import { ImageIcon, X, ChevronLeft, ChevronRight, Grid3X3, Play } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function GalleryClient({ albums }: { albums: Album[] }) {
  const [selectedAlbum, setSelectedAlbum] = React.useState<Album | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);
  const [viewMode, setViewMode] = React.useState<'grid' | 'lightbox'>('grid');
  const { t } = useLanguage();

  const getMediaCounts = (album: Album) => {
    const imageCount = album.media.filter(m => m.type === 'image').length;
    const videoCount = album.media.filter(m => m.type === 'video').length;
    return { imageCount, videoCount };
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedImageIndex(0);
    setViewMode('grid');
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setViewMode('lightbox');
  };

  const handleClose = () => {
    if (viewMode === 'lightbox') {
      setViewMode('grid');
    } else {
      setSelectedAlbum(null);
      setViewMode('grid');
    }
  };

  return (
    <>
      {/* Albums Grid */}
      <section className="container py-12 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album) => {
            const { imageCount, videoCount } = getMediaCounts(album);
            const translationKey = `gallery_album_${album.id.replace(/-/g, '_')}_name`;
            const translatedName = t(translationKey);
            const albumName = translatedName !== translationKey ? translatedName : album.name;
            const coverImageSrc = album.coverImage ||
              (album.media && album.media.length > 0 ? album.media[0].url : null) ||
              '/placeholder-album.jpg';

            // Get preview images (up to 4)
            const previewImages = album.media.filter(m => m.type === 'image').slice(0, 4);
            const remainingCount = imageCount - 4;

            return (
              <Card
                key={album.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 bg-white border-0 shadow-lg"
                onClick={() => handleAlbumClick(album)}
              >
                <CardContent className="p-0">
                  {/* Facebook-style album cover with preview grid */}
                  <div className="relative aspect-square">
                    {previewImages.length >= 4 ? (
                      // 4-image grid preview
                      <div className="grid grid-cols-2 grid-rows-2 gap-0.5 h-full">
                        {previewImages.map((media, idx) => (
                          <div key={idx} className="relative overflow-hidden">
                            <Image
                              src={media.url}
                              alt={media.alt || `Preview ${idx + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {idx === 3 && remainingCount > 0 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">+{remainingCount}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Single cover image
                      <>
                        {coverImageSrc ? (
                          <Image
                            src={coverImageSrc}
                            alt={albumName}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                        {imageCount > 1 && (
                          <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-full">
                            <span className="text-white text-sm font-medium">{imageCount}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {/* Album info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{albumName}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      {imageCount > 0 && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-4 w-4" /> {imageCount} photos
                        </span>
                      )}
                      {videoCount > 0 && (
                        <span className="flex items-center gap-1">
                          <Play className="h-4 w-4" /> {videoCount} videos
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Album Viewer Modal */}
      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          viewMode={viewMode}
          selectedImageIndex={selectedImageIndex}
          onImageClick={handleImageClick}
          onClose={handleClose}
          onBackToGrid={() => setViewMode('grid')}
        />
      )}
    </>
  );
}

interface AlbumViewerProps {
  album: Album;
  viewMode: 'grid' | 'lightbox';
  selectedImageIndex: number;
  onImageClick: (index: number) => void;
  onClose: () => void;
  onBackToGrid: () => void;
}

function AlbumViewer({
  album,
  viewMode,
  selectedImageIndex,
  onImageClick,
  onClose,
  onBackToGrid
}: AlbumViewerProps) {
  const { t } = useLanguage();
  const galleryRef = React.useRef<ImageGallery>(null);

  const nameKey = `gallery_album_${album.id.replace(/-/g, '_')}_name`;
  const descKey = `gallery_album_${album.id.replace(/-/g, '_')}_desc`;
  const translatedName = t(nameKey);
  const translatedDesc = t(descKey);
  const albumName = translatedName !== nameKey ? translatedName : album.name;
  const albumDescription = translatedDesc !== descKey ? translatedDesc : (album.description || '');

  // Prepare images for react-image-gallery
  const galleryImages = album.media
    .filter(media => media.type === 'image' && media.url)
    .map((media, index) => {
      const altKey = `gallery_album_${album.id.replace(/-/g, '_')}_media_${index}_alt`;
      const translatedAlt = t(altKey);
      const mediaAlt = translatedAlt !== altKey ? translatedAlt : (media.alt || `Image ${index + 1}`);
      return {
        original: media.url,
        thumbnail: media.url,
        originalAlt: mediaAlt,
        thumbnailAlt: mediaAlt,
        description: mediaAlt,
      };
    });

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            {viewMode === 'lightbox' && (
              <button
                onClick={onBackToGrid}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Grid3X3 className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Grid</span>
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{albumName}</h2>
              {albumDescription && (
                <p className="text-sm text-white/60 hidden sm:block">{albumDescription}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Photo Grid View */
        <div className="h-full pt-20 pb-4 overflow-y-auto">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {album.media
                .filter(media => media.type === 'image' && media.url)
                .map((media, index) => {
                  const altKey = `gallery_album_${album.id.replace(/-/g, '_')}_media_${index}_alt`;
                  const translatedAlt = t(altKey);
                  const mediaAlt = translatedAlt !== altKey ? translatedAlt : (media.alt || `Image ${index + 1}`);

                  return (
                    <div
                      key={index}
                      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
                      onClick={() => onImageClick(index)}
                    >
                      <Image
                        src={media.url}
                        alt={mediaAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        /* Full-screen Lightbox View */
        <div className="h-full pt-16 pb-4 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4">
            <ImageGallery
              ref={galleryRef}
              items={galleryImages}
              startIndex={selectedImageIndex}
              showPlayButton={true}
              showFullscreenButton={true}
              showThumbnails={true}
              showNav={true}
              showBullets={false}
              infinite={true}
              slideInterval={3000}
              slideDuration={450}
              thumbnailPosition="bottom"
              useBrowserFullscreen={true}
              lazyLoad={true}
              additionalClass="custom-gallery"
              renderLeftNav={(onClick, disabled) => (
                <button
                  type="button"
                  className="image-gallery-icon image-gallery-left-nav absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors disabled:opacity-30"
                  disabled={disabled}
                  onClick={onClick}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
              )}
              renderRightNav={(onClick, disabled) => (
                <button
                  type="button"
                  className="image-gallery-icon image-gallery-right-nav absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors disabled:opacity-30"
                  disabled={disabled}
                  onClick={onClick}
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
