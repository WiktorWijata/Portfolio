import type { ComponentType } from 'react';

export interface ThemeColors {
  primary: {
    bg: string;
    bgHover: string;
    bgActive: string;
    border: string;
    borderHover: string;
    borderGlow: string;
    text: string;
    glow: string;
  };
  neutral: {
    border: string;
    bg: string;
    bgDark: string;
    bgDarkFocus: string;
    bgDarker: string;
    bgDarkest: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  gradient: {
    title: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  background: ComponentType<{ variant?: any }>; // eslint-disable-line @typescript-eslint/no-explicit-any
  colors: ThemeColors;
}
