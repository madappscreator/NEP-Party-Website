'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGalleryAlbum } from '@/lib/gallery-service';
import { AlbumForm } from '../album-form';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewAlbumPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use custom date if provided
      const customDate = formData.albumDate ? new Date(formData.albumDate) : undefined;

      // Create the album first
      const newAlbumId = await createGalleryAlbum({
        name: formData.name,
        description: formData.description,
        coverImage: '',
        coverImageHint: formData.name,
        media: []
      }, customDate);

      // Redirect to edit page where user can upload images
      router.push(`/admin/dashboard/gallery/${newAlbumId}`);
    } catch (err) {
      console.error('Error creating album:', err);
      setError('Failed to save album');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/dashboard/gallery" className="text-blue-600 hover:underline flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Create New Album</h1>
        <p className="text-gray-600 mt-2">Add a new photo album to the gallery</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-800">
            First, enter the album name and description. After saving, you'll be redirected to upload images.
          </p>
        </CardContent>
      </Card>

      <div className="max-w-2xl">
        <AlbumForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

