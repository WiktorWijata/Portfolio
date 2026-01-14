import { colors, radius } from '../../tokens';
import type { TileProps } from './Tile.types';

export function Tile({ 
  children, 
  hover = false, 
  className = '', 
  imageUrl,
  imageAlt = '',
  style
}: TileProps) {
  const hoverClass = hover ? 'transition-all duration-300 hover:scale-105' : '';
  const hasChildren = children !== undefined && children !== null;
  const imageOnlyMode = imageUrl && !hasChildren;
  const paddingClass = imageOnlyMode ? '' : 'p-6';
  
  return (
    <div 
      className={`${paddingClass} ${radius.card} ${hoverClass} ${className}`}
      style={{
        border: `1px solid ${colors.neutral.border}`,
        backgroundColor: colors.neutral.bg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        ...style
      }}
    >
      {imageUrl && (
        <div className={imageOnlyMode ? 'overflow-hidden rounded-lg h-full' : '-m-6 mb-4 overflow-hidden rounded-t-lg'}>
          <img 
            src={imageUrl} 
            alt={imageAlt}
            className={imageOnlyMode ? 'w-full h-full object-cover' : 'w-full h-48 object-cover'}
          />
        </div>
      )}
      {children}
    </div>
  );
}
