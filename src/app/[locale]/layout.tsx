import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/theme-provider';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import './global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale,
    namespace: 'LocaleLayout',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} data-theme="dark" className={inter.className}>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
