import { ThemeIcon } from '@/components/theme-switch/theme-icon';
import { useTheme } from '@/hooks/useTheme';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-toggle" title="Toggle theme">
      <input type="checkbox" name="theme-switch" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="theme-toggle-sr">Toggle theme</span>
      <ThemeIcon />
    </label>
  );
}
