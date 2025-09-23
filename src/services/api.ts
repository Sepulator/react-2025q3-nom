import { httpMessages, urlMovie } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';

const apiRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const statusText = httpMessages.find((code) => code.status === String(response.status))?.message;
    throw new Error(`API Error: ${response.status} ${statusText}`);
  }

  const data = await response.json();

  return data as T;
};

export const getMovieList = (query: string, page: string) =>
  apiRequest<MoviesList>(`${urlMovie}&s=${query}&page=${page}`);

export const getNowPLaying = async (page: string) => apiRequest<MoviesList>(`${urlMovie}&s=spider-man&page=${page}`);

export const getMovie = async (id: string) => apiRequest<MovieDetail>(`${urlMovie}&i=${id}`);
