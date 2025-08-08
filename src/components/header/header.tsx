import ThemeSwitch from '@/components/theme-switch';
import { useFormStore } from '@/store';

export function Header() {
  const { openDialog } = useFormStore();

  return (
    <header>
      <nav className="container">
        <ul>
          <li>
            <button onClick={openDialog}>Dialog</button>
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
