import { Component } from 'react';
import { Search } from '../components/search';
import { CardsList } from '../components/cards-list';
import { getMovieList } from '../services/api';
import type { MoviesList } from '../types/interfaces';
import { queryStorage } from '../services/localstorage';

interface State {
  moviesList: MoviesList;
  loading: boolean;
}

type Props = object;

export class Main extends Component<Props, State> {
  state: State = {
    moviesList: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    loading: false,
  };

  async componentDidMount() {
    const query = queryStorage.get();
    if (!query) return;
    await this.getMoviesList(query);
  }

  getMoviesList = async (query: string) => {
    this.setState({ loading: true });
    const moviesList = await getMovieList(query);
    this.setState({ moviesList, loading: false });
  };

  render() {
    return (
      <main className="container main">
        <h1>The Movie Database API</h1>
        <Search handleQuery={this.getMoviesList} />
        {this.state.loading ? (
          <article aria-busy="true">Loading</article>
        ) : this.state.moviesList.results.length ? (
          <CardsList movieList={this.state.moviesList.results} />
        ) : (
          <span>Nothing to display. Type to search movie.</span>
        )}
      </main>
    );
  }
}
