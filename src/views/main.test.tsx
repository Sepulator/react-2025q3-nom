import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { act, render, screen, waitFor } from '@/__tests__/test-utils';
import MainView from './main';
import { mockFormValue1, mockFormValue2, mockStore } from '@/__tests__/form-mock';

vi.mock('@/components/dialog', () => ({
  default: ({ children, title, isOpen }: { children: ReactNode; title: string; isOpen: boolean }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-dialog" data-title={title}>
        {children}
      </div>
    );
  },
}));

vi.mock('@/store', () => ({
  useFormStore: () => mockStore,
}));

describe('MainView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.isDialogOpen = false;
    mockStore.formValues = [];
  });

  it('renders correctly', () => {
    render(<MainView />);

    act(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('does not show dialog', () => {
    render(<MainView />);

    act(() => {
      expect(screen.queryByTestId('mock-dialog')).not.toBeInTheDocument();
    });
  });

  it('shows hook form', async () => {
    mockStore.isDialogOpen = true;

    render(<MainView />);
    const dialog = screen.getByTestId('mock-dialog');

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('data-title', 'React Hook Form');
    });
  });

  it('shows uncontrolled', async () => {
    mockStore.isDialogOpen = true;
    mockStore.isHookForm = false;

    render(<MainView />);

    const dialog = screen.getByTestId('mock-dialog');

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('data-title', 'Uncontrolled Form');
    });
  });

  it('renders form cards with hook form', () => {
    mockStore.formValues = [mockFormValue1, mockFormValue2];

    render(<MainView />);

    expect(screen.getByRole('region')).toHaveClass('cards-list');
  });

  it('renders form cards with uncontrolled form', () => {
    mockStore.isHookForm = false;
    mockStore.formValues = [mockFormValue1, mockFormValue2];

    render(<MainView />);

    expect(screen.getByRole('region')).toHaveClass('cards-list');
  });

  it('applies animation to last added form values', async () => {
    mockStore.formValues = [mockFormValue1];

    render(<MainView />);

    const cardsSection = screen.getByRole('region');
    expect(cardsSection.firstChild).toHaveClass('new-card');

    await waitFor(
      () => {
        expect(cardsSection.firstChild).not.toHaveClass('new-card');
      },
      { timeout: 4500 }
    );
  });
});
