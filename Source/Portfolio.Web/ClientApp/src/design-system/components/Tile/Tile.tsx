import { Radius } from '../../tokens';
import { useTheme } from '../../themes';
import type { TileProps } from './Tile.types';

export function Tile({ 
  children, 
  className = '', 
  style
}: TileProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className={`${Radius.CARD} ${className}`}
      style={{
        border: `1px solid ${currentTheme.colors.neutral.border}`,
        backgroundColor: currentTheme.colors.neutral.bg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        ...style
      }}
    >
      {children}
    </div>
  );
}
