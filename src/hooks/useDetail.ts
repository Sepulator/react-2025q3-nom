import { getMovie } from '@/services/api';
import type { MovieDetail } from '@/types/interfaces';
import { useEffect, useState } from 'react';

export function useDetail(id: number) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      if (id) {
        try {
          const response = await getMovie(Number(id));
          setMovie(response);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setIsError(error instanceof Error ? error.message : 'Failed to fetch movie');
        }
      }
    }
    fetchMovie();
  }, [id]);

  return { movie, isLoading, isError };
}
