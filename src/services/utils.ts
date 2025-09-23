import type { Movie } from '@/types/interfaces';

const generateMovieCSV = (movies: Movie[]) =>
  movies.reduce((prev, movie) => {
    return prev + `${movie.imdbID}; ${movie.Title}; ${movie.Year}; ${movie.imdbID} \n`;
  }, 'id; title; release date; vote average \n');

export const getDownloadMovieURL = (movies: Movie[]) => {
  const content = generateMovieCSV(movies);
  const blob = new Blob([content], { type: 'text/csv; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  return url;
};
