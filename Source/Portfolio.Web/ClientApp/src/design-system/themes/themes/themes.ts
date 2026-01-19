import type { Theme } from './themes.types';
import { cosmosTheme } from '../themes/cosmos/cosmosTheme';
import { sunsetTheme } from '../themes/sunset/sunsetTheme';
import { vsCodeDarkTheme } from '../themes/vscode-dark/vsCodeDarkTheme';

export const themes: Record<string, Theme> = {
  cosmos: cosmosTheme,
  sunset: sunsetTheme,
  'vscode-dark': vsCodeDarkTheme
};

export const defaultTheme = cosmosTheme;
