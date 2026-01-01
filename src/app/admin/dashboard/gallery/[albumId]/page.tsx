'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getGalleryAlbum, updateGalleryAlbum } from '@/lib/gallery-service';
import { AlbumForm } from '../album-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Album } from '@/lib/types';

interface EditAlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { albumId } = use(params);
  const router = useRouter();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        setLoading(true);
        const data = await getGalleryAlbum(albumId);
        if (data) {
          setAlbum(data);
        } else {
          setError('Album not found');
        }
      } catch (err) {
        setError('Failed to load album');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAlbum();
  }, [albumId]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    try {
      await updateGalleryAlbum(albumId, {
        name: data.name,
        description: data.description,
        coverImage: data.media[0]?.url || data.coverImage || '',
        coverImageHint: data.name,
        media: data.media
      });
      router.push('/admin/dashboard/gallery');
    } catch (err) {
      setError('Failed to update album');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading album...</p>
      </div>
    );
  }

  if (error && !album) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <Link href="/admin/dashboard/gallery">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/gallery">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Edit Album</h1>
        <p className="text-gray-600 mt-2">Update album details and manage images</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {album && (
        <AlbumForm
          initialData={{
            name: album.name,
            description: album.description || '',
            coverImage: album.coverImage || '',
            media: album.media || []
          }}
          onSubmit={handleSubmit}
          isLoading={saving}
          albumId={albumId}
        />
      )}
    </div>
  );
}

