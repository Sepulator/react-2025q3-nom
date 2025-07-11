import { Component } from 'react';
import { Search } from '../components/search';
import { CardList } from '../components/card-list';

export class Main extends Component {
  state = {
    query: '',
  };

  handleQuery = (newQuery: string) => {
    this.setState({
      query: newQuery,
    });
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
