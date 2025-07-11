import { useState } from 'react';

interface Props {
  handleQuery: (query: string) => void;
}

export function Search({ handleQuery }: Props) {
  const [searchValue, setSearchValue] = useState('');

  function submit(formData: FormData) {
    const query = formData.get('search') as string;
    if (!query) return;
    handleQuery(query);
  }

  return (
    <form role="search" className="search" action={submit}>
      <input
        name="search"
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
}
