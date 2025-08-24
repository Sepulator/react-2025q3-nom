import { Link, NavLink } from 'react-router';
import logo from '@/assets/movie.svg';
import ThemeSwitch from '@/components/theme-switch';

export function Header() {
  return (
    <header>
      <div className="container">
        <Link to={'/'} aria-label="The Movie Database API homepage">
          <img src={logo} className="logo" alt="Movie logo" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/about" title="About" className={({ isActive }) => (isActive ? 'contrast' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <a href="https://www.omdbapi.com/" className="secondary" target="_blank" rel="noreferrer">
                OMDb API
              </a>
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
