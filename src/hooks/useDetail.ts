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
    setIsLoading(true);
    async function fetchMovie() {
      if (!movieId) return;
      try {
        const response = await getMovie(movieId);
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
