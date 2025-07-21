import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@/__tests__/test-utils';
import { Search } from './search';
import { QUERY } from '@/consts';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const searchRoute = {
    path: '/',
    element: <Search />,
  };

  it('renders search input and button', () => {
    render({ routes: [searchRoute] });

    expect(screen.getByPlaceholderText('Search movie')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('initializes with query from URL params', () => {
    render({
      routes: [searchRoute],
      initialEntries: ['/?query=test+movie'],
    });

    expect(screen.getByPlaceholderText('Search movie')).toHaveValue('test movie');
  });

  it('initializes with value from localStorage when no URL query', () => {
    localStorage.setItem(QUERY, JSON.stringify('stored movie'));

    render({
      routes: [searchRoute],
    });

    expect(screen.getByPlaceholderText('Search movie')).toHaveValue('stored movie');
  });

  it('handles empty search query', async () => {
    const { user, router } = render({
      routes: [searchRoute],
    });

    const submitButton = screen.getByRole('button', { name: 'Search' });
    await user.click(submitButton);

    expect(JSON.parse(localStorage.getItem(QUERY) || '')).toBe('');

    const searchParams = new URLSearchParams(router.state.location.search);
    expect(searchParams.get('query')).toBe('');
    expect(searchParams.get('page')).toBe('1');
  });
});
