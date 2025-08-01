import type { Movie } from '@/types/interfaces';

export const getKey = (arr: string) => {
  let result = '';

  for (let i = arr.length - 1; i >= 0; i--) {
    result += arr[i];
  }

  return result;
};

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
