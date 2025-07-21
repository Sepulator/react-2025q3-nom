import image from '@/assets/image.svg';
import { formatDate } from '@/services/utils';
import { httpMessages, poster_sizes, urlImage } from '@/consts';
import { useDetail } from '@/hooks/useDetail';

interface Props {
  id: number;
  setId: (id: number | null) => void;
}

export function CardDetail({ id, setId }: Props) {
  const { movie, isLoading, isError } = useDetail(id);

  return (
    <>
      {isError ? (
        <article style={{ color: 'var(--pico-del-color)' }}>
          Error: {isError + ' '}
          {httpMessages.find((code) => code.status.toString() === isError)?.message}
        </article>
      ) : isLoading ? (
        <article aria-busy="true" className="loading">
          Loading
        </article>
      ) : (
        <article className="card-detail">
          <img
            src={movie?.poster_path ? `${urlImage}/${poster_sizes[3]}/${movie?.poster_path}` : image}
            alt={movie?.poster_path ? `${movie?.title}` : `No image available for ${movie?.title}`}
          ></img>
          <div>
            <p>{movie?.title}</p>
            <span>{movie?.release_date && formatDate(movie?.release_date)}</span>
            <p>{movie?.overview}</p>
            <p>Rating: {movie?.vote_average}</p>
          </div>

          <button onClick={() => setId(null)}>Close</button>
        </article>
      )}
    </>
  );
}
