import { render, screen } from '@/__tests__/test-utils';
import Header from '@/components/header';

import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('renders header with logo and navigation', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const logo = screen.getByRole('img', { name: /movie logo/i });
    const nav = screen.getByRole('navigation');

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
});
