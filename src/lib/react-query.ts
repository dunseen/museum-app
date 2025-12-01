import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const getCachedQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10,
        },
      },
    }),
);
export default getCachedQueryClient;
