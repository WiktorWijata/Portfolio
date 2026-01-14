import { useTheme } from '../../themes';
import type { SectionTitleProps } from './SectionTitle.types';

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  const { currentTheme } = useTheme();
  
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${className}`}>
      <span 
        style={{
          background: currentTheme.colors.gradient.title,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {children}
      </span>
    </h2>
  );
}
