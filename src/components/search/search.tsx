import { useEffect, useRef } from 'react';
import { queryStorage } from '@/services/localstorage';

interface Props {
  handleQuery: (query: string) => void;
}
export function Search({ handleQuery }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = queryStorage.get() || '';
      ref.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')?.toString().trim();

    handleQuery(query || '');
    queryStorage.save(query || '');
  };

  return (
    <form role="group" className="search" onSubmit={handleSubmit}>
      <input name="search" type="text" placeholder="Search movie" ref={ref} />
      <button type="submit">Search</button>
    </form>
  );
}
