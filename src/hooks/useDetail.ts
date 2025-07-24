import { getMovie } from '@/services/api';
import type { MovieDetail } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export function useDetail() {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setIsLoading(true);
    async function fetchMovie() {
      try {
        const response = await getMovie(Number(movieId));
        setMovie(response);
      } catch (error) {
        setIsError(error instanceof Error ? error.message : 'Failed to fetch movie');
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return { movie, isLoading, isError };
}
