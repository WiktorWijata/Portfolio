import type { IconProps, IconSizeType } from './Icon.types';
import { IconSize } from './Icon.types';

const sizeClasses: Record<IconSizeType, string> = {
  [IconSize.XS]: 'w-4 h-4',
  [IconSize.SM]: 'w-5 h-5',
  [IconSize.MD]: 'w-6 h-6',
  [IconSize.LG]: 'w-8 h-8',
  [IconSize.XL]: 'w-10 h-10'
};

export function Icon({ name, size = IconSize.MD, color = 'white', className = '' }: IconProps) {
  const sizeClass = sizeClasses[size];
  const combinedClassName = `${sizeClass} ${className}`.trim();

  const iconPath = `/src/assets/icons/${name}.svg`;

  return (
    <div 
      className={combinedClassName}
      style={{ 
        WebkitMaskImage: `url(${iconPath})`,
        maskImage: `url(${iconPath})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        backgroundColor: color
      }}
    />
  );
}
