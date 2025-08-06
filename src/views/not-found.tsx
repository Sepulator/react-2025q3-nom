import Link from 'next/link';

export function NotFound() {
  return (
    <main className="container">
      <section style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/">Go to Home</Link>
      </section>
    </main>
  );
}
