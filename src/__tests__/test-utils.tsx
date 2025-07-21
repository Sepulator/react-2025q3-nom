import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router';
import { routes } from '@/router';

interface RenderOptions {
  initialEntries?: string[];
  routes?: RouteObject[];
}

const defaultRoutes: RouteObject[] = routes;

const customRender = (options: RenderOptions = {}) => {
  const { initialEntries = ['/'], routes = defaultRoutes } = options;

  const router = createMemoryRouter(routes, {
    initialEntries,
    initialIndex: 0,
  });

  return {
    router,
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

export { customRender as render };
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
