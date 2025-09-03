import { urlMovie } from '@/consts';
import { mapKeysToLowerCase } from '@/services/utils';
import type { MovieDetail, MoviesList } from '@/types/interfaces';

export const getMovieList = async (query: string, page: string) => {
  const response = await fetch(`${urlMovie}&s=${query}&page=${page}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = await response.json();
  return mapKeysToLowerCase<MoviesList>(data);
};
export const getNowPLaying = async (page: string) => {
  const response = await fetch(`${urlMovie}&s=spider-man&page=${page}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = await response.json();
  return mapKeysToLowerCase<MoviesList>(data);
};
export const getMovie = async (id: string) => {
  const response = await fetch(`${urlMovie}&i=${id}`);
  if (!response.ok) throw new Error(response.status.toString());

  const data = await response.json();
  return mapKeysToLowerCase<MovieDetail>(data);
};
