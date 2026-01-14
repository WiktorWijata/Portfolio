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
 * Generates CSS animation style for staggered fade-in effect
 * Useful for animating lists or grids with a cascading effect
 * @param index - Item index for stagger calculation
 * @param staggerDelay - Delay between each item in seconds (default: 0.1)
 * @param duration - Animation duration in seconds (default: 0.4)
 * @param easing - Animation easing function (default: 'ease-out')
 * @returns CSSProperties object with animation property
 */
export function fadeInStagger(
  index: number, 
  { staggerDelay = 0.1, duration = 0.4, easing = 'ease-out' }: Omit<FadeInOptions, 'delay'> & { staggerDelay?: number } = {}
): CSSProperties {
  return fadeIn({ delay: index * staggerDelay, duration, easing });
}
