import { MAX_BUTTONS } from '@/consts';
import type { MoviesList } from '@/types/interfaces';
import { Link, useSearchParams } from 'react-router';

interface Props {
  moviesList: MoviesList;
}

const firstPage = 1;
const secondPage = 2;
const pagesAroundCurrent = 2;
const nearStartThreshold = 4;
const nearEndOffset = 3;
const middleRangeSize = 4;

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
      for (let i = firstPage; i <= total_pages; i++) {
        buttons.push(renderPageButton(i));
      }

      return buttons;
    }

    buttons.push(renderPageButton(firstPage));

    let startPage = Math.max(secondPage, page - pagesAroundCurrent);
    let endPage = Math.min(total_pages - 1, page + pagesAroundCurrent);

    if (page <= nearStartThreshold) {
      startPage = secondPage;
      endPage = nearStartThreshold + 1;
    }

    if (page >= total_pages - nearEndOffset) {
      startPage = total_pages - middleRangeSize;
      endPage = total_pages - 1;
    }

    if (startPage > secondPage) {
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
