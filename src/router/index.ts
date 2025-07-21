import { AppLayout } from '@/layouts/app-layout';
import { About } from '@/views/about';
import { Main } from '@/views/main';
import { NotFound } from '@/views/not-found';
import { createBrowserRouter, type RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Main },
      { path: 'about', Component: About },
      { path: '*', Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routes);
