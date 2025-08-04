import CardsList from '@/components/card-list';
import ErrorInfo from '@/components/error-info';

import { getMovieList, getNowPLaying } from '@/services/api';

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function CardDetailPage({ searchParams }: Props) {
  const { page = '1', query = '' } = await searchParams;

  const data = query ? await getMovieList(query, page) : await getNowPLaying(page);

  if (typeof data === 'string') return <ErrorInfo error={data} status_message={null} />;
  if (data.Error) return <ErrorInfo error={null} status_message={data.Error} />;
  if (data.Search.length === 0) return <span>Nothing to display. Type to search movie.</span>;

  return (
    <>
      <CardsList movieList={data.Search} query={{ query, page }} />
    </>
  );
}
