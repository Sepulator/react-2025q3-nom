import Card from '@/components/card';
import type { Movie } from '@/types/interfaces';

interface Props {
  movieList: Movie[];
  query: { query: string; page: string };
}

export function CardsList({ movieList, query }: Props) {
  return (
    <section className="cards-list">
      {movieList.map((movie) => (
        <Card movie={movie} key={movie.imdbID} query={query} />
      ))}
    </section>
  );
}
