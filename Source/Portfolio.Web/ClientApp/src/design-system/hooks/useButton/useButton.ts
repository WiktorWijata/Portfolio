import { useMemo } from 'react';
import type { MouseEvent } from 'react';
import type { UseButtonOptions } from './useButton.types';
import { useTheme } from '../../themes';

export function useButton({ disabled, loading, className, onClick }: UseButtonOptions) {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  // Bazowe klasy dla przycisku
  const baseClass = 'inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none';

  // Stan disabled/loading
  const isDisabled = disabled || loading;

  // Łączenie klas
  const computedClassName = useMemo(() => {
    let classes = baseClass;
    if (isDisabled) classes += ' opacity-50 cursor-not-allowed';
    if (className) classes += ` ${className}`;
    return classes;
  }, [isDisabled, className]);

  // Obsługa kliknięcia
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  }

  // Obsługa stylów hover/focus
  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (!isDisabled) {
      e.currentTarget.style.backgroundColor = colors.primary.bgHover;
      e.currentTarget.style.borderColor = colors.primary.borderHover;
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = colors.primary.bg;
    e.currentTarget.style.borderColor = colors.primary.border;
  };

  const style = {
    border: `1px solid ${colors.primary.border}`,
    backgroundColor: colors.primary.bg,
    color: colors.primary.text,
  };

  return {
    computedClassName,
    isDisabled,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    style,
  };
}
