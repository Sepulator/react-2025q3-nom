import { render, screen } from '@/__tests__/test-utils';
import Footer from '@/components/footer';

import { describe, expect, it } from 'vitest';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders current year in copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(`${currentYear}©️`);
    expect(copyright).toBeInTheDocument();
  });
});
