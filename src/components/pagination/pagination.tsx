import type { MoviesList } from '@/types/interfaces';
import { useSearchParams } from 'react-router';

interface Props {
  moviesList: MoviesList;
}

export function Pagination({ moviesList }: Props) {
  const { page, total_pages, total_results } = moviesList;
  const [, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('page', newPage.toString());
      return updatedSearchParams;
    });
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= total_pages; i++) {
      buttons.push(
        <li key={i}>
          <button
            className={`pagination-button ${i === page ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
            disabled={i === page}
          >
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  if (total_results === 0) return null;

  return (
    <nav className="pagination">
      <ul className="pagination-list">{renderPageButtons()}</ul>
    </nav>
  );
}
