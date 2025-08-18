import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeProvider from '@/components/theme-provider';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }: { children: React.ReactNode }) => {
        return <ThemeProvider>{children}</ThemeProvider>;
      },
      ...options,
    }),
  };
};

export { customRender as render };
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
