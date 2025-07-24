import type { Movie } from '@/types/interfaces';

export const getKey = (arr: string) => {
  let result = '';

  for (let i = arr.length - 1; i >= 0; i--) {
    result += arr[i];
  }

  return result;
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

const generateMovieCSV = (movies: Movie[]) =>
  movies.reduce((prev, movie) => {
    return prev + `${movie.id}; ${movie.title}; ${movie.release_date}; ${movie.vote_average} \n`;
  }, 'id; title; release date; vote average \n');

export const getDownloadMovieURL = (movies: Movie[]) => {
  const content = generateMovieCSV(movies);
  const blob = new Blob([content], { type: 'text/csv; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  return url;
};
