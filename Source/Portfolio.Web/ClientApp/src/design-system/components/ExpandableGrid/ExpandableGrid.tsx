import { useEffect, useRef, useState } from 'react';
import type { ExpandableGridProps } from './ExpandableGrid.types';

export function ExpandableGrid<T>({ 
  items, 
  columns,
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  isExpanded,
  renderItem,
  className = '',
  duration = 0.7
}: ExpandableGridProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [firstRowHeight, setFirstRowHeight] = useState<number | null>(null);
  
  useEffect(() => {
    if (!gridRef.current) return;
    
    const measureFirstRow = () => {
      const grid = gridRef.current;
      if (!grid) return;
      
      const children = Array.from(grid.children) as HTMLElement[];
      if (children.length === 0) return;
      
      const firstChild = children[0];
      const firstChildTop = firstChild.offsetTop;
      
      let maxHeight = 0;
      for (const child of children) {
        if (child.offsetTop === firstChildTop) {
          maxHeight = Math.max(maxHeight, child.offsetHeight);
        } else {
          break;
        }
      }
      
      setFirstRowHeight(maxHeight + 10);
    };
    
    const timer = setTimeout(measureFirstRow, 100);
    
    window.addEventListener('resize', measureFirstRow);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureFirstRow);
    };
  }, [items]);
  
  const gapClass = `gap-${gap.mobile} md:gap-${gap.tablet} lg:gap-${gap.desktop}`;
  const columnsClass = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
  
  const visibleCount = columns.desktop;
  
  return (
    <div 
      style={{
        maxHeight: isExpanded ? '10000px' : firstRowHeight ? `${firstRowHeight}px` : 'auto',
        overflow: 'hidden',
        transition: `max-height ${duration}s ease-in-out`
      }}
      className={className}
    >
      <div 
        ref={gridRef}
        className={`grid ${columnsClass} ${gapClass} py-1.5`}
      >
        {items.map((item, index) => renderItem(item, index, index < visibleCount || isExpanded))}
      </div>
    </div>
  );
}
