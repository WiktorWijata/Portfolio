import type { ReactElement } from 'react';

export interface DynamicBackgroundComponent {
  variant?: string;
}

export interface DynamicBackgroundProps {
  children: ReactElement<DynamicBackgroundComponent> | ReactElement<DynamicBackgroundComponent>[];
}