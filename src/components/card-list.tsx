import type { Movie } from '../types/interfaces';
import { Card } from './card';

interface Props {
  movieList: Movie[];
}

export function CardsList({ movieList }: Props) {
  return (
    <section className="cards-list">
      {movieList.map((movie) => (
        <Card movie={movie} key={movie.id} />
      ))}
    </section>
  );
}
