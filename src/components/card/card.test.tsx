import { mockBatmanMovie } from '@/__tests__/handlers';
import { screen } from '@/__tests__/test-utils';
import Card from '@/components/card';
import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('Card', () => {
  it('renders card element', () => {
    render(<Card movie={mockBatmanMovie.results[0]} />);

    expect(screen.getByText('Batman')).toBeInTheDocument();
  });

  it('render card with not image', () => {
    render(<Card movie={{ ...mockBatmanMovie.results[0], poster_path: null }} />);
    const imageElement = screen.getByRole('img');

    expect(imageElement).toHaveAttribute('alt', expect.stringContaining('No image available'));
  });
});
