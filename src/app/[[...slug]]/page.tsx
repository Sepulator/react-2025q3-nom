import CardDetail from '@/components/card-detail';
import CardsList from '@/components/card-list';
import ErrorInfo from '@/components/error-info';
import Flyout from '@/components/flyout';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { getMovie, getMovieList, getNowPLaying } from '@/services/api';

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ searchParams, params }: Props) {
  const { page = '1', query = '' } = await searchParams;
  const { slug } = await params;

  const [pathname, imdbId] = slug ? slug : ['', ''];
  const movie = imdbId ? await getMovie(imdbId) : null;

  const data = query ? await getMovieList(query, page) : await getNowPLaying(page);

  if (typeof data === 'string') return <ErrorInfo error={data} status_message={null} />;
  if (data.Error) return <ErrorInfo error={null} status_message={data.Error} />;
  if (data.Search.length === 0) return <span>Nothing to display. Type to search movie.</span>;

  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      <div className={pathname === 'details' ? 'outlet-detail' : 'outlet'}>
        <CardsList movieList={data.Search} />
        {movie && <CardDetail data={movie} />}
      </div>
      <Pagination totalResults={data.totalResults} />
      <Flyout />
    </>
  );
}
