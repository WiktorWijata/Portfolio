import type { ReactNode, MouseEvent } from 'react';
import { colors, radius } from '../tokens';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'small';
}

export function Button({ 
  children, 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = `${radius.button} font-medium transition-all duration-300`;
  const sizeClasses = variant === 'small' ? 'px-3 py-1.5 text-sm' : 'px-8 py-3';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105';
  
  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = colors.primary.bgHover;
      e.currentTarget.style.borderColor = colors.primary.borderHover;
    }
  };
  
  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = colors.primary.bg;
    e.currentTarget.style.borderColor = colors.primary.border;
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      style={{
        border: `1px solid ${colors.primary.border}`,
        backgroundColor: colors.primary.bg,
        color: colors.primary.text,
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
