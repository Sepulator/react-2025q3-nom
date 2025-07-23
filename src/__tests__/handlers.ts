import type { MovieDetail, MoviesList } from '@/types/interfaces';
import { http, HttpResponse } from 'msw';

export const mockMovie: MovieDetail = {
  title: 'Test Movie Detail',
  overview: 'Test overview Detail',
  release_date: '2023-07-22',
  vote_average: 8.5,
  poster_path: '/test-poster-detail.jpg',
  adult: false,
  backdrop_path: '/backdrop-detail.jpg',
  belongs_to_collection: null,
  budget: 1000000,
  genres: [{ id: 1, name: 'Action' }],
  homepage: 'https://test.com',
  id: 123,
  imdb_id: 'tt1234567',
  original_language: 'en',
  original_title: 'Test Movie',
  origin_country: ['US'],
  popularity: 100,
  production_companies: [],
  production_countries: [],
  revenue: 2000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'Test tagline',
  video: false,
  vote_count: 1000,
};

export const mockMoviesList: MoviesList = {
  page: 1,
  results: [
    {
      id: 123,
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
      poster_path: '/poster_batman.jpg',
      release_date: '2020-06-16',
      vote_average: 7.5,
      adult: false,
      backdrop_path: '/backdrop_batman.jpg',
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Batman',
      popularity: 100,
      video: false,
      vote_count: 100,
    },
    {
      id: 2,
      title: 'Batman_2',
      overview: 'Batman_2',
      poster_path: null,
      release_date: '2020-06-16',
      vote_average: 7.5,
      adult: false,
      backdrop_path: '/backdrop_batman_2.jpg',
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Batman',
      popularity: 100,
      video: false,
      vote_count: 100,
    },
  ],
  total_pages: 2,
  total_results: 2,
};

export const handlers = [
  http.get('https://api.themoviedb.org/3/search/movie', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('query');
    if (!search) return HttpResponse.json(mockEmptyMovies);

    if (search.toLocaleLowerCase() === 'batman') {
      return HttpResponse.json(mockBatmanMovie);
    }

    if (search === 'error') {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }

    return HttpResponse.json(mockEmptyMovies);
  }),

  http.get('https://api.themoviedb.org/3/movie/now_playing', () => {
    return HttpResponse.json(mockMoviesList);
  }),

  http.get<{ id: string }>('https://api.themoviedb.org/3/movie/:id', ({ params }) => {
    const { id } = params;

    if (id === '123') return HttpResponse.json(mockMovie);

    if (id === '000')
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Invalid id: The pre-requisite id is invalid or not found.',
      });
  }),
];
