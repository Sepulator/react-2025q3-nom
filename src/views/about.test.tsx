import { screen } from '@/__tests__/test-utils';
import { About } from '@/views/about';

import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

describe('About', () => {
  it('renders about element', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
