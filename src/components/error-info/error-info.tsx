import type { CSSProperties } from 'react';

interface Props {
  error: Error | null;
  status_message: string;
}

const style: CSSProperties = { color: 'var(--pico-del-color)' };

export function ErrorInfo({ error, status_message }: Props) {
  return (
    <article style={{ height: 'fit-content' }}>
      {status_message && <p style={style}>{status_message}</p>}
      {error && <p style={style}>{error.message}</p>}
    </article>
  );
}
