import { AppLayout } from '@/layouts/app-layout';
import { About } from '@/views/about';
import { Main } from '@/views/main';
import { NotFound } from '@/views/not-found';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,

    children: [
      { index: true, Component: Main },
      { path: 'about', Component: About },
      { path: '*', Component: NotFound },
    ],
  },
]);
