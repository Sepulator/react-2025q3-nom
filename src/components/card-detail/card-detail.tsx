import image from '@/assets/image.svg';
import { formatDate } from '@/services/utils';
import { poster_sizes, urlImage } from '@/consts';
import { useDetail } from '@/hooks/useDetail';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Link, useNavigate } from 'react-router';
import { useQueryParams } from '@/hooks/useQueryParams';
import { CardError } from '@/components/card-error/card-error';
import { Loading } from '@/components/loading/loading';

export function CardDetail() {
  const navigate = useNavigate();
  const { movie, isLoading, isError } = useDetail();
  const { createRootPath } = useQueryParams();

  const handleClose = () => {
    const rootPath = createRootPath(['detail']);
    navigate(rootPath);
  };

  const ref = useClickOutside(handleClose);

  if (isError) {
    return <CardError isError={isError} />;
  }

  return (
    <>
      {isError && <CardError isError={isError} />}
      {isLoading && <Loading />}

      <article ref={ref} className="card-detail">
        <img
          aria-label="Movie poster"
          src={movie?.poster_path ? `${urlImage}/${poster_sizes[3]}/${movie?.poster_path}` : image}
          alt={movie?.poster_path ? `${movie?.title}` : `No image available for ${movie?.title}`}
        ></img>
        <div>
          <p>{movie?.title}</p>
          <span>{movie?.release_date && formatDate(movie?.release_date)}</span>
          <p>{movie?.overview}</p>
          <p>Rating: {movie?.vote_average.toFixed(2)}</p>
        </div>

        <Link to={createRootPath(['detail'])} role="button">
          Close
        </Link>
      </article>
    </>
  );
}
