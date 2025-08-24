'use client';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
  margin: '0 auto',
  marginTop: '8rem',
};

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <main style={styles}>
          <h2>Something went wrong!</h2>
          <details>
            {error.message}
            <br />
            {error.stack}
          </details>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
