export const Alignment = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
  JUSTIFY: 'JUSTIFY',
} as const;

export type AlignmentType = typeof Alignment[keyof typeof Alignment];
