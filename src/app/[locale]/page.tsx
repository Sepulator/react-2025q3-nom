import { getTranslations } from 'next-intl/server';

import CardsList from '@/components/card-list';
import ErrorInfo from '@/components/error-info';
import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { getMovieList, getNowPLaying } from '@/services/api';

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const t = await getTranslations('HomePage');
  const { page = '1', query = '' } = await searchParams;

  const data = query ? await getMovieList(query, page) : await getNowPLaying(page);

  if (typeof data === 'string') return <ErrorInfo error={data} status_message={null} />;
  if (data.Error) return <ErrorInfo error={null} status_message={data.Error} />;
  if (data.Search.length === 0) return <span>Nothing to display. Type to search movie.</span>;

  return (
    <main className="container main">
      <h1>{t('title')}</h1>
      <Search />
      <div className="outlet">
        <CardsList movieList={data.Search} query={{ query, page }} />
      </div>
      <Pagination totalResults={data.totalResults} />
      <Flyout />
    </main>
  );
}
