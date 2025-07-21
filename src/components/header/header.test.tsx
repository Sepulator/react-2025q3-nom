import { render, screen } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('renders header with logo and navigation', () => {
    render();

    const header = screen.getByRole('banner');
    const logo = screen.getByRole('img', { name: /movie logo/i });

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
