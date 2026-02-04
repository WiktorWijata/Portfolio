import { useEffect, useRef, useState } from 'react';
import type { UseScrollRevealOptions } from './useScrollReveal.types';

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { delay = 0, threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold, rootMargin]);

  const className = `transition-all duration-1000 ease-out ${
    isVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-16'
  }`;

  return { elementRef, className, isVisible };
}
