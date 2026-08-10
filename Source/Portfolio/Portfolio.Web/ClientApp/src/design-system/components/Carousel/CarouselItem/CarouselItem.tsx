import type { CarouselItemProps } from './CarouselItem.types';

export function CarouselItem({ children, padding = 'px-20' }: CarouselItemProps) {
  return (
    <div className={`w-full flex-shrink-0 h-full ${padding}`}>
      {children}
    </div>
  );
}
