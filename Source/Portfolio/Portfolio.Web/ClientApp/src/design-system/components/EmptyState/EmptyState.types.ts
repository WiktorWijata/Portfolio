import type { ReactNode } from 'react';
import type { IconNameType } from '../Icon';

export interface EmptyStateProps {
  /** Optional icon shown above the title. */
  icon?: IconNameType;
  title: string;
  description?: string;
  /** Optional trailing content, e.g. a retry action. */
  action?: ReactNode;
  className?: string;
}
