import { About } from '@/views/about';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  return <About locale={locale} />;
}
