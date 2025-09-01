import { httpMessages } from '@/consts';

interface Props {
  isError: string | null;
}

export function CardError({ isError }: Props) {
  return (
    <article className="error ">
      Error: {isError + ' '}
      {httpMessages.find((code) => code.status.toString() === isError)?.message}
    </article>
  );
}
