import { radius } from '../../tokens';
import { useTheme } from '../../themes';
import type { TagProps } from './Tag.types';

export function Tag({ children, variant = 'neutral', className = '' }: TagProps) {
  const { currentTheme } = useTheme();
  const baseClasses = `font-semibold text-gray-300 backdrop-blur-sm`;
  
  const variantClasses = variant === 'date' 
    ? 'absolute top-4 right-4 text-sm px-2 py-1'
    : 'px-2 py-1 text-xs';
  
  return (
    <span 
      className={`${radius.tag} ${baseClasses} ${variantClasses} ${className}`}
      style={{
        border: `1px solid ${currentTheme.colors.neutral.border}`,
        backgroundColor: currentTheme.colors.neutral.bg
      }}
    >
      {children}
    </span>
  );
}
