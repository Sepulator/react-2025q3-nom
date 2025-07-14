import { Component } from 'react';

interface State {
  isError: boolean;
}

type Props = object;

export class Header extends Component<Props, State> {
  state: State = { isError: false };

  handleError = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) throw new Error('Error Happen');
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
                <button onClick={this.handleError}>throw error</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
