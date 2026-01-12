import type { ReactNode, MouseEvent } from 'react';
import { colors, radius } from '../tokens';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  target?: string;
  rel?: string;
}

export function IconButton({ 
  children, 
  onClick,
  href,
  size = 'small',
  className = '',
  target,
  rel
}: IconButtonProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };
  
  const baseClasses = `${sizeClasses[size]} flex items-center justify-center ${radius.button} backdrop-blur-sm transition-all duration-300 hover:scale-110`;
  
  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = colors.primary.bgHover;
    e.currentTarget.style.borderColor = colors.primary.borderHover;
  };
  
  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = colors.primary.bg;
    e.currentTarget.style.borderColor = colors.primary.border;
  };
  
  const style = {
    border: `1px solid ${colors.primary.border}`,
    backgroundColor: colors.primary.bg,
    color: colors.primary.text
  };
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${className}`}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
