import { createContext } from 'react';
import type { Theme } from './themes/themes.types';

export interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
