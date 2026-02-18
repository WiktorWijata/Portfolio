import type { ReactNode, AnchorHTMLAttributes } from 'react';
import type { LinkVariantType } from './Link.consts';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: LinkVariantType;
}
