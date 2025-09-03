import { afterEach, describe, expect, it } from 'vitest';
import { useMoviesBase } from './index';
import { mockBatmanMovie } from '@/__tests__/handlers';

describe('useMoviesStore', () => {
  const mockMovie = mockBatmanMovie.search[0];
  const mockMovie2 = mockBatmanMovie.search[1];

  afterEach(() => {
    const { reset } = useMoviesBase.getState();
    reset();
  });

  it('should initialize with empty movies array', () => {
    const state = useMoviesBase.getState();
    expect(state.movies).toEqual([]);
  });

  it('should add a movie', () => {
    const { addMovie } = useMoviesBase.getState();
    addMovie(mockMovie);

    const state = useMoviesBase.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0]).toEqual(mockMovie);
  });

  it('should remove a movie by id', () => {
    const { addMovie, removeMovie } = useMoviesBase.getState();

    addMovie(mockMovie);
    addMovie(mockMovie2);

    removeMovie(mockMovie2.imdbID);

    const state = useMoviesBase.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0]).toEqual(mockMovie);
  });

  it('should reset the store to initial state', () => {
    const { addMovie, reset } = useMoviesBase.getState();

    addMovie(mockMovie);
    addMovie(mockMovie);

    reset();

    const state = useMoviesBase.getState();
    expect(state.movies).toEqual([]);
  });
});
