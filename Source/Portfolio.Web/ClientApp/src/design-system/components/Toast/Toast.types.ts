import type { ReactNode } from 'react';
import type { ToastVariantType } from './Toast.consts';

export interface ToastProps {
  children: ReactNode;
  variant?: ToastVariantType;
  className?: string;
  show?: boolean;
  duration?: number;
  onClose?: () => void;
}
