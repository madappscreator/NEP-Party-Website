'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { summarizeArticle, type SummarizeArticleOutput } from '@/ai/flows/ai-news-summary';
import type { NewsArticle } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsSummaryModalProps {
  article: NewsArticle;
  isOpen: boolean;
  onClose: () => void;
}

export function NewsSummaryModal({ article, isOpen, onClose }: NewsSummaryModalProps) {
  const [summaryData, setSummaryData] = React.useState<SummarizeArticleOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showFullArticle, setShowFullArticle] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setSummaryData(null);
      setShowFullArticle(false);
      summarizeArticle({
        articleTitle: article.title,
        articleContent: article.content,
      })
        .then(setSummaryData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, article]);

  const handleShowFullArticle = () => {
    setShowFullArticle(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{article.title}</DialogTitle>
          <DialogDescription>
            {article.date} - {article.source}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
          <div className="space-y-4">
            {isLoading && (
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">AI Summary</h3>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            )}
            {summaryData && (
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">AI Summary</h3>
                <p className="text-muted-foreground">{summaryData.summary}</p>
              </div>
            )}

            {summaryData && (
                showFullArticle || !summaryData.shouldRenderFullArticle ? (
                    <div>
                        <h3 className="font-semibold text-lg mt-6 mb-2">Full Article</h3>
                        <p className="whitespace-pre-wrap text-muted-foreground">{article.content}</p>
                    </div>
                ) : (
                    <div className="text-center mt-6">
                        <Button onClick={handleShowFullArticle}>Read Full Article</Button>
                    </div>
                )
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
