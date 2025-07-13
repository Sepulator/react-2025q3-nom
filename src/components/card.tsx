import { base_url, poster_sizes } from '../consts/consts';
import { formatDate } from '../services/utils';
import image from '../assets/image.svg';
import type { Movie } from '../types/interfaces';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { title, poster_path, release_date } = movie;

  return (
    <>
      <article className="card">
        <img src={poster_path ? `${base_url}/${poster_sizes[2]}/${poster_path}` : image}></img>
        <div>
          <p>{title}</p>
          <span>{release_date && formatDate(release_date)}</span>
        </div>
      </article>
    </>
  );
}
