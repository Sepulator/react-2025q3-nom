import image from '@/assets/image.svg';
import { formatDate } from '@/services/utils';
import { httpMessages, poster_sizes, urlImage } from '@/consts';
import { useDetail } from '@/hooks/useDetail';
import { useSearchParams } from 'react-router';

export function CardDetail() {
  const { movie, isLoading, isError } = useDetail();
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.delete('detail');
      return updatedSearchParams;
    });
  };

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
            <p>Rating: {movie?.vote_average.toFixed(2)}</p>
          </div>

          <button onClick={handleClick}>Close</button>
        </article>
      )}
    </>
  );
}
