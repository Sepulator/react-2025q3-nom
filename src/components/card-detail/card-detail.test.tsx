import { describe, it, expect } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { mockMovie } from '@/__tests__/handlers';

describe('CardDetail', () => {
  it('should show error state', async () => {
    render({ initialEntries: ['/?detail=000'] });

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('should display movie details correctly', async () => {
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
    render({ initialEntries: ['/?detail=123'] });

    await waitFor(() => {
      const image = screen.getByRole('img', { name: 'Movie poster' });
      expect(image).toHaveAttribute('alt', expect.stringContaining('No image available'));
    });
  });

  it('should close detail view when close button is clicked', async () => {
    const { user } = render({ initialEntries: ['/?detail=123'] });
    await waitFor(() => {
      const closeButton = screen.getByText('Close');
      user.click(closeButton);
    });

    expect(window.location.search).not.toContain('detail');
  });

  it('should close detail view when clicking outside', async () => {
    const { user } = render({ initialEntries: ['/?detail=123'] });

    await user.click(document.body);

    expect(window.location.search).not.toContain('detail');
  });
});
