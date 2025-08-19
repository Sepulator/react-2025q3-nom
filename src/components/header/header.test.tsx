import { render, screen } from '@/__tests__/test-utils';
import Header from '@/components/header';
import { describe, expect, it } from 'vitest';

describe('Header', () => {
  it('renders header with logo and navigation', () => {
    render(<Header />);

    const hook = screen.getByRole('button', { name: 'React Hook Form' });
    const uncontrolled = screen.getByRole('button', { name: 'Uncontrolled Form' });

    expect(hook).toBeInTheDocument();
    expect(uncontrolled).toBeInTheDocument();
  });
});
