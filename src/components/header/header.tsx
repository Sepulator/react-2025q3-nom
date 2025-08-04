import Link from 'next/link';
import Image from 'next/image';

import ThemeSwitch from '@/components/theme-switch';

export function Header() {
  return (
    <header>
      <div className="container">
        <Link href={'/'} aria-label="The Movie Database API homepage">
          <Image src="/movie.svg" className="logo" alt="Movie logo" width={40} height={40} />
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/about" title="About">
                About
              </Link>
            </li>
            <li>
              <Link href="https://www.omdbapi.com/" className="secondary" target="_blank" rel="noreferrer">
                OMDb API
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
