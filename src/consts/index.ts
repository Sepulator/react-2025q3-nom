import { httpMessages } from '@/consts/http-status-code';

export const MAX_BUTTONS = 8;
export const MAX_PAGES = 10;
export const QUERY = 'query-nom';
export const key = import.meta.env.VITE_API_KEY;
export const url = `https://www.omdbapi.com/`;
export const posterUrl = `http://img.omdbapi.com/?apikey=${key}&h=600`;
export const urlMovie = `https://www.omdbapi.com/?apikey=${key}`;
export { httpMessages };

export const TIME_CONSTANTS = {
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
} as const;
