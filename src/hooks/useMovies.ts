import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getMovieList, getNowPLaying } from '@/services/api';

import { QUERY } from '@/consts';
import { useQuery } from '@tanstack/react-query';

export function useMovies() {
  const [storedValue] = useLocalStorage<string>(QUERY, '');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? '1';
  const details = location.pathname.includes('details');

  const { status, data, error } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => {
      return query ? getMovieList(query, page) : getNowPLaying(page);
    },
  });

  useEffect(() => {
    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      if (!updatedSearchParams.has('query')) {
        updatedSearchParams.set('query', storedValue);
        updatedSearchParams.set('page', '1');
      }

      return updatedSearchParams;
    });
  }, [setSearchParams, storedValue]);

  return { status, data, details, error };
}
