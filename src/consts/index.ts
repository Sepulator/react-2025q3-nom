import { httpMessages } from '@/consts/http-status-code';

export const API_KEY = import.meta.env.VITE_API_KEY;

export const MAX_BUTTONS = 8;
export const QUERY = 'query-nom';
export const urlImage = 'https://image.tmdb.org/t/p/';
export const poster_sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];

export const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
export const urlNowPLaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
export const urlMovie = `https://api.themoviedb.org/3/movie/`;

export { httpMessages };
