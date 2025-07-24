import { mockBatmanMovie } from '@/__tests__/handlers';
import { render, screen, waitFor } from '@/__tests__/test-utils';
import { useMoviesStore } from '@/store';
import { describe, expect, it, vi } from 'vitest';

describe('Flyout', () => {
  const mockAdd = vi.fn();

  vi.spyOn(useMoviesStore, 'getState').mockImplementation(() => ({
    addMovie: mockAdd,
    movies: [],
    reset: vi.fn(),
    removeMovie: vi.fn(),
  }));

  it('should not render when no movies are selected', () => {
    expect(screen.queryByLabelText('flyout')).not.toBeInTheDocument();
  });

  it('should render correct text for single movie', async () => {
    const { user } = render();

    waitFor(async () => {
      const favorite = await screen.findByRole('checkbox', {
        name: 'favorite-123',
      });

      await user.click(favorite);
      expect(favorite).toBeChecked();
      expect(screen.getByText('1 item is selected')).toBeInTheDocument();
    });
  });

  it('should render correct text for multiple movies', () => {
    const { user } = render({ initialEntries: ['/?query=batman&page=1'] });

    waitFor(async () => {
      const favorite1 = await screen.findByRole('checkbox', {
        name: 'favorite-1',
      });
      const favorite2 = await screen.findByRole('checkbox', {
        name: 'favorite-2',
      });

      await user.click(favorite1);
      await user.click(favorite2);
      expect(favorite1).toBeChecked();
      expect(favorite2).toBeChecked();
      expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    });
  });

  it('should call reset checkboxes when unselect button is clicked', async () => {
    useMoviesStore.getState().movies = mockBatmanMovie.results;
    const { user } = render({ initialEntries: ['/?query=batman&page=1'] });

    waitFor(async () => {
      expect(screen.getByText('2 items are selected')).toBeInTheDocument();
      await user.click(screen.getByText('Unselect all'));
      expect(screen.getByText('2 items are selected')).not.toBeInTheDocument();
    });
  });

  it('should render download link with correct attributes', () => {
    useMoviesStore.getState().movies = mockBatmanMovie.results;
    render({ initialEntries: ['/?query=batman&page=1'] });

    waitFor(async () => {
      const downloadLink = screen.getByLabelText('flyout-download');

      expect(downloadLink).toHaveAttribute('download', '2_movies.csv');
      expect(downloadLink).toHaveAttribute('href', expect.any(String));
    });
  });
});
