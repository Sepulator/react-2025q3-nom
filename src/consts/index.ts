import { httpMessages } from '@/consts/http-status-code';
export const API_KEY = import.meta.env.VITE_API_KEY;

export const MAX_BUTTONS = 8;
export const MAX_PAGES = 10;
export const QUERY = 'query-nom';

export const url = `https://www.omdbapi.com/`;
export const urlMovie = `https://www.omdbapi.com/?apikey=${API_KEY}`;
export { httpMessages };
