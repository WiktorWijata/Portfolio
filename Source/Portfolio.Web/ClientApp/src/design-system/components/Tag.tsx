import type { ReactNode } from 'react';
import { colors, radius } from '../tokens';

interface TagProps {
  children: ReactNode;
  variant?: 'neutral' | 'date';
  className?: string;
}

export function Tag({ children, variant = 'neutral', className = '' }: TagProps) {
  const baseClasses = `font-semibold text-gray-300 backdrop-blur-sm`;
  
  const variantClasses = variant === 'date' 
    ? 'absolute top-4 right-4 text-sm px-2 py-1'
    : 'px-2 py-1 text-xs';
  
  return (
    <span 
      className={`${radius.tag} ${baseClasses} ${variantClasses} ${className}`}
      style={{
        border: `1px solid ${colors.neutral.border}`,
        backgroundColor: colors.neutral.bg
      }}
    >
      {children}
    </span>
  );
}
