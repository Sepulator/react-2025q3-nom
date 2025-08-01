import { useDetail } from '@/hooks/useDetail';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Link, useNavigate } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import ErrorInfo from '@/components/error-info';

export function CardDetail() {
  const navigate = useNavigate();
  const { status, data, error } = useDetail();
  const { createRootPath } = useQueryParams();

  const handleClose = () => {
    const rootPath = createRootPath(['detail']);
    navigate(rootPath);
  };

  const ref = useClickOutside(handleClose);

  return (
    <>
      {status === 'error' || data?.Error ? (
        <ErrorInfo error={error} status_message={data?.Error || ''} />
      ) : status === 'pending' ? (
        <div className="card-detail">
          <article aria-busy="true" className="loading " data-testid="card-detail-loading">
            Loading
          </article>
        </div>
      ) : (
        <article ref={ref} className="card-detail">
          <img aria-label="Movie poster" src={data?.Poster} alt={data?.Title}></img>
          <div>
            <p>{data?.Title}</p>
            <span>{data?.Released}</span>
            <p>{data?.Plot}</p>
            <p>Rating: {data?.imdbRating}</p>
          </div>

          <Link to={createRootPath(['detail'])} role="button">
            Close
          </Link>
        </article>
      )}
    </>
  );
}
