import { ReactNode } from 'react';

import Flyout from '@/components/flyout';
import Search from '@/components/search';

interface Props {
  children: ReactNode;
}

export default async function DetailsLayout({ children }: Props) {
  return (
    <>
      <h1>The Movie Database API</h1>
      <Search />
      {children}
      <Flyout />
    </>
  );
}
