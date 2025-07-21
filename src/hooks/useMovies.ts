import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState<number | null>(null);
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

      if (!updatedSearchParams.has('detail') && id) {
        updatedSearchParams.set('detail', 'true');
      }

      if (updatedSearchParams.has('detail') && !id) {
        updatedSearchParams.delete('detail');
      }

      return updatedSearchParams;
    });
  }, [id, setSearchParams, storedValue]);

  useEffect(() => {
    async function fetchMovies() {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));

      try {
        const query = searchParams.get('query');
        const moviesList = query ? await getMovieList(query, searchParams.get('page') || '1') : await getNowPLaying();
        setState((prevState) => ({ ...prevState, moviesList, loading: false }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: error instanceof Error ? error.message : 'Failed to fetch movies',
          loading: false,
        }));
      }
    }

    fetchMovies();
  }, [searchParams]);

  return { state, id, setId };
}
