import Link from 'next/link';

export function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Go to Home</Link>
    </section>
  );
}
