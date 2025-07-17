import ErrorBoundary from '@/components/error-boundary';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Outlet } from 'react-router';

export const AppLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <main className="container main">
          <Outlet />
        </main>
        <Footer />
      </ErrorBoundary>
    </>
  );
};
