import type { TextSizeType, TextVariantType, TextWeightType, TextAsType } from './Text.consts';
import type { CSSProperties } from 'react';
import type { AlignmentType } from '../../tokens';

export interface TextProps {
  children: React.ReactNode;
  size?: TextSizeType;
  variant?: TextVariantType;
  weight?: TextWeightType;
  align?: AlignmentType;
  as?: TextAsType;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}
