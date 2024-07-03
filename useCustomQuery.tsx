import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider, UseQueryOptions, UseQueryResult, QueryFunction } from 'react-query';

const queryClient = new QueryClient();

function useCustomQuery<T>(
  queryKey: string,
  queryFn: QueryFunction<T>,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T> & { isRefreshing: boolean } {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const queryResult = useQuery<T, Error>(queryKey, queryFn, {
    ...options,
    onSuccess: (data) => {
      setIsFirstLoad(false);
      options?.onSuccess?.(data);
    },
  });

  return {
    ...queryResult,
    isRefreshing: !isFirstLoad && queryResult.isFetching,
  };
}