import type { ReactNode } from "react";
import type { IconButtonSizeType } from './IconButton.consts';

export interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: IconButtonSizeType;
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}