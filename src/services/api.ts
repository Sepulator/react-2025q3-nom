import { key, urlMovie, urlNowPLaying, urlSearchMovie } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string, page: string) => {
  const response = await fetch(`${urlSearchMovie}&query=${query}&page=${page}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = (await response.json()) as MoviesList;
  return data;
};
export const getNowPLaying = async (page: string) => {
  const response = await fetch(`${urlNowPLaying}&page=${page}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = (await response.json()) as MoviesList;
  return data;
};
export const getMovie = async (id: number) => {
  const response = await fetch(`${urlMovie}${id}?api_key=${key}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = (await response.json()) as MovieDetail;
  return data;
};
