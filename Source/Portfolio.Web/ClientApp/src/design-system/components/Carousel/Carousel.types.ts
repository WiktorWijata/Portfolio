import { ReactNode } from 'react';

export interface CarouselProps {
  children: ReactNode;
  padding?: string;
  minHeight?: string;
  showDots?: boolean;
  showNavigation?: boolean;
  duration?: number;
  className?: string;
}

export interface CarouselItemProps {
  children: ReactNode;
  padding?: string;
}
