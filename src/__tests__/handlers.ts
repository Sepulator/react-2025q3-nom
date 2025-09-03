import { url } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';
import { http, HttpResponse } from 'msw';

export const mockMovie: MovieDetail = {
  title: 'Test Movie Detail',
  year: '2017',
  rated: 'PG-13',
  released: '05 May 2017',
  runtime: '136 min',
  genre: 'Action, Adventure, Comedy',
  director: 'Test Director',
  writer: 'Test Writer',
  actors: 'Test Actors',
  plot: 'Test overview Detail',
  language: 'English',
  country: 'United States',
  awards: 'Test Awards',
  poster: '/test-poster-detail.jpg',
  ratings: [],
  metascore: '67',
  imdbRating: '7.6',
  imdbVotes: '123,123',
  imdbID: 'tt999999999999',
  type: 'movie',
  dvd: 'N/A',
  boxOffice: '$389,813,101',
  production: 'N/A',
  website: 'N/A',
  response: 'True',
};

export const mockMoviesList: MoviesList = {
  search: [
    {
      imdbID: '123',
      title: 'Test Movie',
      poster: '/test.jpg',
      type: 'movie',
      year: '2025',
    },
  ],
  totalResults: '1',
  response: 'True',
};

export const mockEmptyMovies: MoviesList = {
  search: [],
  totalResults: '0',
  response: 'True',
};

export const mockBatmanMovie: MoviesList = {
  search: [
    {
      imdbID: '1',
      title: 'Batman',
      poster: '/poster_batman.jpg',
      year: '2020',
      type: 'movie',
    },
    {
      imdbID: '2',
      title: 'Batman_2',
      poster: '/poster_batman_2.jpg',
      year: '2022',
      type: 'movie',
    },
  ],
  totalResults: '2',
  response: 'True',
};

export const handlers = [
  http.get(url, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('s');
    const id = url.searchParams.get('i');

    if (id === '123') return HttpResponse.json(mockMovie);

    if (search === 'not batman') {
      return HttpResponse.json(mockEmptyMovies);
    }

    if (id === '000') {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Invalid id: The pre-requisite id is invalid or not found.',
      });
    }

    if (search?.toLocaleLowerCase() === 'batman') {
      return HttpResponse.json(mockBatmanMovie);
    }

    if (search === 'error') {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }

    return HttpResponse.json(mockMoviesList);
  }),
];
