export interface VsCodeDarkProps {
  variant?: CodeVariantType;
}

export const CodeVariant = {
  LIGHT: 'LIGHT',
  MEDIUM: 'MEDIUM',
  HEAVY: 'HEAVY',
} as const;

export type CodeVariantType = typeof CodeVariant[keyof typeof CodeVariant];

export interface CodeSymbol {
  x: number;
  y: number;
  char: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}
