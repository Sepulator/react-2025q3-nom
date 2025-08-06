import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

interface Props {
  locale: string;
}

export function About({ locale }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('AboutPage');

  return (
    <section className="about">
      <h1 style={{ textAlign: 'center' }}>{t('title')}</h1>
      <article className="about-article">
        <Image src="/photo.webp" alt="Photo" className="about-img" width={300} height={300} />
        <div>
          {t.rich('description', {
            p: (chunks) => <p>{chunks}</p>,
            important: (chunks) => <strong>{chunks}</strong>,
            link: (chunks) => (
              <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
                {chunks}
              </a>
            ),
          })}
          <p>
            {t('author')}
            <br></br>
            <a href="https://www.linkedin.com/in/yuriy-skrypal-580a84ab/" target="_blank" rel="noreferrer">
              linkedin
            </a>
            {t('and')}
            <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
              github
            </a>
            .
          </p>
        </div>
      </article>
    </section>
  );
}
