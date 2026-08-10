import { useTheme } from '../../themes';
import type { LabelProps } from './Label.types';

export function Label({ children, htmlFor, className = '' }: LabelProps) {
  const { currentTheme } = useTheme();
  
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block font-semibold mb-2 text-sm ${className}`}
      style={{
        color: currentTheme.colors.text.secondary
      }}
    >
      {children}
    </label>
  );
}
