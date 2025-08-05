'use server';

import { Movie } from '@/types/interfaces';

export const generateMovieCsvAction = async (movies: Movie[]) =>
  movies.reduce((prev, movie) => {
    return prev + `${movie.imdbID}; ${movie.Title}; ${movie.Year}; ${movie.Type} \n`;
  }, 'id; title; release date; type \n');
