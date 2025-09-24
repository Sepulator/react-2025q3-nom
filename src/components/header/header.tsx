import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

import ThemeSwitch from '@/components/theme-switch';
import LocaleSwitcher from '@/components/locale-switcher';

export async function Header() {
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
            <li>
              <LocaleSwitcher />
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
