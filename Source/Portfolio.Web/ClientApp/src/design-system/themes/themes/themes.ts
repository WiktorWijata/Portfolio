import type { Theme } from './themes.types';
import { cosmosTheme } from '../themes/cosmos/cosmosTheme';
import { sunsetTheme } from '../themes/sunset/sunsetTheme';

export const themes: Record<string, Theme> = {
  cosmos: cosmosTheme,
  sunset: sunsetTheme,
};

export const defaultTheme = cosmosTheme;
