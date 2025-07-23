import { Link, NavLink } from 'react-router';
import logo from '@/assets/movie.svg';

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
              <a href="https://www.themoviedb.org/" className="secondary" target="_blank" rel="noreferrer">
                TMDB API
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
