import { Outlet } from 'react-router';

import CardsList from '@/components/card-list';
import Search from '@/components/search';
import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination';
import ErrorInfo from '@/components/error-info';
import { useMovies } from '@/hooks/useMovies';

export function Main() {
  const { state, details } = useMovies();
  const { moviesList, loading, error } = state;

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      {error || moviesList.Error ? (
        <ErrorInfo error={error} status_message={moviesList?.Error} />
      ) : loading ? (
        <article aria-busy="true">Loading</article>
      ) : moviesList.Search.length ? (
        <>
          <div className={details ? 'outlet-detail' : 'outlet'}>
            <CardsList movieList={moviesList.Search} />
            {details && <Outlet />}
          </div>
          <Pagination moviesList={moviesList} />
        </>
      ) : (
        <span>Nothing to display. Type to search movie.</span>
      )}
      <Flyout />
    </>
  );
}
