export function Header() {
  return (
    <header>
      <div className="container">
        <a aria-label="The Movie Database API homepage" href="/">
          <img src="movie.svg" className="logo" alt="Movie logo" />
        </a>
        <a href="https://www.themoviedb.org/" className="secondary">
          TMDB API
        </a>
      </div>
    </header>
  );
}
