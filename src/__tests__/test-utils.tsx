import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router';
import { routes } from '@/router';
import ThemeProvider from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface RenderOptions {
  initialEntries?: string[];
  routes?: RouteObject[];
}

const defaultRoutes: RouteObject[] = routes;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (options: RenderOptions = {}) => {
  const { initialEntries = ['/'], routes = defaultRoutes } = options;

  const router = createMemoryRouter(routes, {
    initialEntries,
    initialIndex: 0,
  });

  return {
    router,
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    ),
  };
};

export { customRender as render };
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
