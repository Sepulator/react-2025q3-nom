interface Props {
  label: string;
  list: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}

export function SelectList({ label, list, onChange, placeholder, value }: Props) {
  return (
    <>
      <input
        autoComplete="off"
        list={label}
        name={label}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
      <datalist id={label}>
        {list.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </>
  );
}
