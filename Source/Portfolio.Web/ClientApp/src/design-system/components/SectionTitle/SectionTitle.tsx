import { useTheme } from '../../themes';
import type { SectionTitleProps } from './SectionTitle.types';

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div className={`flex justify-center mb-16 ${className}`}>
      <h2 
        className="text-3xl md:text-4xl font-bold"
        style={{
          backgroundImage: currentTheme.colors.gradient.title,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          MozBackgroundClip: 'text',
          MozTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block',
          width: 'fit-content'
        }}
      >
        {children}
      </h2>
    </div>
  );
}
