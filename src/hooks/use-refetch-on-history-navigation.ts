'use client';

import { useEffect } from 'react';

/**
 * Re-run page loaders when users navigate with browser history.
 * This prevents stale list/detail state when App Router restores cached trees.
 */
export function useRefetchOnHistoryNavigation(refetch: () => void) {
  useEffect(() => {
    const handlePopState = () => {
      refetch();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        refetch();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [refetch]);
}
