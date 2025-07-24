import { afterEach, describe, expect, it } from 'vitest';
import { useMoviesStore } from './index';
import { mockBatmanMovie } from '@/__tests__/handlers';

describe('useMoviesStore', () => {
  const mockMovie = mockBatmanMovie.results[0];
  const mockMovie2 = mockBatmanMovie.results[1];

  afterEach(() => {
    const { reset } = useMoviesStore.getState();
    reset();
  });

  it('should initialize with empty movies array', () => {
    const state = useMoviesStore.getState();
    expect(state.movies).toEqual([]);
  });

  it('should add a movie', () => {
    const { addMovie } = useMoviesStore.getState();
    addMovie(mockMovie);

    const state = useMoviesStore.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0]).toEqual(mockMovie);
  });

  it('should remove a movie by id', () => {
    const { addMovie, removeMovie } = useMoviesStore.getState();

    addMovie(mockMovie);
    addMovie(mockMovie2);

    removeMovie(mockMovie2.id);

    const state = useMoviesStore.getState();
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0]).toEqual(mockMovie);
  });

  it('should reset the store to initial state', () => {
    const { addMovie, reset } = useMoviesStore.getState();

    addMovie(mockMovie);
    addMovie(mockMovie);

    reset();

    const state = useMoviesStore.getState();
    expect(state.movies).toEqual([]);
  });
});
