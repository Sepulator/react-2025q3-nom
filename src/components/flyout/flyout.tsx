import { getDownloadMovieURL } from '@/services/utils';
import { useMoviesStore } from '@/store';

export function Flyout() {
  const movies = useMoviesStore.use.movies();
  const clearMovies = useMoviesStore.use.reset();
  const length = movies.length;

  if (!length) return null;

  return (
    <aside className="flyout" aria-label="flyout">
      <h4>{length > 1 ? `${length} items are selected` : `${length} item is selected`}</h4>
      <button onClick={clearMovies}>Unselect all</button>
      <a href={getDownloadMovieURL(movies)} aria-label="flyout-download" download={`${length}_movies.csv`}>
        Download
      </a>
    </aside>
  );
}
