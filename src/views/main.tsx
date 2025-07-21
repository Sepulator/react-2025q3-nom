import CardsList from '@/components/card-list';
import Search from '@/components/search';
import { httpMessages } from '@/consts';
import { Pagination } from '@/components/pagination/pagination';
import { useMovies } from '@/hooks/useMovies';

export function Main() {
  const { moviesList, loading, error } = useMovies();

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
        <CardsList movieList={moviesList.results} />
      ) : (
        <span>Nothing to display. Type to search movie.</span>
      )}
      {moviesList.results.length > 0 && <Pagination moviesList={moviesList} />}
    </>
  );
}
