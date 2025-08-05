'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export function CloseButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useClickOutside(() => router.push(`/?${searchParams.toString()}`));

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || 1;

  return (
    <Link href={{ pathname: '/', query: { query, page } }} role="button">
      Close
    </Link>
  );
}
