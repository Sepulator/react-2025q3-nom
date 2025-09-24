import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export async function NotFound() {
  const t = await getTranslations('NotFound');

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
