import { CardDetail } from '@/components/card-detail/card-detail';
import { AppLayout } from '@/layouts/app-layout';
import { About } from '@/views/about';
import { Main } from '@/views/main';
import { NotFound } from '@/views/not-found';
import { createBrowserRouter, type RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: [
      { path: '/', Component: Main, children: [{ path: 'movie/:id', Component: CardDetail }] },
      { path: 'about', Component: About },
      { path: '*', Component: NotFound },
    ],
  },
];

export const router = createBrowserRouter(routes);
