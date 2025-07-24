import { screen, waitFor } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { mockBatmanMovie, mockMoviesList } from '@/__tests__/handlers';
import { formatDate } from '@/services/utils';

describe('Card Component', () => {
  it('renders movie information correctly', async () => {
    render();
    await waitFor(() => {
      expect(screen.getByText(mockMoviesList.results[0].title)).toBeInTheDocument();
      expect(screen.getByText(formatDate(mockMoviesList.results[0].release_date))).toBeInTheDocument();
    });
  });

  it('renders movie poster with correct src and alt text', async () => {
    render();
    await waitFor(() => {
      const poster = screen.getByRole('img', { name: mockMoviesList.results[0].title });
      expect(poster).toHaveAttribute('src', expect.stringContaining(mockMoviesList.results[0].poster_path || ''));
      expect(poster).toHaveAttribute('alt', mockMoviesList.results[0].title);
    });
  });

  it('renders fallback image when no poster_path is provided', async () => {
    render({ initialEntries: ['/?query=batman&page=2'] });
    await waitFor(() => {
      const fallbackImage = screen.getByRole('img', {
        name: `No image available for ${mockBatmanMovie.results[1].title}`,
      });
      expect(fallbackImage).toHaveAttribute('alt', `No image available for ${mockBatmanMovie.results[1].title}`);
    });
  });
});
