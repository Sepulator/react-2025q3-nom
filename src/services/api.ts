import { urlNowPLaying, urlSearchMovie } from '@/consts';
import type { MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string) => {
  const response = await fetch(`${urlSearchMovie}&query=${query}`);
  const data = (await response.json()) as MoviesList;

  return data;
};
export const getNowPLaying = async () => {
  const response = await fetch(`${urlNowPLaying}`);
  const data = (await response.json()) as MoviesList;

  return data;
};
