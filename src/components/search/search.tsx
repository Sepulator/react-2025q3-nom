import { useEffect, useRef } from 'react';
import { useLocalStorage } from '@/services/localstorage';
import { QUERY } from '@/consts';

interface Props {
  handleQuery: (query: string) => void;
}
export function Search({ handleQuery }: Props) {
  const [storedValue, setStoredValue] = useLocalStorage<string>(QUERY, '');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = storedValue;
      ref.current.focus();
    }
  }, [storedValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')?.toString().trim();

    handleQuery(query || '');
    setStoredValue(query || '');
  };

  return (
    <form role="group" className="search" onSubmit={handleSubmit}>
      <input name="search" type="text" placeholder="Search movie" ref={ref} />
      <button type="submit">Search</button>
    </form>
  );
}
