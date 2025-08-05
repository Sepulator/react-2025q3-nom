'use client';

import { useMovieCsvDownloader } from '@/hooks/useMovieCsvDownloader';
import { useMoviesStore } from '@/store';

export function Flyout() {
  const { isLoading, downloadCsv } = useMovieCsvDownloader();
  const movies = useMoviesStore((state) => state.movies);
  const clearMovies = useMoviesStore((state) => state.reset);
  const length = movies.length;

  if (!length) return null;

  const handleDownload = async () => {
    downloadCsv(movies);
  };

  return (
    <aside className="flyout" aria-label="flyout">
      <h4>{length > 1 ? `${length} items are selected` : `${length} item is selected`}</h4>
      <button onClick={clearMovies}>Unselect all</button>
      <button aria-busy={isLoading} onClick={handleDownload} disabled={isLoading} aria-label="flyout-download">
        {isLoading ? 'Generating...' : 'Download CSV'}
      </button>
    </aside>
  );
}
