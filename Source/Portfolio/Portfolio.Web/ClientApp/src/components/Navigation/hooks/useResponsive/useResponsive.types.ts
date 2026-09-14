import type { Breakpoint } from './useResponsive.consts';

export type BreakpointType = typeof Breakpoint[keyof typeof Breakpoint];
