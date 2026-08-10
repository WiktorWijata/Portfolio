import { useState } from 'react';
import type { UseToggleWithScroll } from './useToggleWithScroll.types';

export const useToggleWithScroll: UseToggleWithScroll = (
  elementRef,
  options = {}
) => {
  const {
    scrollDelay = 100,
    scrollBehavior = 'smooth',
    scrollBlock = 'start'
  } = options;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({ 
          behavior: scrollBehavior, 
          block: scrollBlock 
        });
      }, scrollDelay);
    }
    setIsExpanded(!isExpanded);
  };

  return { isExpanded, handleToggle };
};
