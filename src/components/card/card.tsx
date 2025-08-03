import { Favorite } from '@/components/favorite/favorite';
import type { Movie } from '@/types/interfaces';
import Link from 'next/link';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Title, Poster, Year } = movie;

  return (
    <article className="card">
      <Link href={`details/${movie.imdbID}`} className="card-link">
        <img src={Poster} alt={Title} className="card-img"></img>
        <div>
          <p>{Title}</p>
          <span>{Year}</span>
        </div>
      </Link>
      <Favorite movie={movie} />
    </article>
  );
}
