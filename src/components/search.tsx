import { Component, type FormEvent } from 'react';

interface Props {
  handleQuery: (query: string) => void;
}

interface State {
  searchValue: string;
}

export class Search extends Component<Props, State> {
  state = {
    searchValue: '',
  };

  submit = (formData: FormData) => {
    const query = formData.get('search') as string;
    if (!query) return;
    this.props.handleQuery(query);
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    return (
      <form role="group" className="search" action={this.submit}>
        <input
          name="search"
          type="text"
          placeholder="Search"
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}
