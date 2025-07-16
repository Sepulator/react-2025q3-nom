import { render, screen, waitFor, fireEvent } from '@/__tests__/test-utils';
import { queryStorage } from '@/services/localstorage';
import { Main } from '@/views/main';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/services/localstorage', () => ({
  queryStorage: {
    get: vi.fn(),
    save: vi.fn(),
  },
}));

describe('Main Component', () => {
  it('makes initial API call on component mount with loading', async () => {
    render(<Main />);
    expect(screen.getByText('The Movie Database API')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });
  });

  it('handles search query and updates movies list', async () => {
    vi.mocked(queryStorage.get).mockReturnValue('batman');
    render(<Main />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });
  });

  it('displays error message when API fails', async () => {
    vi.mocked(queryStorage.get).mockReturnValue('error');
    render(<Main />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('displays empty state message when no results', async () => {
    vi.mocked(queryStorage.get).mockReturnValue('not batman');
    render(<Main />);

    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Nothing to display. Type to search movie.')).toBeInTheDocument();
    });
  });
});
