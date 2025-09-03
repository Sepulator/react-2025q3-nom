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

  if (error || moviesList.error) {
    return <ErrorInfo error={error} status_message={moviesList?.error} />;
  }

  if (loading) {
    return <article aria-busy="true">Loading</article>;
  }

  console.log(moviesList);
  if (!moviesList.search.length) {
    return <span>Nothing to display. Type to search movie.</span>;
  }

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      <div className={details ? 'outlet-detail' : 'outlet'}>
        <CardsList movieList={moviesList.search} />
        {details && <Outlet />}
      </div>
      <Pagination moviesList={moviesList} />
      <Flyout />
    </>
  );
}
