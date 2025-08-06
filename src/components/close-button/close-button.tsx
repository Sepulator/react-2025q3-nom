'use client';

import { Link } from '@/i18n/navigation';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function CloseButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Close');

  useClickOutside(() => router.push(`/?${searchParams.toString()}`));

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || 1;

  return (
    <Link href={{ pathname: '/', query: { query, page } }} role="button">
      {t('title')}
    </Link>
  );
}
