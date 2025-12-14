'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DUMMY_NEWS_ARTICLES } from "@/lib/constants-old";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { NewsSummaryModal } from '@/app/components/shared/news-summary-modal';
import type { NewsArticle } from '@/lib/types';

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null);

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center mb-12">
        <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Latest News & Updates
        </h1>
        <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed">
          Stay informed about our party's activities and our perspective on national issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DUMMY_NEWS_ARTICLES.map((article) => {
          const image = PlaceHolderImages.find(p => p.id === article.imageId);
          return (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                {image && (
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image 
                      src={image.imageUrl} 
                      alt={article.title} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={image.imageHint}
                      />
                  </div>
                )}
                 <CardTitle className="mt-4">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{article.date} - {article.source}</p>
                <p className="text-sm mt-2 line-clamp-3">{article.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0" onClick={() => setSelectedArticle(article)}>
                  Read More & Get AI Summary
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {selectedArticle && (
        <NewsSummaryModal 
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
