import { describe, it, expect, vi } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { useDetail } from '@/hooks/useDetail';
import { mockMovie } from '@/__tests__/handlers';

vi.mock('@/hooks/useDetail');

describe('CardDetail', () => {
  it('should show loading state', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: mockMovie,
      isLoading: true,
      isError: null,
    });
    render({ initialEntries: ['/?detail=123'] });

    await waitFor(() => {
      expect(screen.getByTestId('card-detail-loading')).toBeInTheDocument();
    });
  });

  it('should show error state', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: null,
      isLoading: false,
      isError: '404',
    });
    render({ initialEntries: ['/?detail=123'] });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('should display movie details correctly', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: mockMovie,
      isLoading: false,
      isError: null,
    });

    render({ initialEntries: ['/?detail=123'] });
    await waitFor(() => {
      expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
      expect(screen.getByText(/Rating: 8.50/)).toBeInTheDocument();
      const image = screen.getByRole('img', { name: 'Movie poster' });
      expect(image).toHaveAttribute('src', expect.stringContaining(mockMovie.poster_path));
      expect(image).toHaveAttribute('alt', mockMovie.title);
    });
  });

  it('should display fallback image when poster_path is empty', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: { ...mockMovie, poster_path: '' },
      isLoading: false,
      isError: null,
    });

    render({ initialEntries: ['/?detail=123'] });

    await waitFor(() => {
      const image = screen.getByRole('img', { name: 'Movie poster' });
      expect(image).toHaveAttribute('alt', expect.stringContaining('No image available'));
    });
  });

  it('should close detail view when close button is clicked', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: mockMovie,
      isLoading: false,
      isError: null,
    });

    const { user } = render({ initialEntries: ['/?detail=123'] });
    await waitFor(() => {
      const closeButton = screen.getByText('Close');
      user.click(closeButton);
    });

    expect(window.location.search).not.toContain('detail');
  });

  it('should close detail view when clicking outside', async () => {
    vi.mocked(useDetail).mockReturnValue({
      movie: mockMovie,
      isLoading: false,
      isError: null,
    });

    const { user } = render({ initialEntries: ['/?detail=123'] });

    await user.click(document.body);

    expect(window.location.search).not.toContain('detail');
  });
});
