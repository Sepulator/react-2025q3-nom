import ErrorBoundary from '@/components/error-boundary';
import { render, screen, fireEvent } from '@testing-library/react';

import { Component } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

class BrokenComponent extends Component<{ isError?: boolean }> {
  render() {
    if (this.props.isError) {
      throw new Error('Test error');
    }
    return <div>Normal component</div>;
  }
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders error UI when child throws error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent isError={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('handles reload button click', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <BrokenComponent isError={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Window reload'));
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
