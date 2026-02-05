export const Radius = {
  CARD: 'rounded-lg',
  BUTTON: 'rounded-lg',
  TAG: 'rounded',
  FULL: 'rounded-full',
  INPUT: 'rounded-lg',
} as const;

export type RadiusType = typeof Radius[keyof typeof Radius];
