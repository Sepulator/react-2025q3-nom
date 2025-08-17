import ThemeSwitch from '@/components/theme-switch';
import { useFormStore } from '@/store';

export function Header() {
  const { openDialog } = useFormStore();

  return (
    <header>
      <nav className="container">
        <ul>
          <li>
            <button onClick={() => openDialog(true)}>React Hook Form</button>
          </li>

          <li>
            <button onClick={() => openDialog(false)}>Uncontrolled Form</button>
          </li>
        </ul>
        <ul>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
}
