import type { Theme } from '../themes.types';
import { VsCodeDark } from './VsCodeDark';

export const vsCodeDarkTheme: Theme = {
  id: 'vscode-dark',
  name: 'VS Code Dark',
  background: VsCodeDark,
  colors: {
    primary: {
      bg: 'rgba(0, 122, 204, 0.1)',
      bgHover: 'rgba(0, 122, 204, 0.2)',
      bgActive: 'rgba(0, 122, 204, 0.3)',
      border: 'rgba(0, 122, 204, 0.5)',
      borderHover: 'rgba(0, 122, 204, 1)',
      borderGlow: 'rgba(0, 122, 204, 0.8)',
      text: '#007acc',
      glow: '0 0 15px rgba(0, 122, 204, 0.4)',
    },
    neutral: {
      border: 'rgba(96, 96, 96, 0.6)',
      bg: 'rgba(37, 37, 38, 0.8)',
      bgDark: 'rgba(30, 30, 30, 0.9)',
      bgDarkFocus: 'rgba(30, 30, 30, 0.95)',
      bgDarker: 'rgba(25, 25, 25, 0.98)',
      bgDarkest: 'rgba(20, 20, 20, 1)',
    },
    text: {
      primary: '#cccccc',
      secondary: '#9cdcfe',
      muted: '#858585',
    },
    gradient: {
      title: 'linear-gradient(to right, #569cd6, #4ec9b0, #dcdcaa, #ce9178)',
      timeline: 'linear-gradient(to bottom, #569cd6, #4ec9b0, #dcdcaa, #ce9178)',
    },
  },
};
