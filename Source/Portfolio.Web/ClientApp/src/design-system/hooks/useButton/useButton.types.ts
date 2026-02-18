export interface UseButtonOptions {
  disabled?: boolean;
  loading?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}