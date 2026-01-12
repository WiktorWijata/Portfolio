import type { ReactNode, CSSProperties } from 'react';
import { colors, radius } from '../tokens';

interface TileProps {
  children?: ReactNode;
  hover?: boolean;
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  style?: CSSProperties;
}

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
      className={`${paddingClass} ${radius.card} backdrop-blur-sm ${hoverClass} ${className}`}
      style={{
        border: `1px solid ${colors.neutral.border}`,
        backgroundColor: colors.neutral.bg,
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
