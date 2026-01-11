'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * TanStack Query Provider
 * 
 * This provider wraps your app to enable TanStack Query features.
 * QueryClient should be created once and reused.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient once (React 19 compatible)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: how long data is considered fresh
            staleTime: 60 * 1000, // 1 minute
            // Cache time: how long unused data stays in cache
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            // Retry failed requests
            retry: 1,
            // Refetch on window focus
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

