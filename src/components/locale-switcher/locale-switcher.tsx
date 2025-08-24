'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Locale, useLocale, useTranslations } from 'next-intl';

import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <select defaultValue={locale} disabled={isPending} onChange={onSelectChange}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} title={t('locale', { locale: cur })}>
          {cur.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
