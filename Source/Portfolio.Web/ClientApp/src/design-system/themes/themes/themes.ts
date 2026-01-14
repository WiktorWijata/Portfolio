import type { Theme } from './themes.types';
import { cosmosTheme } from '../themes/cosmos/cosmosTheme';

export const themes: Record<string, Theme> = {
  cosmos: cosmosTheme,
};

export const defaultTheme = cosmosTheme;
