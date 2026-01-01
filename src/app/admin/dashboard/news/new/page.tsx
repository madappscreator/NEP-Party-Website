'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewsArticle } from '@/lib/news-service';
import { ArticleForm } from '../article-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewArticlePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use custom date if provided
      const customDate = data.publishDate ? new Date(data.publishDate) : undefined;

      await createNewsArticle({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl || '',
        imageHint: data.imageHint || data.title,
        videoUrl: data.videoUrl || '',
        author: data.author || 'NEP Admin',
        category: data.category || 'News',
        tags: data.tags || [],
        published: data.published,
        publishedAt: data.published ? (customDate || new Date()) : null,
      }, customDate);

      router.push('/admin/dashboard/news');
    } catch (err) {
      console.error('Error creating article:', err);
      setError('Failed to create article');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard/news">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <p className="text-gray-600 mt-2">Write and publish a news article</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="max-w-3xl">
        <ArticleForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

