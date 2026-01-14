
import { radius } from '../../tokens';
import type { ButtonProps } from './Button.types';
import { useButton } from '../../hooks'

export function Button({ 
  children, 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  variant = 'primary'
}: ButtonProps) {
  const sizeClasses = variant === 'small' ? 'px-3 py-1.5 text-sm' : 'px-8 py-3';
  const buttonRadius = radius.button;

  const {
    computedClassName,
    isDisabled,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    style,
  } = useButton({
    disabled,
    className: `${buttonRadius} font-medium transition-all duration-300 ${sizeClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`,
    onClick,
  });

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={computedClassName}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
