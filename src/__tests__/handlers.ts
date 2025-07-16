import type { MoviesList } from '@/types/interfaces';
import { http, HttpResponse } from 'msw';

export const mockMoviesList: MoviesList = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      poster_path: '/test.jpg',
      release_date: '2025-07-16',
      vote_average: 7.5,
      adult: false,
      backdrop_path: '/test-backdrop.jpg',
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Test Movie',
      popularity: 100,
      video: false,
      vote_count: 100,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockEmptyMovies: MoviesList = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const mockBatmanMovie: MoviesList = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Batman',
      overview: 'Batman',
      poster_path: '/test.jpg',
      release_date: '2020-06-16',
      vote_average: 7.5,
      adult: false,
      backdrop_path: '/test-backdrop.jpg',
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Batman',
      popularity: 100,
      video: false,
      vote_count: 100,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const handlers = [
  http.get('https://api.themoviedb.org/3/search/movie', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('query');
    if (!search) return HttpResponse.json(mockEmptyMovies);

    if (search.toLocaleLowerCase() === 'batman') {
      return HttpResponse.json(mockBatmanMovie);
    }
    return HttpResponse.json(mockMoviesList);
  }),

  http.get('https://api.themoviedb.org/3/movie/now_playing', () => {
    return HttpResponse.json(mockMoviesList);
  }),
];
