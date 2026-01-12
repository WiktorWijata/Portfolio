export interface UseButtonOptions {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  colors?: {
    primary: {
      bg: string;
      bgHover: string;
      border: string;
      borderHover: string;
      text: string;
    };
  };
}