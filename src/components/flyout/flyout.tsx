'use client';

import { useTranslations } from 'next-intl';

import { useMoviesStore } from '@/store';
import { useMovieCsvDownloader } from '@/hooks/useMovieCsvDownloader';

export function Flyout() {
  const { isLoading, downloadCsv } = useMovieCsvDownloader();
  const movies = useMoviesStore((state) => state.movies);
  const clearMovies = useMoviesStore((state) => state.reset);
  const t = useTranslations('Flyout');
  const length = movies.length;

  if (!length) return null;

  const handleDownload = async () => {
    downloadCsv(movies);
  };

  return (
    <aside className="flyout" aria-label="flyout">
      <h4>{length > 1 ? `${length} ${t('more')}` : `${length} ${t('one')}`}</h4>
      <button onClick={clearMovies}>{t('unselect')}</button>
      <button aria-busy={isLoading} onClick={handleDownload} disabled={isLoading} aria-label="flyout-download">
        {t('load')}
      </button>
    </aside>
  );
}
