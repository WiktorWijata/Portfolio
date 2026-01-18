import type { RefObject } from 'react';

export interface UseToggleWithScrollOptions {
  scrollDelay?: number;
  scrollBehavior?: ScrollBehavior;
  scrollBlock?: ScrollLogicalPosition;
}

export interface UseToggleWithScrollReturn {
  isExpanded: boolean;
  handleToggle: () => void;
}

export type UseToggleWithScroll = (
  elementRef: RefObject<HTMLElement | null>,
  options?: UseToggleWithScrollOptions
) => UseToggleWithScrollReturn;
