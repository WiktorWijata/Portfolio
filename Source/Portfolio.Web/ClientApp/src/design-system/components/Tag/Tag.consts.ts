export const TagVariant = {
  NEUTRAL: 'NEUTRAL',
  DATE: 'DATE',
} as const;

export type TagVariantType = typeof TagVariant[keyof typeof TagVariant];

export const tagVariantClasses: Record<TagVariantType, string> = {
  [TagVariant.DATE]: 'absolute top-4 right-4 text-sm px-2 py-1',
  [TagVariant.NEUTRAL]: 'px-2 py-1 text-xs',
};