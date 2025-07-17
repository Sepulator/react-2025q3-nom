import { useEffect, useState } from 'react';

import CardsList from '@/components/card-list';
import { getMovieList, getNowPLaying } from '@/services/api';
import { queryStorage } from '@/services/localstorage';
import type { MoviesList } from '@/types/interfaces';
import Search from '@/components/search';
import { httpMessages } from '@/consts';

interface State {
  moviesList: MoviesList;
  loading: boolean;
  error: string | null;
}

export function Main() {
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
    const query = queryStorage.get();
    if (query === null) {
      getMoviesList('');
    } else {
      getMoviesList(query);
    }
  }, []);

  const getMoviesList = async (query: string) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const moviesList = query ? await getMovieList(query) : await getNowPLaying();
      setState((prevState) => ({ ...prevState, moviesList, loading: false }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'Failed to fetch movies',
        loading: false,
      }));
    }
  };

  return (
    <main className="container main">
      <h1>The Movie Database API</h1>
      <Search handleQuery={getMoviesList} />
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
    </main>
  );
}
