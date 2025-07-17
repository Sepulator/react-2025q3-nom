import image from '@/assets/image.svg';
import type { Movie } from '@/types/interfaces';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { title, poster_path, release_date } = movie;

  return (
    <>
      <article className="card">
        <img
          src={poster_path ? `${urlImage}/${poster_sizes[2]}/${poster_path}` : image}
          alt={poster_path ? `${title}` : `No image available for ${title}`}
          className="card-img"
        ></img>
        <div>
          <p>{title}</p>
          <span>{release_date && formatDate(release_date)}</span>
        </div>
      </article>
    </>
  );
}
