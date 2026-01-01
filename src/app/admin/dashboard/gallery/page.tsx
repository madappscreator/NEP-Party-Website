'use client';

import { useState, useEffect } from 'react';
import { getGalleryAlbums, deleteGalleryAlbum } from '@/lib/gallery-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import Link from 'next/link';
import type { Album } from '@/lib/types';

export default function GalleryManagementPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      setLoading(true);
      const data = await getGalleryAlbums();
      setAlbums(data);
      setError(null);
    } catch (err) {
      setError('Failed to load gallery albums');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (albumId: string) => {
    if (!confirm('Are you sure you want to delete this album?')) return;
    
    try {
      await deleteGalleryAlbum(albumId);
      setAlbums(albums.filter(a => a.id !== albumId));
    } catch (err) {
      setError('Failed to delete album');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Manage photo albums and media</p>
        </div>
        <Link href="/admin/dashboard/gallery/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Album
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading albums...</div>
      ) : albums.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">No albums yet</p>
            <Link href="/admin/dashboard/gallery/new">
              <Button>Create First Album</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map(album => (
            <Card key={album.id} className="overflow-hidden hover:shadow-lg transition">
              {album.coverImage && (
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={album.coverImage}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{album.name}</CardTitle>
                <CardDescription>{album.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link href={`/admin/dashboard/gallery/${album.id}`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(album.id)}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

