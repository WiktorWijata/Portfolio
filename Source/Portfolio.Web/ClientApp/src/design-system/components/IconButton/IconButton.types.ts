import type { ReactNode } from "react";

export interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  target?: string;
  rel?: string;
}