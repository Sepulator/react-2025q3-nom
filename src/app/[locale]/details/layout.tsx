import { ReactNode } from 'react';

import Flyout from '@/components/flyout';
import Search from '@/components/search';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: ReactNode;
}

export default async function DetailsLayout({ children }: Props) {
  const t = await getTranslations('AboutPage');

  return (
    <main className="container main">
      <h1>{t('title')}</h1>
      <Search />
      {children}
      <Flyout />
    </main>
  );
}
