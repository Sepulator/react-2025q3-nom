import { generateMovieCsvAction } from '@/app/lib/actions';
import { Movie } from '@/types/interfaces';
import { useState } from 'react';

export function useMovieCsvDownloader() {
  const [isLoading, setIsLoading] = useState(false);

  const downloadCsv = async (movies: Movie[]) => {
    setIsLoading(true);
    try {
      const csvData = await generateMovieCsvAction(movies);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${length}_movies.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate CSV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, downloadCsv };
}
