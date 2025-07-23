import { create } from 'zustand';
import type { Movie } from '@/types/interfaces';

interface MoviesStore {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
  movies: [],
  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, movie],
    })),
  removeMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    })),
}));
