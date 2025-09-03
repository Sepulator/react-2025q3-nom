import { create } from 'zustand';

import type { Movie } from '@/types/interfaces';
import { createSelectors } from '@/store/store-utils';

interface MoviesStore {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
  reset: () => void;
}

export const useMoviesBase = create<MoviesStore>((set, _, store) => ({
  movies: [],
  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, movie],
    })),
  removeMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.imdbID !== id),
    })),
  reset: () => {
    set(store.getInitialState());
  },
}));

export const useMoviesStore = createSelectors(useMoviesBase);
