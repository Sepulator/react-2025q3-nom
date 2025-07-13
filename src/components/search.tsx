import { Component, createRef } from 'react';
import { queryStorage } from '../services/localstorage';

interface Props {
  handleQuery: (query: string) => void;
}

interface State {
  searchValue: string;
}

export class Search extends Component<Props, State> {
  ref = createRef<HTMLInputElement>();

  componentDidMount(): void {
    this.ref.current!.value = queryStorage.get() || '';
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')!.toString().trim();
    this.props.handleQuery(query);
    queryStorage.save(query);
  };

  render() {
    return (
      <form role="group" className="search" onSubmit={this.handleSubmit}>
        <input name="search" type="text" placeholder="Search movie" ref={this.ref} />
        <button type="submit">Search</button>
      </form>
    );
  }
}
