import { Component } from 'react';

import CardsList from '@/components/card-list';
import { getMovieList, getNowPLaying } from '@/services/api';
import { queryStorage } from '@/services/localstorage';
import type { MoviesList } from '@/types/interfaces';
import Search from '@/components/search';
import { httpMessages } from '@/consts';

interface State {
  moviesList: MoviesList;
  loading: boolean;
  error: string | null;
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
    error: null,
  };

  async componentDidMount() {
    const query = queryStorage.get();
    if (query === null) {
      await this.getMoviesList('');
    } else {
      await this.getMoviesList(query);
    }
  }

  getMoviesList = async (query: string) => {
    this.setState({ loading: true });
    try {
      const moviesList = query ? await getMovieList(query) : await getNowPLaying();
      this.setState({ moviesList, loading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Failed to fetch movies',
        loading: false,
      });
    }
  };

  render() {
    return (
      <main className="container main">
        <h1>The Movie Database API</h1>
        <Search handleQuery={this.getMoviesList} />
        {this.state.error ? (
          <article style={{ color: 'var(--pico-del-color)' }}>
            Error: {this.state.error + ' '}
            {httpMessages.find((code) => code.status.toString() === this.state.error)?.message}
          </article>
        ) : this.state.loading ? (
          <article aria-busy="true">Loading</article>
        ) : this.state.moviesList.results?.length ? (
          <CardsList movieList={this.state.moviesList.results} />
        ) : (
          <span>Nothing to display. Type to search movie.</span>
        )}
      </main>
    );
  }
}
