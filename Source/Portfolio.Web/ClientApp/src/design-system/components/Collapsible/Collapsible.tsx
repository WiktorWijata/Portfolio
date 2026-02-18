import type { CollapsibleProps } from './Collapsible.types';

export function Collapsible({ 
  isOpen, 
  children, 
  maxHeight = '500px',
  minHeight = '0',
  duration = 0.5,
  className = '' 
}: CollapsibleProps) {
  return (
    <div 
      className={className}
      style={{
        maxHeight: isOpen ? maxHeight : minHeight,
        overflow: 'hidden',
        transition: `max-height ${duration}s ease-in-out`,
        marginBottom: isOpen ? '16px' : '0'
      }}
    >
      {children}
    </div>
  );
}
