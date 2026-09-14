import type { Theme } from '../themes.types';
import { Sunset } from './Sunset';

export const sunsetTheme: Theme = {
  id: 'sunset',
  name: 'Sunset',
  background: Sunset,
  colors: {
    primary: {
      bg: 'rgba(255, 107, 0, 0.1)',
      bgHover: 'rgba(255, 107, 0, 0.5)',
      bgActive: 'rgba(255, 107, 0, 0.3)',
      border: 'rgba(255, 107, 0, 0.4)',
      borderHover: 'rgba(255, 107, 0, 1)',
      borderGlow: 'rgba(255, 107, 0, 0.8)',
      text: '#ffedd5',
      glow: '0 0 15px rgba(255, 107, 0, 0.4)',
    },
    neutral: {
      border: 'rgba(229, 231, 235, 0.15)',
      bg: 'transparent',
      bgDark: 'rgba(0, 0, 0, 0.3)',
      bgDarkFocus: 'rgba(0, 0, 0, 0.5)',
      bgDarker: 'rgba(0, 0, 0, 0.7)',
      bgDarkest: 'rgba(0, 0, 0, 0.95)',
    },
    text: {
      primary: '#fef3c7',    // warm light
      secondary: '#fde68a',  // warm yellow
      muted: '#d97706',      // orange-600
    },
    gradient: {
      title: 'linear-gradient(to right, #ea580c, #f97316, #fb923c, #fdba74)',
      timeline: 'linear-gradient(to bottom, #ea580c, #f97316, #fb923c, #fdba74)',
    },
    shadow: {
      tile: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      toast: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    },
  },
};
