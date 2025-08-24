import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import ErrorBoundary from '@/components/error-boundary';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => {
      return <ErrorBoundary>{children}</ErrorBoundary>;
    },
    ...options,
  });

export { customRender as render };
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
