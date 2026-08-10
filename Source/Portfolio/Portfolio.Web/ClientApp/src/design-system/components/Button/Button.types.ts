import type { ReactNode } from "react";
import type { ButtonVariantType } from './Button.consts';
import { ButtonVariant } from './Button.consts';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariantType;
  href?: string;
  download?: string | boolean;
}

export { ButtonVariant };
export type { ButtonVariantType };