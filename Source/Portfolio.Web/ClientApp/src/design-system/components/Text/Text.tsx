import { useState } from 'react';
import { useTheme } from '../../themes';
import type { TextProps } from './Text.types';
import { 
  TextSize, 
  TextVariant, 
  TextWeight, 
  TextAlign,
  TextAs,
  textSizeClasses, 
  textWeightClasses, 
  textAlignClasses,
  getTextVariantColor
} from './Text.consts';

export function Text({
  children,
  size = TextSize.SM,
  variant = TextVariant.PRIMARY,
  weight = TextWeight.NORMAL,
  align = TextAlign.LEFT,
  as = TextAs.P,
  className = '',
  hover = false,
}: TextProps) {
  const { currentTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getColor = () => {
    if (hover && isHovered) {
      return currentTheme.colors.text.secondary;
    }
    return getTextVariantColor(variant, currentTheme);
  };

  const classes = [
    textSizeClasses[size],
    textWeightClasses[weight],
    textAlignClasses[align],
    hover ? 'transition-colors cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    color: getColor(),
  };

  const Component = as as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classes}
      style={style}
      onMouseEnter={hover ? () => setIsHovered(true) : undefined}
      onMouseLeave={hover ? () => setIsHovered(false) : undefined}
    >
      {children}
    </Component>
  );
}
