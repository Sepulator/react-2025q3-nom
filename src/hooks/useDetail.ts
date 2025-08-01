import { getMovie } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export function useDetail() {
  const { movieId } = useParams();

  const { status, data, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId || ''),
  });

  return { status, data, error };
}
