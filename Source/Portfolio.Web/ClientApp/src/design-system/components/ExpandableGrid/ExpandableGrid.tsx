import { useEffect, useRef, useState } from 'react';
import type { ExpandableGridProps } from './ExpandableGrid.types';

export function ExpandableGrid<T>({
  items,
  columns,
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  isExpanded,
  visibleCount,
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
  
  const gridClassName = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 py-1.5`;
  
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
        className={gridClassName}
      >
        {items.map((item, index) => {
          const isVisible = isExpanded || !visibleCount || index < visibleCount;
          return renderItem(item, index, isVisible);
        })}
      </div>
    </div>
  );
}
