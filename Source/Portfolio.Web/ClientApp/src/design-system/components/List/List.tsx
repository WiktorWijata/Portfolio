import { Text, TextSize, TextVariant } from '../Text';
import type { ListProps } from './List.types';

export function List({ 
  items,
  bullet = '▹',
  bulletVariant = TextVariant.ACCENT,
  contentVariant = TextVariant.SECONDARY,
  size = TextSize.XS,
  spacing = 'space-y-2',
  className = ''
}: ListProps) {
  return (
    <ul className={`${spacing} ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          {typeof bullet === 'string' ? (
            <Text 
              variant={bulletVariant} 
              size={size} 
              className="mr-2 mt-1"
            >
              {bullet}
            </Text>
          ) : (
            <span className="mr-2 mt-1">{bullet}</span>
          )}
          <Text 
            variant={contentVariant} 
            size={size}
          >
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}
