import CardsList from '@/components/card-list';
import Search from '@/components/search';
import { httpMessages } from '@/consts';
import { Pagination } from '@/components/pagination/pagination';
import { useMovies } from '@/hooks/useMovies';
import { CardDetail } from '@/components/card-detail/card-detail';
import Flyout from '@/components/flyout';

export function Main() {
  const { state, detail } = useMovies();
  const { moviesList, loading, error } = state;

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      {error ? (
        <article style={{ color: 'var(--pico-del-color)' }}>
          Error: {error + ' '}
          {httpMessages.find((code) => code.status.toString() === error)?.message}
        </article>
      ) : loading ? (
        <article aria-busy="true">Loading</article>
      ) : moviesList.results.length ? (
        <>
          <div className={detail ? 'outlet-detail' : 'outlet'}>
            <CardsList movieList={moviesList.results} />
            {detail && <CardDetail />}
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
