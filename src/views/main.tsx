import { Component } from 'react';
import { Search } from '../components/search';
import { CardsList } from '../components/cards-list';
import { getMovieList } from '../services/api';
import type { MovieList } from '../types/interfaces';

interface State {
  movieList: MovieList;
  loading: boolean;
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
    loading: false,
  };

  componentDidMount() {}

  handleQuery = async (query: string) => {
    this.setState({ loading: true });
    const movieList = await getMovieList(query);
    this.setState({ movieList, loading: false });
  };

  render() {
    return (
      <main className="container main">
        <h1>The Movie Database API</h1>
        <Search handleQuery={this.handleQuery} />
        {this.state.loading ? (
          <article aria-busy="true">Loading</article>
        ) : this.state.movieList.results.length ? (
          <CardsList movieList={this.state.movieList.results} />
        ) : (
          <span>Nothing to display. Type to search movie.</span>
        )}
      </main>
    );
  }
}
