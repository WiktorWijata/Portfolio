export const IconButtonSize = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
} as const;

export type IconButtonSizeType = typeof IconButtonSize[keyof typeof IconButtonSize];

export const iconButtonSizeClasses: Record<IconButtonSizeType, string> = {
  [IconButtonSize.SMALL]: 'w-8 h-8',
  [IconButtonSize.MEDIUM]: 'w-12 h-12',
  [IconButtonSize.LARGE]: 'w-16 h-16',
};