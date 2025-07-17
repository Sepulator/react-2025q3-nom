import { useEffect, useState } from 'react';

import CardsList from '@/components/card-list';
import { getMovieList, getNowPLaying } from '@/services/api';
import { useLocalStorage } from '@/services/localstorage';
import type { MoviesList } from '@/types/interfaces';
import Search from '@/components/search';
import { httpMessages, QUERY } from '@/consts';
import { Pagination } from '@/components/pagination/pagination';
import { useSearchParams } from 'react-router';

interface State {
  moviesList: MoviesList;
  loading: boolean;
  error: string | null;
}

export function Main() {
  const [storedValue] = useLocalStorage<string>(QUERY, '');
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<State>({
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
    setSearchParams({ query: storedValue, page: '1' });
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      {state.error ? (
        <article style={{ color: 'var(--pico-del-color)' }}>
          Error: {state.error + ' '}
          {httpMessages.find((code) => code.status.toString() === state.error)?.message}
        </article>
      ) : state.loading ? (
        <article aria-busy="true">Loading</article>
      ) : state.moviesList.results.length ? (
        <CardsList movieList={state.moviesList.results} />
      ) : (
        <span>Nothing to display. Type to search movie.</span>
      )}
      <Pagination moviesList={state.moviesList} />
    </>
  );
}
