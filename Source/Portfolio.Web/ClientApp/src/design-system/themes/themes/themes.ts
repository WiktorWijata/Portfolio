import type { Theme } from './themes.types';
import { cosmosTheme } from './cosmos/cosmosTheme';

export const themes: Record<string, Theme> = {
  cosmos: cosmosTheme,
};

export const defaultTheme = cosmosTheme;
