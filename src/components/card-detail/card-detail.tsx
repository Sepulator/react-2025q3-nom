import Link from 'next/link';
import Image from 'next/image';

import { MovieDetail } from '@/types/interfaces';

interface Props {
  data: MovieDetail;
  query: { query: string; page: string };
}

export function CardDetail({ data, query }: Props) {
  return (
    <article className="card-detail">
      <Image
        aria-label="Movie poster"
        src={data.Poster === 'N/A' ? './placeholder.svg' : data.Poster}
        alt={data?.Title}
        width={256}
        height={379}
      ></Image>
      <div>
        <p>{data?.Title}</p>
        <span>{data?.Released}</span>
        <p>{data?.Plot}</p>
        <p>Rating: {data?.imdbRating}</p>
        <Link href={{ pathname: '/', query }} role="button">
          Close
        </Link>
      </div>
    </article>
  );
}
