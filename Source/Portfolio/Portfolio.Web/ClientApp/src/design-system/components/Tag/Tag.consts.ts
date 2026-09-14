export const TagVariant = {
  NEUTRAL: 'NEUTRAL',
  DATE: 'DATE',
} as const;

export type TagVariantType = typeof TagVariant[keyof typeof TagVariant];

export const tagVariantClasses: Record<TagVariantType, string> = {
  [TagVariant.DATE]: 'block w-fit mb-2 lg:absolute lg:top-4 lg:right-4 lg:mb-0 text-sm px-2 py-1',
  [TagVariant.NEUTRAL]: 'px-2 py-1 text-xs',
};