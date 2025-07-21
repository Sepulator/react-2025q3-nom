import Card from '@/components/card';
import type { Movie } from '@/types/interfaces';

interface Props {
  movieList: Movie[];
  setId: (id: number | null) => void;
}

export function CardsList({ movieList, setId }: Props) {
  return (
    <section className="cards-list">
      {movieList.map((movie) => (
        <Card movie={movie} key={movie.id} setId={setId} />
      ))}
    </section>
  );
}
