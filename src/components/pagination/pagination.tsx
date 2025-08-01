import { MAX_BUTTONS, MAX_PAGES } from '@/consts';
import type { MoviesList } from '@/types/interfaces';
import { Link, useSearchParams } from 'react-router';

interface Props {
  moviesList: MoviesList;
}

export function Pagination({ moviesList }: Props) {
  const [searchParams] = useSearchParams();
  const { totalResults } = moviesList;
  const total_pages = Math.ceil(Number(totalResults) / MAX_PAGES);
  const page = Number(searchParams.get('page') ?? '1');

  const renderPageButton = (pageNumber: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', pageNumber.toString());

    return (
      <li key={pageNumber}>
        <Link
          to={`?${updatedSearchParams.toString()}`}
          className={pageNumber === page ? 'contrast' : ''}
          role="button"
          aria-current={pageNumber === page ? 'page' : undefined}
        >
          {pageNumber}
        </Link>
      </li>
    );
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (total_pages <= MAX_BUTTONS) {
      for (let i = 1; i <= total_pages; i++) {
        buttons.push(renderPageButton(i));
      }

      return buttons;
    }

    buttons.push(renderPageButton(1));

    let startPage = Math.max(2, page - 2);
    let endPage = Math.min(total_pages - 1, page + 2);

    if (page <= 4) {
      startPage = 2;
      endPage = 5;
    }

    if (page >= total_pages - 3) {
      startPage = total_pages - 4;
      endPage = total_pages - 1;
    }

    if (startPage > 2) {
      buttons.push(<li key="start-ellipsis">...</li>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(renderPageButton(i));
    }

    if (endPage < total_pages - 1) {
      buttons.push(<li key="end-ellipsis">...</li>);
    }

    buttons.push(renderPageButton(total_pages));

    return buttons;
  };

  return (
    <nav className="pagination">
      <ul className="pagination-list">{renderPageButtons()}</ul>
    </nav>
  );
}
