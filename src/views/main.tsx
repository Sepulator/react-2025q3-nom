import { Component } from 'react';
import { Search } from '../components/search';
import { CardsList } from '../components/card-list';
import { getMovieList } from '../services/api';
import type { MovieList } from '../types/interfaces';

interface State {
  movieList: MovieList;
}

type Props = object;

export class Main extends Component<Props, State> {
  state = {
    movieList: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
  };

  componentDidMount() {}

  handleQuery = async (query: string) => {
    const movieList = await getMovieList(query);
    this.setState({ movieList });
  };

  render() {
    return (
      <main className="container main">
        <h1>The Movie Database API</h1>
        <Search handleQuery={this.handleQuery} />
        {this.state.movieList.results.length ? (
          <CardsList movieList={this.state.movieList.results} />
        ) : (
          <span>Nothing to display. Type to search movie.</span>
        )}
      </main>
    );
  }
}
