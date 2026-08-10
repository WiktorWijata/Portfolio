import type { LinkVariantType } from '../../../../design-system/components';

export interface NavLinkItem {
  href: string;
  label: string;
}

export interface NavLinkListProps {
  links: NavLinkItem[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isVertical?: boolean;
  variant?: LinkVariantType;
  className?: string;
}