import { getKey } from '@/services/utils';
import { httpMessages } from '@/consts/http-status-code';

export const MAX_BUTTONS = 8;
export const MAX_PAGES = 10;
export const QUERY = 'query-nom';
export const key = getKey('be07cccf'); //27008b8a
export const url = `https://www.omdbapi.com/`;
export const posterUrl = `http://img.omdbapi.com/?apikey=${key}&h=600`;
export const urlMovie = `https://www.omdbapi.com/?apikey=${key}`;
export { httpMessages };
