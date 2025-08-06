import Image from 'next/image';

import ThemeSwitch from '@/components/theme-switch';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface Props {
  locale: string;
}

export async function Header({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('Header');

  return (
    <header>
      <div className="container">
        <Link href={'/'} aria-label="The Movie Database API homepage" title={t('home')}>
          <Image src="/movie.svg" className="logo" alt="Movie logo" width={40} height={40} />
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/about" title={t('about')}>
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="https://www.omdbapi.com/" className="secondary" target="_blank" rel="noreferrer">
                {t('api')}
              </Link>
            </li>

            <li className="theme-toggle-wrapper">
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
