import { MAX_BUTTONS } from '@/consts';
import type { MoviesList } from '@/types/interfaces';
import { Link, useSearchParams } from 'react-router';

interface Props {
  moviesList: MoviesList;
}

const FIRST_PAGE = 1;
const SECOND_PAGE = 2;
const PAGES_AROUND_CURRENT = 2;
const NEAR_START_OFFSET = 4;
const NEAR_END_OFFSET = 3;
const MIDDLE_RANGE_SIZE = 4;

export function Pagination({ moviesList }: Props) {
  const { page, total_pages } = moviesList;
  const [searchParams] = useSearchParams();

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
      for (let i = FIRST_PAGE; i <= total_pages; i++) {
        buttons.push(renderPageButton(i));
      }

      return buttons;
    }

    buttons.push(renderPageButton(FIRST_PAGE));

    let startPage = Math.max(SECOND_PAGE, page - PAGES_AROUND_CURRENT);
    let endPage = Math.min(total_pages - 1, page + PAGES_AROUND_CURRENT);

    if (page <= NEAR_START_OFFSET) {
      startPage = SECOND_PAGE;
      endPage = NEAR_START_OFFSET + 1;
    }

    if (page >= total_pages - NEAR_END_OFFSET) {
      startPage = total_pages - MIDDLE_RANGE_SIZE;
      endPage = total_pages - 1;
    }

    if (startPage > SECOND_PAGE) {
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
