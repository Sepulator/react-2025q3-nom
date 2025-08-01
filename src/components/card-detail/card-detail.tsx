import { useDetail } from '@/hooks/useDetail';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Link, useNavigate } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import ErrorInfo from '@/components/error-info';

export function CardDetail() {
  const navigate = useNavigate();
  const { movie, isLoading, error } = useDetail();
  const { createRootPath } = useQueryParams();

  const handleClose = () => {
    const rootPath = createRootPath(['detail']);
    navigate(rootPath);
  };

  const ref = useClickOutside(handleClose);

  return (
    <>
      {error || movie?.Error ? (
        <ErrorInfo error={error} status_message={movie?.Error} />
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
