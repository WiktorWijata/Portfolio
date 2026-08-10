export const IconName = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  EMAIL: 'email',
  EXTERNAL_LINK: 'external-link',
  CODE: 'code',
  GLOBE: 'globe',
  LANGUAGE: 'language',
  CHEVRON_DOWN: 'chevron-down',
  CHEVRON_LEFT: 'chevron-left',
  CHEVRON_RIGHT: 'chevron-right',
  CHEVRON_UP: 'chevron-up',
  MENU: 'menu',
  CLOSE: 'close'
} as const;

export type IconNameType = typeof IconName[keyof typeof IconName];

export const IconSize = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;

export type IconSizeType = typeof IconSize[keyof typeof IconSize];

export interface IconProps {
  name: IconNameType;
  size?: IconSizeType;
  color?: string;
  className?: string;
}
