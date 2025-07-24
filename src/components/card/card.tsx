import image from '@/assets/image.svg';
import type { Movie } from '@/types/interfaces';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
import React from 'react';
import { useMoviesStore } from '@/store';
import { Link } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { createDetailPath } = useQueryParams();
  const { title, poster_path, release_date } = movie;
  const movies = useMoviesStore((state) => state.movies);
  const addMovie = useMoviesStore((state) => state.addMovie);
  const removeMovie = useMoviesStore((state) => state.removeMovie);

  const isFavorite = movies.some((m) => m.id === movie.id);

  const handleFavoriteClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const isChecked = event.target.checked;

    if (isChecked) {
      addMovie(movie);
    } else {
      removeMovie(movie.id);
    }
  };

  return (
    <Link to={createDetailPath(movie.id)} className="card-link">
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

        <label className="card-favorite">
          <input type="checkbox" name={`favorite-${movie.id}`} onChange={handleFavoriteClick} checked={isFavorite} />
        </label>
      </article>
    </Link>
  );
}
