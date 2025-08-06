import { ReactNode } from 'react';

import Flyout from '@/components/flyout';
import Search from '@/components/search';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DetailsLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return (
    <>
      <h1>{t('title')}</h1>
      <Search />
      {children}
      <Flyout />
    </>
  );
}
