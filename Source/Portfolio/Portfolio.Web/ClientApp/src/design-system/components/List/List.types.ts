import type { TextSizeType, TextVariantType } from '../Text/Text.consts';

export interface ListProps {
  items: string[];
  bullet?: React.ReactNode;
  bulletVariant?: TextVariantType;
  contentVariant?: TextVariantType;
  size?: TextSizeType;
  spacing?: string;
  className?: string;
}
