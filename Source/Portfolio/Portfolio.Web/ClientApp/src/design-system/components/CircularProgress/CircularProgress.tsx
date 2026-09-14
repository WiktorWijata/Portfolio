import { useTheme } from '../../themes';
import type { CircularProgressProps } from './CircularProgress.types';

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
};

export function CircularProgress({ size = 'md', className = '' }: CircularProgressProps) {
  const { currentTheme } = useTheme();

  return (
    <div
      className={`${sizeClasses[size]} rounded-full animate-spin ${className}`}
      style={{
        borderColor: currentTheme.colors.primary.bgActive,
        borderTopColor: currentTheme.colors.primary.borderHover,
      }}
      role="status"
      aria-label="Loading"
    />
  );
}
