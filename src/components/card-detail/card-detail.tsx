import { httpMessages } from '@/consts';
import { useDetail } from '@/hooks/useDetail';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Link, useNavigate } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';

export function CardDetail() {
  const navigate = useNavigate();
  const { movie, isLoading, isError } = useDetail();
  const { createRootPath } = useQueryParams();

  const handleClose = () => {
    const rootPath = createRootPath(['detail']);
    navigate(rootPath);
  };

  const ref = useClickOutside(handleClose);

  return (
    <>
      {isError ? (
        <article style={{ color: 'var(--pico-del-color)' }}>
          Error: {isError + ' '}
          {httpMessages.find((code) => code.status.toString() === isError)?.message}
        </article>
      ) : isLoading ? (
        <div className="card-detail">
          <article aria-busy="true" className="loading " data-testid="card-detail-loading">
            Loading
          </article>
        </div>
      ) : (
        <article ref={ref} className="card-detail">
          <img aria-label="Movie poster" src={movie?.Poster} alt={movie?.Title}></img>
          <div>
            <p>{movie?.Title}</p>
            <span>{movie?.Released}</span>
            <p>{movie?.Plot}</p>
            <p>Rating: {movie?.imdbRating}</p>
          </div>

          <Link to={createRootPath(['detail'])} role="button">
            Close
          </Link>
        </article>
      )}
    </>
  );
}
