import { getKey } from '../services/utils';

export const base_url = 'http://image.tmdb.org/t/p/';
export const poster_sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];
const key = getKey();
export const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;
export const urlNowPLaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
