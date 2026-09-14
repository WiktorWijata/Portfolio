import { Tag, TagVariant } from '../Tag';
import type { TagGroupProps } from './TagGroup.types';

export function TagGroup({ 
  items, 
  variant = TagVariant.NEUTRAL,
  spacing = 'gap-2',
  className = '' 
}: TagGroupProps) {
  return (
    <div className={`flex flex-wrap ${spacing} ${className}`}>
      {items.map((item, index) => (
        <Tag key={index} variant={variant}>
          {item}
        </Tag>
      ))}
    </div>
  );
}
