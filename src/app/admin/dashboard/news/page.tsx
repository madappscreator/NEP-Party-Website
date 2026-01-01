'use client';

import { useState, useEffect } from 'react';
import { getNewsArticles, deleteNewsArticle, type NewsArticle } from '@/lib/news-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await getNewsArticles(false); // Get all articles including drafts
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load news articles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await deleteNewsArticle(articleId);
      setArticles(articles.filter(a => a.id !== articleId));
    } catch (err) {
      setError('Failed to delete article');
      console.error(err);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">News Management</h1>
          <p className="text-gray-600 mt-2">Create and manage news articles</p>
        </div>
        <Link href="/admin/dashboard/news/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading articles...</div>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">No articles yet</p>
            <Link href="/admin/dashboard/news/new">
              <Button>Create First Article</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map(article => (
            <Card key={article.id} className="hover:shadow-md transition">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      {article.published ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {article.category} • {formatDate(article.createdAt)}
                      {article.author && ` • By ${article.author}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/dashboard/news/${article.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.excerpt || article.content.substring(0, 150)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

