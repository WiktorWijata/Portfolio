import { useState, Children, isValidElement, cloneElement } from 'react';
import type { ReactElement } from 'react';
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
      {showDots && itemCount > 1 && (
        <div className="flex justify-center items-center gap-3 mb-8">
          {showNavigation && (
            <IconButton
              onClick={prevItem}
              size={IconButtonSize.SMALL}
            >
              <Icon name={IconName.CHEVRON_LEFT} size={IconSize.SM} />
            </IconButton>
          )}
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
          {showNavigation && (
            <IconButton
              onClick={nextItem}
              size={IconButtonSize.SMALL}
            >
              <Icon name={IconName.CHEVRON_RIGHT} size={IconSize.SM} />
            </IconButton>
          )}
        </div>
      )}

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

    </div>
  );
}
