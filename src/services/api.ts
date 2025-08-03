import { urlMovie } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string, page: string) => {
  const response = await fetch(`${urlMovie}&s=${query}&page=${page}`);
  if (!response.ok) return `Error: ${response.status.toString()} ${response.statusText.toString()}`;

  const data = (await response.json()) as MoviesList;
  return data;
};
export const getNowPLaying = async (page: string) => {
  const response = await fetch(`${urlMovie}&s=spider-man&page=${page}`);
  if (!response.ok) return `Error: ${response.status.toString()} ${response.statusText.toString()}`;

  const data = (await response.json()) as MoviesList;
  return data;
};
export const getMovie = async (id: string) => {
  const response = await fetch(`${urlMovie}&i=${id}`);
  if (!response.ok) return `Error: ${response.status.toString()} ${response.statusText.toString()}`;

  const data = (await response.json()) as MovieDetail;
  return data;
};
