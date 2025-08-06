'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { QUERY } from '@/consts';
import { useTranslations } from 'next-intl';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [, setStoredValue] = useLocalStorage<string>(QUERY, '');
  const t = useTranslations('Search');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')?.toString().trim();

    const params = new URLSearchParams(searchParams);
    params.set('query', query || '');
    params.set('page', '1');
    setStoredValue(query || '');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form role="group" className="search" onSubmit={handleSubmit}>
      <input
        name="search"
        type="text"
        placeholder={t('placeholder')}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button type="submit">{t('title')}</button>
    </form>
  );
}
