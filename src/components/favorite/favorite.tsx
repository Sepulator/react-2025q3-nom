'use client';

import type { ChangeEvent } from 'react';

import { useMoviesStore } from '@/store';
import { Movie } from '@/types/interfaces';

interface Props {
  movie: Movie;
}

export function Favorite({ movie }: Props) {
  const movies = useMoviesStore((state) => state.movies);
  const addMovie = useMoviesStore((state) => state.addMovie);
  const removeMovie = useMoviesStore((state) => state.removeMovie);

  const isFavorite = movies.some((m) => m.imdbID === movie.imdbID);

  const handleFavoriteClick = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      addMovie(movie);
    } else {
      removeMovie(movie.imdbID);
    }
  };

  return (
    <label className="card-favorite">
      <input
        type="checkbox"
        name={`favorite-${movie.imdbID}`}
        onChange={handleFavoriteClick}
        checked={isFavorite}
        placeholder="Select movie as favorite"
      />
    </label>
  );
}
