import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { mockMoviesList } from '@/__tests__/handlers';

describe('Card Component', () => {
  it('renders movie information correctly', async () => {
    render();
    await waitFor(() => {
      expect(screen.getByText(mockMoviesList.Search[0].Title)).toBeInTheDocument();
      expect(screen.getByText(mockMoviesList.Search[0].Year)).toBeInTheDocument();
    });
  });

  it('renders movie poster with correct src and alt text', async () => {
    render();
    await waitFor(() => {
      const poster = screen.getByRole('img', { name: mockMoviesList.Search[0].Title });
      expect(poster).toHaveAttribute('src', expect.stringContaining(mockMoviesList.Search[0].Poster));
      expect(poster).toHaveAttribute('alt', mockMoviesList.Search[0].Title);
    });
  });
});
