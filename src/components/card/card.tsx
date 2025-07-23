import image from '@/assets/image.svg';
import type { Movie } from '@/types/interfaces';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
import { useSearchParams } from 'react-router';
import React from 'react';
import { useMoviesStore } from '@/store';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { title, poster_path, release_date } = movie;
  const [, setSearchParams] = useSearchParams();
  const movies = useMoviesStore((state) => state.movies);
  const addMovie = useMoviesStore((state) => state.addMovie);
  const removeMovie = useMoviesStore((state) => state.removeMovie);

  const isFavorite = movies.some((m) => m.id === movie.id);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('.card-favorite')) {
      return;
    }

    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('detail', movie.id.toString());
      return updatedSearchParams;
    });
  };

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

        <label className="card-favorite">
          <input type="checkbox" name="favorite" onChange={handleFavoriteClick} checked={isFavorite} />
        </label>
      </article>
    </>
  );
}
