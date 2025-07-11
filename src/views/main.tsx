import { Component } from 'react';
import { Search } from '../components/search';
import { CardList } from '../components/card-list';
import { getMovieList } from '../services/api';

export class Main extends Component {
  state = {
    query: '',
  };

  componentDidMount() {}

  handleQuery = async (query: string) => {
    const movieList = await getMovieList(query);
    console.log(movieList);
  };

  render() {
    return (
      <main className="container main">
        <h1>The Movie Database API</h1>
        <Search handleQuery={this.handleQuery} />
        <CardList movieList={this.state.query} />
      </main>
    );
  }
}
