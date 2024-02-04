import axios from 'axios';

import { captureException } from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';

const onError = (error: unknown) => {
  if (axios.isAxiosError(error) && (error.status ?? 0) >= 500) {
    captureException(error);
  }
};

// refetch after 15 seconds
export const REFETCH_INTERVAL_TIME_FOR_LIST = 1000 * 15;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
      retry: false,
    },
    queries: {
      retry: 0,
      onError,
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retryDelay: 5000,
      cacheTime: 0,
    },
  },
});

export const mockQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
      retry: false,
    },
    queries: {
      cacheTime: 0,
    },
  },
});
