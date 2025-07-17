import { urlNowPLaying, urlSearchMovie } from '@/consts';
import type { MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string, page: string) => {
  const response = await fetch(`${urlSearchMovie}&query=${query}&page=${page}`);
  const data = (await response.json()) as MoviesList;
  if (!response.ok) throw new Error(response.status.toString());
  return data;
};
export const getNowPLaying = async () => {
  const response = await fetch(`${urlNowPLaying}`);
  const data = (await response.json()) as MoviesList;

  if (!response.ok) throw new Error(response.status.toString());
  return data;
};
