'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/services/theme-context';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('ThemeProvider not detected');
  }
  return context;
}
