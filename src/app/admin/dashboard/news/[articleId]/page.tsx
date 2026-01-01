'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getNewsArticle, updateNewsArticle, type NewsArticle } from '@/lib/news-service';
import { ArticleForm } from '../article-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface EditArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const { articleId } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await getNewsArticle(articleId);
        if (data) {
          setArticle(data);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [articleId]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setError(null);
    try {
      // Use custom date if provided
      const customDate = data.publishDate ? new Date(data.publishDate) : undefined;

      await updateNewsArticle(articleId, {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        imageHint: data.imageHint,
        videoUrl: data.videoUrl,
        author: data.author,
        category: data.category,
        tags: data.tags,
        published: data.published,
      }, customDate);
      router.push('/admin/dashboard/news');
    } catch (err) {
      setError('Failed to update article');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error && !article) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <Link href="/admin/dashboard/news">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <p className="text-gray-600 mt-2">Update article content and settings</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {article && (
        <div className="max-w-3xl">
          <ArticleForm
            initialData={article}
            onSubmit={handleSubmit}
            isLoading={saving}
            articleId={articleId}
          />
        </div>
      )}
    </div>
  );
}

