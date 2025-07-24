import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getMovieList, getNowPLaying } from '@/services/api';
import type { MoviesList } from '@/types/interfaces';
import { QUERY } from '@/consts';

interface MoviesState {
  moviesList: MoviesList;
  loading: boolean;
  error: string | null;
}

export function useMovies() {
  const [storedValue] = useLocalStorage<string>(QUERY, '');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<MoviesState>({
    moviesList: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    loading: false,
    error: null,
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

  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? '1';
  const details = location.pathname.includes('details');

  useEffect(() => {
    let isMounted = true;

    async function fetchMovies() {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      try {
        const moviesList = query ? await getMovieList(query, page) : await getNowPLaying(page);

        if (isMounted) {
          setState((prevState) => ({ ...prevState, moviesList, loading: false }));
        }
      } catch (error) {
        if (isMounted) {
          setState((prevState) => ({
            ...prevState,
            error: error instanceof Error ? error.message : 'Failed to fetch movies',
            loading: false,
          }));
        }
      }
    }

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  return { state, details };
}
