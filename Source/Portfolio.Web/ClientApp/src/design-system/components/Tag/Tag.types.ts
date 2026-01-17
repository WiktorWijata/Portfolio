import type { TagVariantType } from './Tag.consts';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariantType;
  className?: string;
}

export type { TagVariantType };
