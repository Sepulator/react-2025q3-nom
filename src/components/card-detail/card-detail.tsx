import Image from 'next/image';

import { MovieDetail } from '@/types/interfaces';
import CloseButton from '@/components/close-button';

interface Props {
  data: MovieDetail;
  query?: { query: string; page: string };
}

export function CardDetail({ data }: Props) {
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
      </div>
      <CloseButton />
    </article>
  );
}
