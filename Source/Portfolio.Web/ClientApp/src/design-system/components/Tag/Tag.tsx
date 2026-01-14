import { radius } from '../../tokens';
import { useTheme } from '../../themes';
import type { TagProps } from './Tag.types';
import { TagVariant, tagVariantClasses } from './Tag.consts';

export function Tag({ children, variant = TagVariant.NEUTRAL, className = '' }: TagProps) {
  const { currentTheme } = useTheme();
  const baseClasses = `font-semibold text-gray-300 backdrop-blur-sm`;
  const variantClasses = tagVariantClasses[variant];
  
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
