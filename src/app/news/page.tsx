'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNewsArticles, getYouTubeEmbedUrl, type NewsArticle } from "@/lib/news-service";
import { useLanguage } from '@/context/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, User, Youtube, Play } from 'lucide-react';

export default function NewsPage() {
  const [articles, setArticles] = React.useState<NewsArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null);
  const { t } = useLanguage();

  React.useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getNewsArticles(true); // Only published articles
        setArticles(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-headline font-bold md:text-5xl lg:text-6xl">
            {t('news_title') !== 'news_title' ? t('news_title') : 'News & Updates'}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            {t('news_subtitle') !== 'news_subtitle' ? t('news_subtitle') : 'Stay informed about our latest activities and announcements'}
          </p>
        </div>
      </section>

      <div className="container py-12 md:py-24">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading news...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No news articles available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  {article.imageUrl ? (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {article.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="bg-red-600 rounded-full p-3">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : article.videoUrl ? (
                    <div className="aspect-video bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-t-lg flex items-center justify-center relative">
                      <div className="bg-red-600 rounded-full p-4">
                        <Youtube className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.createdAt)}
                    </span>
                    {article.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </span>
                    )}
                    {article.videoUrl && (
                      <span className="flex items-center gap-1 text-red-600">
                        <Youtube className="w-4 h-4" />
                        Video
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt || article.content.substring(0, 150)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() => setSelectedArticle(article)}
                  >
                    {article.videoUrl ? 'Watch Video →' : 'Read More →'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">{selectedArticle.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedArticle.createdAt)}
                </span>
                {selectedArticle.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedArticle.author}
                  </span>
                )}
                {selectedArticle.category && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                    {selectedArticle.category}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              {/* YouTube Video */}
              {selectedArticle.videoUrl && getYouTubeEmbedUrl(selectedArticle.videoUrl) && (
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4 bg-black">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedArticle.videoUrl) || ''}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedArticle.title}
                  />
                </div>
              )}

              {/* Featured Image (only show if no video) */}
              {selectedArticle.imageUrl && !selectedArticle.videoUrl && (
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{selectedArticle.content}</p>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
