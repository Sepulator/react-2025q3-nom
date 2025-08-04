import CardDetail from '@/components/card-detail';
import ErrorInfo from '@/components/error-info';
import { getMovie } from '@/services/api';

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
  params: Promise<{ slug: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page = '1', query = '' } = await searchParams;

  const movie = await getMovie(slug);

  if (typeof movie === 'string') return <ErrorInfo error={movie} status_message={null} />;
  if (movie.Error) return <ErrorInfo error={null} status_message={movie.Error} />;

  return (
    <>
      <CardDetail data={movie} query={{ query, page }} />
    </>
  );
}
