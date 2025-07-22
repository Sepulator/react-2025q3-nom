import { render } from '@/__tests__/test-utils';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('NotFound', () => {
  it('should render 404 page for non-existing route', () => {
    render({ initialEntries: ['/non-existing-page'] });

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toHaveAttribute('href', '/');
  });
});
