import { render, screen } from '@/__tests__/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Dialog from '@/components/dialog';
import '@testing-library/jest-dom/vitest';

describe('Dialog Component', () => {
  const mockHandleClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    handleClose: mockHandleClose,
    title: 'Test Dialog',
    children: <h1>Dialog Content</h1>,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    document.body.innerHTML = '';

    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('renders in portal and displays content when open', () => {
    render(<Dialog {...defaultProps} />);

    expect(document.body.querySelector('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('calls handleClose when clicking outside the dialog', async () => {
    const { user } = render(<Dialog {...defaultProps} />);

    await user.click(document.querySelector('dialog') as HTMLElement);

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('calls handleClose when clicking close button', async () => {
    const { user } = render(<Dialog {...defaultProps} />);

    await user.click(screen.getByLabelText(/close/i));

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('calls handleClose when pressing Escape key', async () => {
    render(<Dialog {...defaultProps} />);

    const dialogElement = document.querySelector('dialog');
    dialogElement?.dispatchEvent(new Event('close'));

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('handles dialog cleanup on unmount', async () => {
    const { unmount } = render(<Dialog {...defaultProps} />);

    unmount();

    expect(document.querySelector('dialog')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Dialog {...defaultProps} />);

    expect(document.querySelector('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/close/i)).toHaveAttribute('aria-label', 'Close');
  });

  it('does not close when clicking inside dialog content', async () => {
    const { user } = render(<Dialog {...defaultProps} />);

    await user.click(screen.getByText('Dialog Content'));

    expect(mockHandleClose).not.toHaveBeenCalled();
  });
});
