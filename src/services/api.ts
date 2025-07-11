import type { MovieList } from '../types/interfaces';
import { getKey } from './utils';

const key = getKey();
const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;

export const getMovieList = async (query: string) => {
  const response = await fetch(`${url}&query=${query}`);

  if (response.ok) {
    return (await response.json()) as MovieList;
  }

  return null;
};
