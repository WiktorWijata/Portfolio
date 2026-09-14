import { useState, useEffect } from 'react';
import { Breakpoint, BreakpointQueries } from './useResponsive.consts';
import type { BreakpointType } from './useResponsive.types';

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<BreakpointType>(Breakpoint.DESKTOP);

  useEffect(() => {
    const mobileQuery = window.matchMedia(BreakpointQueries.MOBILE);
    const tabletQuery = window.matchMedia(BreakpointQueries.TABLET);
    const desktopQuery = window.matchMedia(BreakpointQueries.DESKTOP);

    const updateBreakpoint = () => {
      if (mobileQuery.matches) {
        setBreakpoint(Breakpoint.MOBILE);
      } else if (tabletQuery.matches) {
        setBreakpoint(Breakpoint.TABLET);
      } else {
        setBreakpoint(Breakpoint.DESKTOP);
      }
    };

    updateBreakpoint();

    mobileQuery.addEventListener('change', updateBreakpoint);
    tabletQuery.addEventListener('change', updateBreakpoint);
    desktopQuery.addEventListener('change', updateBreakpoint);

    return () => {
      mobileQuery.removeEventListener('change', updateBreakpoint);
      tabletQuery.removeEventListener('change', updateBreakpoint);
      desktopQuery.removeEventListener('change', updateBreakpoint);
    };
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === Breakpoint.MOBILE,
    isTablet: breakpoint === Breakpoint.TABLET,
    isDesktop: breakpoint === Breakpoint.DESKTOP
  };
}
