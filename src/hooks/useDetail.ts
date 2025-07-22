import { getMovie } from '@/services/api';
import type { MovieDetail } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export function useDetail() {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('detail');

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    async function fetchMovie() {
      try {
        const response = await getMovie(Number(id));
        setMovie(response);
      } catch (error) {
        setIsError(error instanceof Error ? error.message : 'Failed to fetch movie');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  return { movie, isLoading, isError };
}
