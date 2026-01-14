export interface FireflyProps {
  variant?: FireflyVariantType;
}

export const FireflyVariant = {
  LIGHT: 'LIGHT',
  MEDIUM: 'MEDIUM',
  HEAVY: 'HEAVY',
} as const;

export type FireflyVariantType = typeof FireflyVariant[keyof typeof FireflyVariant];

export interface Firefly {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  speedX: number;
  speedY: number;
}
