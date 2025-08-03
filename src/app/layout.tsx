import { ReactNode } from 'react';
import '../index.css';

import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={inter.className}>
      <head>
        <title>The Movie Database API</title>
      </head>
      <body>
        <div id="root">
          <ThemeProvider>
            <Header />
            <main className="container main">{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
