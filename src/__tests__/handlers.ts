import { url } from '@/consts';
import type { MovieDetail, MoviesList } from '@/types/interfaces';
import { http, HttpResponse } from 'msw';

export const mockMovie: MovieDetail = {
  Title: 'Test Movie Detail',
  Year: '2017',
  Rated: 'PG-13',
  Released: '05 May 2017',
  Runtime: '136 min',
  Genre: 'Action, Adventure, Comedy',
  Director: 'Test Director',
  Writer: 'Test Writer',
  Actors: 'Test Actors',
  Plot: 'Test overview Detail',
  Language: 'English',
  Country: 'United States',
  Awards: 'Test Awards',
  Poster: '/test-poster-detail.jpg',
  Ratings: [],
  Metascore: '67',
  imdbRating: '7.6',
  imdbVotes: '123,123',
  imdbID: 'tt999999999999',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: '$389,813,101',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

export const mockMoviesList: MoviesList = {
  Search: [
    {
      imdbID: '123',
      Title: 'Test Movie',
      Poster: '/test.jpg',
      Type: 'movie',
      Year: '2025',
    },
  ],
  totalResults: '1',
  Response: 'True',
};

export const mockEmptyMovies: MoviesList = {
  Search: [],
  totalResults: '0',
  Response: 'True',
};

export const mockBatmanMovie: MoviesList = {
  Search: [
    {
      imdbID: '1',
      Title: 'Batman',
      Poster: '/poster_batman.jpg',
      Year: '2020',
      Type: 'movie',
    },
    {
      imdbID: '2',
      Title: 'Batman_2',
      Poster: '/poster_batman_2.jpg',
      Year: '2022',
      Type: 'movie',
    },
  ],
  totalResults: '2',
  Response: 'True',
};

export const handlers = [
  http.get(url, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('s');
    const id = url.searchParams.get('i');

    if (id === '123') {
      return HttpResponse.json(mockMovie);
    }

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
