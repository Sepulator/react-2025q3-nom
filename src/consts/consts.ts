import { getKey } from '../services/utils';

export const urlImage = 'https://image.tmdb.org/t/p/';
export const poster_sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
const key = getKey('379d96759ca1f073b651c08c3b38a4c2');
export const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;
export const urlNowPLaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
