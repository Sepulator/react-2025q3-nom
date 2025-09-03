import type { Movie } from '@/types/interfaces';

const generateMovieCSV = (movies: Movie[]) =>
  movies.reduce((prev, movie) => {
    return prev + `${movie.imdbID}; ${movie.title}; ${movie.year}; ${movie.type} \n`;
  }, 'id; title; release date; type \n');

export const getDownloadMovieURL = (movies: Movie[]) => {
  const content = generateMovieCSV(movies);
  const blob = new Blob([content], { type: 'text/csv; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  return url;
};

export const mapKeysToLowerCase = <T>(obj: unknown): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => mapKeysToLowerCase(item)) as T;
  }

  if (obj && typeof obj === 'object') {
    const record = obj as Record<string, unknown>;
    return Object.keys(record).reduce(
      (acc, key) => {
        const lowerKey = key.charAt(0).toLowerCase() + key.slice(1);
        acc[lowerKey] = mapKeysToLowerCase(record[key]);
        return acc;
      },
      {} as Record<string, unknown>
    ) as T;
  }
  return obj as T;
};
