import { url } from '../consts/consts';
import type { MovieList } from '../types/interfaces';

export const getMovieList = async (query: string) => {
  const response = await fetch(`${url}&query=${query}`);
  const data = (await response.json()) as MovieList;

  return data;
};
