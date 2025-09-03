import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '@/__tests__/test-utils';
import { mockMoviesList } from '@/__tests__/handlers';

describe('Card Component', () => {
  it('renders movie information correctly', async () => {
    render();
    await waitFor(() => {
      expect(screen.getByText(mockMoviesList.search[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockMoviesList.search[0].year)).toBeInTheDocument();
    });
  });

  it('renders movie poster with correct src and alt text', async () => {
    render();
    await waitFor(() => {
      const poster = screen.getByRole('img', { name: mockMoviesList.search[0].title });
      expect(poster).toHaveAttribute('src', expect.stringContaining(mockMoviesList.search[0].poster));
      expect(poster).toHaveAttribute('alt', mockMoviesList.search[0].title);
    });
  });
});
