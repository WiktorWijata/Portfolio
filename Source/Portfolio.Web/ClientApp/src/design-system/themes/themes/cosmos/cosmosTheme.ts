import type { Theme } from '../themes.types';
import { Cosmos } from './Cosmos';

export const cosmosTheme: Theme = {
  id: 'cosmos',
  name: 'Cosmos',
  background: Cosmos,
  colors: {
    primary: {
      bg: 'rgba(168, 85, 247, 0.1)',
      bgHover: 'rgba(168, 85, 247, 0.5)',
      bgActive: 'rgba(168, 85, 247, 0.3)',
      border: 'rgba(168, 85, 247, 0.4)',
      borderHover: 'rgba(168, 85, 247, 1)',
      borderGlow: 'rgba(168, 85, 247, 0.8)',
      text: '#e9d5ff',
      glow: '0 0 15px rgba(168, 85, 247, 0.4)',
    },
    neutral: {
      border: 'rgba(255, 248, 231, 0.15)',
      bg: 'rgba(255, 248, 231, 0.03)',
      bgDark: 'rgba(0, 0, 0, 0.3)',
      bgDarkFocus: 'rgba(0, 0, 0, 0.5)',
      bgDarkest: 'rgba(0, 0, 0, 0.95)',
    },
    text: {
      primary: 'text-gray-200',
      secondary: 'text-gray-300',
      muted: 'text-gray-400',
    },
    gradient: {
      title: 'linear-gradient(to right, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
    },
  },
};
