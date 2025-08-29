interface Props {
  label: string;
  lists: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export function SelectList({ label, lists, onChange, placeholder, value }: Props) {
  return (
    <select
      aria-label={placeholder}
      autoComplete="off"
      id={label}
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
    >
      <option disabled selected>
        {placeholder}
      </option>
      {lists.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
