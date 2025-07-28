import CardsList from '@/components/card-list';
import Search from '@/components/search';

import { useMovies } from '@/hooks/useMovies';
import { Outlet } from 'react-router';

import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination';
import ErrorInfo from '@/components/error-info';

export function Main() {
  const { status, data, error, details } = useMovies();

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      {status === 'error' ? (
        <ErrorInfo error={error} />
      ) : status === 'pending' ? (
        <article aria-busy="true">Loading</article>
      ) : data && data.results.length ? (
        <>
          <div className={details ? 'outlet-detail' : 'outlet'}>
            <CardsList movieList={data.results} />
            {details && <Outlet />}
          </div>
          <Pagination moviesList={data} />
        </>
      ) : (
        <span>Nothing to display. Type to search movie.</span>
      )}
      <Flyout />
    </>
  );
}
