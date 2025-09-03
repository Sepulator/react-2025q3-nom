import { ThemeContext } from '@/components/theme-provider/theme-context';
import { useContext } from 'react';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('ThemeProvider not detected');
  }
  return context;
}
