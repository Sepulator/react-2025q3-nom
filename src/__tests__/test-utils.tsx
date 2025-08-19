import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import { render, screen, type RenderOptions } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';

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

export const fillValidForm = async (user: UserEvent) => {
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/age/i), '25');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/main-password/i), 'Password123!');
  await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
  await user.click(screen.getByLabelText(/female/i));
  await user.click(screen.getByLabelText(/accept.*terms/i));
  await user.type(screen.getByLabelText(/country/i), 'United States');

  const file = new File(['test'], 'test.png', { type: 'image/png' });
  const fileInput = screen.getByLabelText(/picture/i);

  await user.upload(fileInput, file);
};

export { customRender as render };
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
