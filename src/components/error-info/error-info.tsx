import { httpMessages } from '@/consts';

interface Props {
  error: Error | null;
  status_message: string;
}

export function ErrorInfo({ error }: Props) {
  return (
    <article style={{ color: 'var(--pico-del-color)' }}>
      Error:{` ${error?.message} `}
      {httpMessages.find((code) => code.status.toString() === error?.message)?.message}
      <p>status_message</p>
    </article>
  );
}
