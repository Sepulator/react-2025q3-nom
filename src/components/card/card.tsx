import image from '@/assets/image.svg';
import type { Movie } from '@/types/interfaces';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
import { useSearchParams } from 'react-router';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { title, poster_path, release_date } = movie;
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('detail', movie.id.toString());
      return updatedSearchParams;
    });
  };

  return (
    <>
      <article className="card" onClick={handleClick}>
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
