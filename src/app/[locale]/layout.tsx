import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import './global.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/theme-provider';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return (
    <html lang={locale} data-theme="dark" className={inter.className}>
      <head>
        <title>{t('title')}</title>
        <link rel="icon" href="/movie.svg" />
      </head>
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <ThemeProvider>
              <Header locale={locale} />
              <main className="container main">{children}</main>
              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
