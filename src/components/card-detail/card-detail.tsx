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

  if (error || movie?.error) {
    return <ErrorInfo error={error} status_message={movie?.error} />;
  }

  if (isLoading) {
    return (
      <div className="card-detail">
        <article aria-busy="true" className="loading " data-testid="card-detail-loading">
          Loading
        </article>
      </div>
    );
  }

  return (
    <>
      <article ref={ref} className="card-detail">
        <img aria-label="Movie poster" src={movie?.poster} alt={movie?.title}></img>
        <div>
          <p>{movie?.title}</p>
          <span>{movie?.released}</span>
          <p>{movie?.plot}</p>
          <p>Rating: {movie?.imdbRating}</p>
        </div>

        <Link to={createRootPath(['detail'])} role="button">
          Close
        </Link>
      </article>
    </>
  );
}
