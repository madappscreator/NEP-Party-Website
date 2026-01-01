'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { uploadGalleryImage } from '@/lib/gallery-service';
import { Upload, X, CalendarIcon } from 'lucide-react';

// Helper to format date for input
const formatDateForInput = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

interface AlbumFormProps {
  initialData?: {
    name: string;
    description: string;
    coverImage: string;
    media: Array<{ url: string; alt: string; hint: string; type: 'image' | 'video' }>;
    createdAt?: Date | string;
  };
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  albumId?: string;
}

export function AlbumForm({ initialData, onSubmit, isLoading = false, albumId }: AlbumFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    coverImage: initialData?.coverImage || '',
    media: initialData?.media || [],
    albumDate: formatDateForInput(initialData?.createdAt)
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !albumId) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadGalleryImage(albumId, file);
        setFormData(prev => ({
          ...prev,
          media: [...prev.media, {
            type: 'image' as const,
            url,
            alt: file.name,
            hint: file.name
          }]
        }));
      }
      setError(null);
    } catch (err) {
      setError('Failed to upload images');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert date string to Date object for submission
      const submitData = {
        ...formData,
        albumDate: formData.albumDate ? new Date(formData.albumDate) : undefined
      };
      await onSubmit(submitData);
    } catch (err) {
      setError('Failed to save album');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Album Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Album Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Party Rally 2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe this album..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="albumDate" className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4" />
              Album Date
            </Label>
            <Input
              id="albumDate"
              name="albumDate"
              type="date"
              value={formData.albumDate}
              onChange={handleInputChange}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Set the date for this album (useful for old photos/events)
            </p>
          </div>
        </CardContent>
      </Card>

      {albumId && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:underline">Click to upload</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
            </div>

            {formData.media.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.media.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Button type="submit" disabled={isLoading || uploading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Album'}
      </Button>
    </form>
  );
}

