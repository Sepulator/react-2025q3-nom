import { useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { QUERY } from '@/consts';
import { useSearchParams } from 'react-router';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedValue, setStoredValue] = useLocalStorage<string>(QUERY, '');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = searchParams.get('query') || storedValue;
      ref.current.focus();
    }
  }, [searchParams, storedValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search')?.toString().trim();

    setSearchParams((searchParams) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('query', query || '');
      updatedSearchParams.set('page', '1');
      return updatedSearchParams;
    });
    setStoredValue(query || '');
  };

  return (
    <form role="group" className="search" onSubmit={handleSubmit}>
      <input name="search" type="text" placeholder="Search movie" ref={ref} />
      <button type="submit">Search</button>
    </form>
  );
}
