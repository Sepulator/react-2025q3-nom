import Card from '@/components/card';
import type { Movie } from '@/types/interfaces';

interface Props {
  movieList: Movie[];
}

export function CardsList({ movieList }: Props) {
  return (
    <section className="cards-list">
      {movieList.map((movie) => (
        <Card movie={movie} key={movie.imdbID} />
      ))}
    </section>
  );
}
