'use client';

import { useState, useEffect, useCallback } from 'react';
import EventsClient from './events-client';
import { getGalleryAlbums } from '@/lib/gallery-service';
import type { Album } from '@/lib/types';
import { useRefetchOnHistoryNavigation } from '@/hooks/use-refetch-on-history-navigation';
import { useLanguage } from '@/context/language-context';

export default function EventsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const loadAlbums = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGalleryAlbums();
      setAlbums(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  useRefetchOnHistoryNavigation(loadAlbums);

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            {t('events_page_title') || 'Events'}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            {t('events_page_subtitle') || 'Our journey through the years...'}
          </p>
        </div>
      </section>

      {loading ? (
        <section className="container py-12 md:py-24">
          <div className="text-center">
            <p className="text-gray-600">{t('events_loading') || 'Loading events...'}</p>
          </div>
        </section>
      ) : albums.length === 0 ? (
        <section className="container py-12 md:py-24">
          <div className="text-center">
            <p className="text-gray-600">{t('events_empty') || 'No events available yet. Check back soon!'}</p>
          </div>
        </section>
      ) : (
        <EventsClient albums={albums} />
      )}
    </>
  );
}
