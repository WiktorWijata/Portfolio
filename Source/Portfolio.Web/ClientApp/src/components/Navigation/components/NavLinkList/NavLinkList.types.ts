import type { NavLinkItem } from '../../../../data/navigation';
import type { LinkVariantType } from '../../../../design-system/components';

export interface NavLinkListProps {
  links: NavLinkItem[];
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isVertical?: boolean;
  variant?: LinkVariantType;
  className?: string;
}