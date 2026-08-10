import { Radius } from '../../tokens';
import type { IconButtonProps } from './IconButton.types';
import { useButton } from '../../hooks';
import { iconButtonSizeClasses, IconButtonSize } from './IconButton.consts';

export function IconButton({ 
  children, 
  onClick,
  href,
  size = IconButtonSize.SMALL,
  className = '',
  target,
  rel,
  disabled = false
}: IconButtonProps) {
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
    className: `${iconButtonSizeClasses[size]} flex items-center justify-center ${buttonRadius} backdrop-blur-sm transition-all duration-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`,
    onClick,
  });
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={computedClassName}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={computedClassName}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
