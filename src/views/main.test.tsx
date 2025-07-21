import { render, screen, waitFor } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';

describe('Main Component', () => {
  it('makes initial API call on component mount with loading', async () => {
    render();

    expect(screen.getByText('The Movie Database API')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });
  });

  it('handles search query and updates movies list', async () => {
    const { router } = render({
      initialEntries: ['/?query=batman'],
    });

    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    const searchParams = new URLSearchParams(router.state.location.search);
    expect(searchParams.get('query')).toBe('batman');
  });

  it('displays error message when API fails', async () => {
    render({
      initialEntries: ['/?query=error'],
    });

    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });

  it('displays empty state message when no results', async () => {
    render({
      initialEntries: ['/?query=not batman'],
    });

    await waitFor(() => {
      expect(screen.getByText('Nothing to display. Type to search movie.')).toBeInTheDocument();
    });
  });

  it('handles pagination changes', async () => {
    const { user, router } = render({
      initialEntries: ['/?query=batman&page=1'],
    });

    await waitFor(() => {
      expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    const page2Button = screen.getByRole('button', { name: '2' });
    await user.click(page2Button);

    const searchParams = new URLSearchParams(router.state.location.search);
    expect(searchParams.get('page')).toBe('2');
    expect(searchParams.get('query')).toBe('batman');
  });
});
