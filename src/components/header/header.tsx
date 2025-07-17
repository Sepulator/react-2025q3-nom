import { useState } from 'react';

export function Header() {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  if (isError) throw new Error('Error Happen');

  return (
    <header>
      <div className="container">
        <a aria-label="The Movie Database API homepage" href="/">
          <img src="movie.svg" className="logo" alt="Movie logo" />
        </a>
        <nav>
          <ul>
            <li>
              <a href="https://www.themoviedb.org/" className="secondary">
                TMDB API
              </a>
            </li>
            <li>
              <button onClick={handleError}>throw error</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
