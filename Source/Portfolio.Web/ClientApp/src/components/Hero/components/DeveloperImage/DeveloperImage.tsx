import { Tile } from '../../../../design-system/components';
import type { DeveloperImageProps } from './DeveloperImage.types';

export function DeveloperImage({ imageUrl, imageAlt = 'Developer', className = '' }: DeveloperImageProps) {
  return (
    <Tile 
      className={`w-full min-h-[400px] lg:min-h-[550px] flex items-center justify-center overflow-hidden p-0 ${className}`}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
    />
  );
}
