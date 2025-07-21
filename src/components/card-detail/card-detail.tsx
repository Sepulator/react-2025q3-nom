import image from '@/assets/image.svg';
import type { MovieDetail } from '@/types/interfaces';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getMovie } from '@/services/api';

export function CardDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  useEffect(() => {
    async function fetchMovie() {
      if (id) {
        try {
          const response = await getMovie(Number(id));
          setMovie(response);
        } catch (error) {
          console.error('Failed to fetch movie details:', error);
        }
      }
    }
    fetchMovie();
  }, [id]);

  return (
    <>
      <article className="card">
        <img
          src={movie?.poster_path ? `${urlImage}/${poster_sizes[2]}/${movie?.poster_path}` : image}
          alt={movie?.poster_path ? `${movie?.title}` : `No image available for ${movie?.title}`}
          className="card-img"
        ></img>
        <div>
          <p>{movie?.title}</p>
          <span>{movie?.release_date && formatDate(movie?.release_date)}</span>
        </div>
      </article>
    </>
  );
}
