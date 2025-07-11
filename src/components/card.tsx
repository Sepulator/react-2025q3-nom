import { base_url, poster_sizes } from '../consts/consts';
import type { Movie } from '../types/interfaces';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { title, poster_path } = movie;

  return (
    <>
      <article>
        <img src={`${base_url}/${poster_sizes[3]}/${poster_path}`}></img>
        <span>{title}</span>
      </article>
    </>
  );
}
