import { render, screen, waitFor, fireEvent } from '@/__tests__/test-utils';
import { Main } from '@/views/main';
import { afterEach, describe, expect, it } from 'vitest';

describe('Main Component', () => {
  afterEach(() => {
    localStorage.clear();
  });

  // it('makes initial API call on component mount with loading', async () => {
  //   render(<Main />);
  //   expect(screen.getByText('The Movie Database API')).toBeInTheDocument();
  //   expect(screen.getByRole('group')).toBeInTheDocument();
  //   expect(screen.getByText('Loading')).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByText('Test Movie')).toBeInTheDocument();
  //   });
  // });

  it('handles search query and updates movies list', async () => {
    render(<Main />);

    const searchInput = screen.getByPlaceholderText('Search movie');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'Batman' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });
  });

  // it('displays error message when API fails', async () => {
  //   render(<Main />);

  //   await waitFor(() => {
  //     expect(screen.getByText(/error/i)).toBeInTheDocument();
  //   });
  // });

  // it('displays empty state message when no results', async () => {
  //   render(<Main />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Nothing to display. Type to search movie.')).toBeInTheDocument();
  //   });
  // });

  // it('loads movies from localStorage query on mount if available', async () => {
  //   localStorage.setItem('query', 'saved search');
  //   render(<Main />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Test Movie')).toBeInTheDocument();
  //   });
  // });
});
