import type { ReactNode, CSSProperties } from 'react';

export interface TileProps {
  children?: ReactNode;
  hover?: boolean;
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  style?: CSSProperties;
}
