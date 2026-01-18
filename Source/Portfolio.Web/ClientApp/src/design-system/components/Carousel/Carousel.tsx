import { useState, Children, isValidElement, cloneElement, ReactElement } from 'react';
import type { CarouselProps, CarouselItemProps } from './Carousel.types';
import { IconButton } from '../IconButton/IconButton';
import { Icon } from '../Icon/Icon';
import { IconName, IconSize } from '../Icon/Icon.types';
import { IconButtonSize } from '../IconButton/IconButton.consts';
import { useTheme } from '../../themes';

export function Carousel({ 
  children, 
  padding = 'px-20',
  minHeight = '320px',
  showDots = true, 
  showNavigation = true,
  duration = 500,
  className = ''
}: CarouselProps) {
  const { currentTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = Children.toArray(children);
  const itemCount = items.length;

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const goToItem = (index: number) => {
    setCurrentIndex(index);
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement<CarouselItemProps>(child)) {
      return cloneElement(child as ReactElement<CarouselItemProps>, { padding });
    }
    return child;
  });

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: `${duration}ms`,
            minHeight
          }}
        >
          {childrenWithProps}
        </div>
      </div>

      {showNavigation && itemCount > 1 && (
        <>
          <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2">
            <IconButton
              onClick={prevItem}
              size={IconButtonSize.MEDIUM}
            >
              <Icon name={IconName.CHEVRON_LEFT} size={IconSize.MD} />
            </IconButton>
          </div>

          <div className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2">
            <IconButton
              onClick={nextItem}
              size={IconButtonSize.MEDIUM}
            >
              <Icon name={IconName.CHEVRON_RIGHT} size={IconSize.MD} />
            </IconButton>
          </div>
        </>
      )}

      {showDots && itemCount > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex 
                  ? currentTheme.colors.primary.border
                  : currentTheme.colors.neutral.border,
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
