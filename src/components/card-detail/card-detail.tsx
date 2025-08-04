import Link from 'next/link';
import ErrorInfo from '@/components/error-info';
import { MovieDetail } from '@/types/interfaces';

interface Props {
  data: string | MovieDetail;
}

export function CardDetail({ data }: Props) {
  if (typeof data === 'string') return <ErrorInfo error={data} status_message={null} />;
  if (data.Error) return <ErrorInfo error={null} status_message={data.Error} />;

  return (
    <article className="card-detail">
      <img aria-label="Movie poster" src={data?.Poster} alt={data?.Title}></img>
      <div>
        <p>{data?.Title}</p>
        <span>{data?.Released}</span>
        <p>{data?.Plot}</p>
        <p>Rating: {data?.imdbRating}</p>
      </div>

      <Link href={'/'} role="button">
        Close
      </Link>
    </article>
  );
}
