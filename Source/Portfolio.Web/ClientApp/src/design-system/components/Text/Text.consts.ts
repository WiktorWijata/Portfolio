export const TextSize = {
  XS: 'XS',
  SM: 'SM',
  MD: 'MD',
  LG: 'LG',
  XL: 'XL',
} as const;

export type TextSizeType = typeof TextSize[keyof typeof TextSize];

export const TextVariant = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  MUTED: 'MUTED',
  ACCENT: 'ACCENT',
} as const;

export type TextVariantType = typeof TextVariant[keyof typeof TextVariant];

export const TextWeight = {
  NORMAL: 'NORMAL',
  MEDIUM: 'MEDIUM',
  SEMIBOLD: 'SEMIBOLD',
  BOLD: 'BOLD',
} as const;

export type TextWeightType = typeof TextWeight[keyof typeof TextWeight];

export const TextAlign = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
  JUSTIFY: 'JUSTIFY',
} as const;

export type TextAlignType = typeof TextAlign[keyof typeof TextAlign];

export const TextAs = {
  P: 'p',
  SPAN: 'span',
  DIV: 'div',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

export type TextAsType = typeof TextAs[keyof typeof TextAs];

// Mapowanie rozmiarów na klasy Tailwind
export const textSizeClasses: Record<TextSizeType, string> = {
  [TextSize.XS]: 'text-sm',      // 14px
  [TextSize.SM]: 'text-base',    // 16px
  [TextSize.MD]: 'text-xl',      // 20px
  [TextSize.LG]: 'text-2xl',     // 24px
  [TextSize.XL]: 'text-4xl',     // 36px
};

// Mapowanie wag na klasy Tailwind
export const textWeightClasses: Record<TextWeightType, string> = {
  [TextWeight.NORMAL]: 'font-normal',
  [TextWeight.MEDIUM]: 'font-medium',
  [TextWeight.SEMIBOLD]: 'font-semibold',
  [TextWeight.BOLD]: 'font-bold',
};

// Mapowanie wyrównania na klasy Tailwind
export const textAlignClasses: Record<TextAlignType, string> = {
  [TextAlign.LEFT]: 'text-left',
  [TextAlign.CENTER]: 'text-center',
  [TextAlign.RIGHT]: 'text-right',
  [TextAlign.JUSTIFY]: 'text-justify',
};

// Mapowanie wariantów kolorów - wymaga currentTheme
export const getTextVariantColor = (variant: TextVariantType, theme: any): string => {
  switch (variant) {
    case TextVariant.PRIMARY:
      return theme.colors.text.primary;
    case TextVariant.SECONDARY:
      return theme.colors.text.secondary;
    case TextVariant.MUTED:
      return theme.colors.text.muted;
    case TextVariant.ACCENT:
      return theme.colors.primary.borderHover;
    default:
      return theme.colors.text.primary;
  }
};
