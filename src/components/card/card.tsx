import type { FormValue } from '@/types';

interface CardProps extends FormValue {
  className?: string;
}

export function Card({ age, email, name, picture, country, gender, className }: CardProps) {
  return (
    <article className={`card ${className || ''}`}>
      <img src={picture} alt={name} />
      <div>
        <p>
          Name: <span>{name}</span>
        </p>
        <p>
          Age: <span>{age}</span>
        </p>
        <p>
          Gender: <span>{gender}</span>
        </p>
        <p>{email}</p>
        <p>{country}</p>
      </div>
    </article>
  );
}
