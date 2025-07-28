import image from '@/assets/image.svg';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
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
      {status === 'error' ? (
        <ErrorInfo error={error} status_message={data?.status_message || ''} />
      ) : status === 'pending' ? (
        <div className="card-detail">
          <article aria-busy="true" className="loading " data-testid="card-detail-loading">
            Loading
          </article>
        </div>
      ) : (
        <article ref={ref} className="card-detail">
          <img
            aria-label="Movie poster"
            src={data?.poster_path ? `${urlImage}/${poster_sizes[3]}/${data?.poster_path}` : image}
            alt={data?.poster_path ? `${data?.title}` : `No image available for ${data?.title}`}
          ></img>
          <div>
            <p>{data?.title}</p>
            <span>{data?.release_date && formatDate(data?.release_date)}</span>
            <p>{data?.overview}</p>
            <p>Rating: {data?.vote_average.toFixed(2)}</p>
          </div>

          <Link to={createRootPath(['detail'])} role="button">
            Close
          </Link>
        </article>
      )}
    </>
  );
}
