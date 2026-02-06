export const Breakpoint = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP'
} as const;

export type BreakpointType = typeof Breakpoint[keyof typeof Breakpoint];

export const BreakpointQueries = {
  MOBILE: '(max-width: 768px)',
  TABLET: '(min-width: 769px) and (max-width: 1024px)',
  DESKTOP: '(min-width: 1025px)'
} as const;
