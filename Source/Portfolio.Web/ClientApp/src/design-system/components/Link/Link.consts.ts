export const LinkVariant = {
  NAV: 'NAV',
  TEXT: 'TEXT',
} as const;

export type LinkVariantType = typeof LinkVariant[keyof typeof LinkVariant];

export const linkVariantClasses: Record<LinkVariantType, string> = {
  [LinkVariant.NAV]: 'font-medium',
  [LinkVariant.TEXT]: '',
};
