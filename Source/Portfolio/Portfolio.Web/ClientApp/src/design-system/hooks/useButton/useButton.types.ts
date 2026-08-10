import type { ButtonVariantType } from '../../components/Button/Button.consts';

export interface UseButtonOptions {
  disabled?: boolean;
  loading?: boolean;
  isActive?: boolean;
  className?: string;
  variant?: ButtonVariantType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}