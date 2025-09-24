'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { MAX_BUTTONS, MAX_PAGES } from '@/consts';

interface Props {
  totalResults: string;
}

export function Pagination({ totalResults }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const totalPages = Math.ceil(Number(totalResults) / MAX_PAGES);
  const page = Number(searchParams.get('page') ?? '1');

  const renderPageButton = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return (
      <li key={pageNumber}>
        <Link
          href={`${pathname}?${params.toString()}`}
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

    if (totalPages <= MAX_BUTTONS) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }

      return buttons;
    }

    buttons.push(renderPageButton(1));

    let startPage = Math.max(2, page - 2);
    let endPage = Math.min(totalPages - 1, page + 2);

    if (page <= 4) {
      startPage = 2;
      endPage = 5;
    }

    if (page >= totalPages - 3) {
      startPage = totalPages - 4;
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      buttons.push(<li key="start-ellipsis">...</li>);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(renderPageButton(i));
    }

    if (endPage < totalPages - 1) {
      buttons.push(<li key="end-ellipsis">...</li>);
    }

    buttons.push(renderPageButton(totalPages));

    return buttons;
  };

  return (
    <nav className="pagination">
      <ul className="pagination-list">{renderPageButtons()}</ul>
    </nav>
  );
}
