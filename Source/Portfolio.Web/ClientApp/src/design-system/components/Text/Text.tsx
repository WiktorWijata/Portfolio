import { useState, type JSX } from 'react';
import { useTheme } from '../../themes';
import { Alignment } from '../../tokens';
import type { TextProps } from './Text.types';
import { 
  TextSize, 
  TextVariant, 
  TextWeight,
  TextAs,
  textSizeClasses, 
  textWeightClasses,
  textAlignmentClasses,
  getTextVariantColor
} from './Text.consts';

export function Text({
  children,
  size = TextSize.SM,
  variant = TextVariant.PRIMARY,
  weight = TextWeight.NORMAL,
  align = Alignment.LEFT,
  as = TextAs.P,
  className = '',
  hover = false,
  style: customStyle,
}: TextProps) {
  const { currentTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass = textSizeClasses[size];
  const weightClass = textWeightClasses[weight];
  const alignClass = textAlignmentClasses[align];

  const getColor = () => {
    if (hover && isHovered) {
      return currentTheme.colors.text.secondary;
    }
    return getTextVariantColor(variant, currentTheme);
  };

  const classes = [
    sizeClass,
    weightClass,
    alignClass,
    hover ? 'transition-colors cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    color: getColor(),
    ...customStyle,
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
