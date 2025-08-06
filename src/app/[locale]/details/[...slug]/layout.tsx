import CardDetail from '@/components/card-detail';
import ErrorInfo from '@/components/error-info';
import { getMovie } from '@/services/api';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CardDetailLayout({ params, children }: Props) {
  const { slug } = await params;

  const movie = await getMovie(slug);

  if (typeof movie === 'string') return <ErrorInfo error={movie} status_message={null} />;
  if (movie.Error) return <ErrorInfo error={null} status_message={movie.Error} />;

  return (
    <div className="outlet">
      {children}
      <CardDetail data={movie} />
    </div>
  );
}
