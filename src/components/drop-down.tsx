interface Props {
  label: string;
  list: string[];
  onChange?: (value: string) => void;
  placeholder: string;
  value?: string;
}

export function DropDown({ label, list, onChange, placeholder, value }: Props) {
  return (
    <select
      aria-label={placeholder}
      autoComplete="off"
      name={label}
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
    >
      <option defaultValue="All">All</option>
      {list.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
