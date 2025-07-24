import { ThemeContext } from '@/services/theme-context';
import { useContext } from 'react';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('ThemeProvider not detected');
  }
  return context;
}
