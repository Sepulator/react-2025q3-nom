import { urlMovie } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string, page: string) => {
  const response = await fetch(`${urlMovie}&s=${query}&page=${page}`);
  const data = (await response.json()) as MoviesList;
  if (!response.ok) throw new Error(response.status.toString());
  return data;
};
export const getNowPLaying = async (page: string) => {
  const response = await fetch(`${urlMovie}&s=spider-man&page=${page}`);
  const data = (await response.json()) as MoviesList;

  if (!response.ok) throw new Error(response.status.toString());
  return data;
};
export const getMovie = async (id: string) => {
  const response = await fetch(`${urlMovie}&i=${id}`);
  const data = (await response.json()) as MovieDetail;

  if (!response.ok) throw new Error(response.status.toString());
  return data;
};
