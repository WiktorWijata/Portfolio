import type { ReactNode } from 'react';
import { colors } from '../tokens';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${className}`}>
      <span 
        style={{
          background: colors.gradient.title,
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

export default SectionTitle;
