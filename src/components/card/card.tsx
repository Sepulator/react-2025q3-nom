import Image from 'next/image';
import Link from 'next/link';

import { Favorite } from '@/components/favorite/favorite';
import type { Movie } from '@/types/interfaces';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Title, Poster, Year } = movie;

  return (
    <article className="card">
      <Link href={`/details/${movie.imdbID}`} className="card-link">
        <Image
          src={Poster === 'N/A' ? './placeholder.svg' : Poster}
          alt={Title}
          className="card-img"
          width={256}
          height={379}
        ></Image>
        <div>
          <p>{Title}</p>
          <span>{Year}</span>
        </div>
      </Link>
      <Favorite movie={movie} />
    </article>
  );
}
