import { httpMessages } from '@/consts';
import type { CSSProperties } from 'react';

interface Props {
  error?: string | null;
  status_message?: string;
}

const style: CSSProperties = { color: 'var(--pico-del-color)' };

export function ErrorInfo({ error, status_message }: Props) {
  const errorMessage = httpMessages.find((code) => code.status.toString() === error)?.message;

  return (
    <article style={{ height: 'fit-content' }}>
      {status_message && <p style={style}>{status_message}</p>}
      {errorMessage && <p style={style}>{`Error: ${error} ${errorMessage}`}</p>}
    </article>
  );
}
