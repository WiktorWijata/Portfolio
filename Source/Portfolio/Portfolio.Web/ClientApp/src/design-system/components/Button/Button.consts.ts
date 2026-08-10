export const ButtonVariant = {
  PRIMARY: 'primary',
  SMALL: 'small',
  OUTLINED: 'outlined',
} as const;

export type ButtonVariantType = typeof ButtonVariant[keyof typeof ButtonVariant];
