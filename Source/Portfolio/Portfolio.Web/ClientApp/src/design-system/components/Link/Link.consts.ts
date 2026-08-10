export const LinkVariant = {
  NAV: 'NAV',
  TEXT: 'TEXT',
  CONTACT: 'CONTACT',
} as const;

export type LinkVariantType = typeof LinkVariant[keyof typeof LinkVariant];

export const linkVariantClasses: Record<LinkVariantType, string> = {
  [LinkVariant.NAV]: 'font-medium',
  [LinkVariant.TEXT]: '',
  [LinkVariant.CONTACT]: 'text-base hover:text-purple-300',
};
