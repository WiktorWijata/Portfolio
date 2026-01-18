import type { ReactNode } from 'react';

export interface ResponsiveConfig {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface ExpandableGridProps<T> {
  items: T[];
  columns: ResponsiveConfig;
  gap?: ResponsiveConfig;
  isExpanded: boolean;
  renderItem: (item: T, index: number, isVisible: boolean) => ReactNode;
  className?: string;
  duration?: number;
}
