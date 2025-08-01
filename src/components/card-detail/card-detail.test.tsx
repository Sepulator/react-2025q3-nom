import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { mockMovie } from '@/__tests__/handlers';

describe('CardDetail', () => {
  beforeAll((global.window.URL.createObjectURL = vi.fn()));

  it('should show error state', async () => {
    render({ initialEntries: ['/details/000?s=&page=1'] });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('should display movie details correctly', async () => {
    render({ initialEntries: ['/details/123?s=&page=1'] });
    await waitFor(() => {
      expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.Plot)).toBeInTheDocument();
      const image = screen.getByRole('img', { name: 'Movie poster' });
      expect(image).toHaveAttribute('src', expect.stringContaining(mockMovie.Poster));
      expect(image).toHaveAttribute('alt', mockMovie.Title);
    });
  });

  it('should close detail view when clicking outside', async () => {
    const { user, router } = render({ initialEntries: ['/details/123?s=&page=1'] });
    waitFor(async () => {
      const heading = screen.getByRole('heading', { name: 'The Movie Database API' });
      await user.click(heading);
      expect(router.state.location.pathname).not.toContain('/details/123');
    });
  });
});
