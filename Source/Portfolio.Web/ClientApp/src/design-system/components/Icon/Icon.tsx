import type { SVGProps, ReactElement } from 'react';
import type { IconProps, IconSizeType } from './Icon.types';
import { IconSize } from './Icon.types';
import {
  GithubIcon,
  LinkedinIcon,
  EmailIcon,
  ExternalLinkIcon,
  CodeIcon,
  GlobeIcon,
  LanguageIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MenuIcon,
  CloseIcon,
} from '../../assets/icons';

type SvgProps = SVGProps<SVGSVGElement>;

const sizeClasses: Record<IconSizeType, string> = {
  [IconSize.XS]: 'w-4 h-4',
  [IconSize.SM]: 'w-5 h-5',
  [IconSize.MD]: 'w-6 h-6',
  [IconSize.LG]: 'w-8 h-8',
  [IconSize.XL]: 'w-10 h-10'
};

const iconComponents: Record<string, (props: SvgProps) => ReactElement> = {
  'github': GithubIcon,
  'linkedin': LinkedinIcon,
  'email': EmailIcon,
  'external-link': ExternalLinkIcon,
  'code': CodeIcon,
  'globe': GlobeIcon,
  'language': LanguageIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  'menu': MenuIcon,
  'close': CloseIcon
};

export function Icon({ name, size = IconSize.MD, color = 'white', className = '' }: IconProps) {
  const sizeClass = sizeClasses[size];
  const combinedClassName = `${sizeClass} ${className}`.trim();

  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={combinedClassName}
      style={{ color }}
      aria-hidden="true"
    />
  );
}
