interface Props {
  movieList: string;
}

export function CardList({ movieList }: Props) {
  return <h2>{movieList}</h2>;
}
