import type { CSSProperties } from 'react';

interface FadeInOptions {
  delay?: number;
  duration?: number;
  easing?: string;
}

/**
 * Generates CSS animation style for fade-in effect
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param easing - Animation easing function (default: 'ease-out')
 * @returns CSSProperties object with animation property
 */
export function fadeIn({ delay = 0, duration = 0.6, easing = 'ease-out' }: FadeInOptions = {}): CSSProperties {
  return {
    animation: `fadeIn ${duration}s ${easing} ${delay}s both`
  };
}

/**
 * Generates CSS animation style for slide-in from right effect
 * @param duration - Animation duration in seconds (default: 0.3)
 * @param easing - Animation easing function (default: 'ease-out')
 * @returns CSSProperties object with animation property
 */
export function slideInRight({ duration = 0.3, easing = 'ease-out' }: Omit<FadeInOptions, 'delay'> = {}): CSSProperties {
  return {
    animation: `slideInRight ${duration}s ${easing}`
  };
}

/**
 * Generates CSS animation style for slide-out to right effect
 * @param duration - Animation duration in seconds (default: 0.3)
 * @param easing - Animation easing function (default: 'ease-in')
 * @returns CSSProperties object with animation property
 */
export function slideOutRight({ duration = 0.3, easing = 'ease-in' }: Omit<FadeInOptions, 'delay'> = {}): CSSProperties {
  return {
    animation: `slideOutRight ${duration}s ${easing}`
  };
}
