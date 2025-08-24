import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="container">
      <section style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>{t('title')}</h1>
        <p>{t('info')}</p>
        <Link href="/">{t('link')}</Link>
      </section>
    </main>
  );
}
