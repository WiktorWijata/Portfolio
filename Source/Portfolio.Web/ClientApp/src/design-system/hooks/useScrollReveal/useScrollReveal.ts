import { useEffect, useRef, useState, useMemo } from 'react';
import type { UseScrollRevealOptions } from './useScrollReveal.types';

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { delay = 0, threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
              observer.unobserve(element);
            }, delay);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold, rootMargin]);

  const className = useMemo(
    () =>
      `transition-opacity transition-transform duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`,
    [isVisible]
  );

  return { elementRef, className, isVisible };
}
