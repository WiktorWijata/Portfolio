import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { delay = 0, threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
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
