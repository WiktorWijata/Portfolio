
import { Radius } from '../../tokens';
import type { ButtonProps } from './Button.types';
import { ButtonVariant } from './Button.consts';
import { useButton } from '../../hooks';

export function Button({ 
  children, 
  onClick, 
  disabled = false,
  isActive = false,
  className = '',
  type = 'button',
  variant = ButtonVariant.PRIMARY,
  href,
  download,
}: ButtonProps) {
  const sizeClasses = variant === ButtonVariant.SMALL ? 'px-3 py-1.5 text-sm' : 'px-8 py-3';
  const buttonRadius = Radius.BUTTON;

  const {
    computedClassName,
    isDisabled,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    style,
  } = useButton({
    disabled,
    isActive,
    variant,
    className: `${buttonRadius} font-medium transition-all duration-300 ${sizeClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`,
    onClick,
  });

  if (href) {
    return (
      <a
        href={href}
        download={download}
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
      </a>
    );
  }

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
