import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { mockMovie } from '@/__tests__/handlers';

describe('CardDetail', () => {
  beforeAll((global.window.URL.createObjectURL = vi.fn()));

  it('should show error state', async () => {
    render({ initialEntries: ['/details/000?query=&page=1'] });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('should display movie details correctly', async () => {
    render({ initialEntries: ['/details/123?query=&page=1'] });
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
    render({ initialEntries: ['/details/123?query=&page=1'] });

    await waitFor(() => {
      const image = screen.getByRole('img', { name: 'Movie poster' });
      expect(image).toHaveAttribute('alt', expect.stringContaining('No image available'));
    });
  });

  it('should close detail view when clicking outside', async () => {
    const { user, router } = render({ initialEntries: ['/details/123?query=&page=1'] });

    await user.click(document.body);

    expect(router.state.location.pathname).not.toContain('/details/123');
  });
});
