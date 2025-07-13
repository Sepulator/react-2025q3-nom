import { Component, type FormEvent } from 'react';
import { queryStorage } from '../services/localstorage';

interface Props {
  handleQuery: (query: string) => void;
}

interface State {
  searchValue: string;
}

export class Search extends Component<Props, State> {
  state: State = {
    searchValue: '',
  };

  componentDidMount(): void {
    const query = queryStorage.get() || '';
    this.setState({ searchValue: query });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')!.toString().trim();
    this.props.handleQuery(query);
    queryStorage.save(query);
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    return (
      <form role="group" className="search" onSubmit={this.handleSubmit}>
        <input
          name="search"
          type="text"
          placeholder="Search movie"
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
