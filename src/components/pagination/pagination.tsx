import { MAX_BUTTONS } from '@/consts';
import type { MoviesList } from '@/types/interfaces';
import { useSearchParams } from 'react-router';

interface Props {
  moviesList: MoviesList;
}

export function Pagination({ moviesList }: Props) {
  const { page, total_pages } = moviesList;
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('page', newPage.toString());
      return updatedSearchParams;
    });
  };

  const renderPageButton = (pageNumber: number) => (
    <li key={pageNumber}>
      <button onClick={() => handlePageChange(pageNumber)} disabled={pageNumber === page}>
        {pageNumber}
      </button>
    </li>
  );

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
