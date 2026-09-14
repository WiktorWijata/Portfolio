import type { TagVariantType } from '../Tag/Tag.types';

export interface TagGroupProps {
  items: string[];
  variant?: TagVariantType;
  spacing?: string;
  className?: string;
}
