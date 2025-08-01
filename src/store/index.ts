import { create } from 'zustand';
import type { Movie } from '@/types/interfaces';

interface MoviesStore {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
  reset: () => void;
}

export const useMoviesStore = create<MoviesStore>((set, _, store) => ({
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
