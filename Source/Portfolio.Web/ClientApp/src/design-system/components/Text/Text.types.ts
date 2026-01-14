import type { TextSizeType, TextVariantType, TextWeightType, TextAlignType, TextAsType } from './Text.consts';

export interface TextProps {
  children: React.ReactNode;
  size?: TextSizeType;
  variant?: TextVariantType;
  weight?: TextWeightType;
  align?: TextAlignType;
  as?: TextAsType;
  className?: string;
  hover?: boolean;
}
