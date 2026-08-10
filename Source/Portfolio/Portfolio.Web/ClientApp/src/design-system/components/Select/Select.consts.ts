export const DropdownPosition = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const;

export type DropdownPositionType = typeof DropdownPosition[keyof typeof DropdownPosition];
