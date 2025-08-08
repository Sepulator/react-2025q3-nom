import ThemeSwitch from '@/components/theme-switch';

export function Header() {
  return (
    <header>
      <nav className="container">
        <ul>
          <li className="theme-toggle-wrapper">
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
}
