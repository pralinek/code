import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

const useRouteChangeInvalidate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleRouteChange = () => {
      queryClient.invalidateQueries(); // Adjust based on specific needs
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, queryClient]);
};

export default useRouteChangeInvalidate;