import type { FormValue } from '@/types';

export function Card({ age, email, name, picture, country, gender }: FormValue) {
  return (
    <article className="card">
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
