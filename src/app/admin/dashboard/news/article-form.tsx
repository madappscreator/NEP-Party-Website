'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { uploadNewsImage, extractYouTubeVideoId, getYouTubeEmbedUrl, type NewsArticle } from '@/lib/news-service';
import { Upload, X, Youtube, CalendarIcon } from 'lucide-react';

// Helper to format date for input
const formatDateForInput = (date: Date | null | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

interface ArticleFormProps {
  initialData?: Partial<NewsArticle>;
  onSubmit: (data: Partial<NewsArticle> & { publishDate?: Date }) => Promise<void>;
  isLoading?: boolean;
  articleId?: string;
}

export function ArticleForm({ initialData, onSubmit, isLoading = false, articleId }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    imageUrl: initialData?.imageUrl || '',
    imageHint: initialData?.imageHint || '',
    videoUrl: initialData?.videoUrl || '',
    author: initialData?.author || '',
    category: initialData?.category || 'General',
    tags: initialData?.tags || [],
    published: initialData?.published || false,
    publishDate: formatDateForInput(initialData?.publishedAt || initialData?.createdAt),
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Use articleId if available, otherwise use 'temp'
      const id = articleId || 'temp-' + Date.now();
      const url = await uploadNewsImage(id, file);
      setFormData(prev => ({
        ...prev,
        imageUrl: url,
        imageHint: file.name
      }));
      setError(null);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert date string to Date object
      const submitData = {
        ...formData,
        publishDate: formData.publishDate ? new Date(formData.publishDate) : undefined,
      };
      await onSubmit(submitData);
    } catch (err) {
      setError('Failed to save article');
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
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter article title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., News, Events, Updates"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="publishDate" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Publish Date
            </Label>
            <Input
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleInputChange}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Set a custom date for this article (useful for backdating old news)
            </p>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary for article cards..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here..."
              rows={10}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Featured Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.imageUrl ? (
            <div className="relative">
              <img
                src={formData.imageUrl}
                alt="Featured"
                className="w-full max-w-md h-48 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '', imageHint: '' }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:underline">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            YouTube Video (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">YouTube Video URL</Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste a YouTube video URL to embed it in the article
            </p>
          </div>

          {formData.videoUrl && extractYouTubeVideoId(formData.videoUrl) && (
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(formData.videoUrl) || ''}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video preview"
                />
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {formData.videoUrl && !extractYouTubeVideoId(formData.videoUrl) && (
            <p className="text-sm text-red-500">
              Invalid YouTube URL. Please use a valid YouTube video link.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published">
              {formData.published ? 'Published (visible on website)' : 'Draft (not visible)'}
            </Label>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading || uploading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Article'}
      </Button>
    </form>
  );
}

