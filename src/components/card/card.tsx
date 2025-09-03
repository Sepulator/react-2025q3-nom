import type { Movie } from '@/types/interfaces';
import type { ChangeEvent } from 'react';
import { useMoviesStore } from '@/store';
import { Link } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { createDetailPath } = useQueryParams();
  const { title, poster, year } = movie;
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
    <article className="card">
      <Link to={createDetailPath(movie.imdbID)} className="card-link">
        <img src={poster} alt={title} className="card-img"></img>
        <div>
          <p>{title}</p>
          <span>{year}</span>
        </div>
      </Link>
      <label className="card-favorite">
        <input type="checkbox" name={`favorite-${movie.imdbID}`} onChange={handleFavoriteClick} checked={isFavorite} />
      </label>
    </article>
  );
}
