import { useState, useEffect } from 'react';
import { useTheme } from '../../../../design-system/themes';
import type { MobileMenuProps } from './MobileMenu.types';
import { ANIMATION_DURATION } from './MobileMenu.consts';

export function MobileMenu({ isOpen, children }: MobileMenuProps) {
  const { currentTheme } = useTheme();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div 
      className="md:hidden py-6 mx-4 fixed top-20 left-0 right-0 z-[60]"
      style={{
        backgroundColor: currentTheme.colors.neutral.bgDark,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${currentTheme.colors.primary.border}`,
        animation: isClosing ? `slideUp ${ANIMATION_DURATION}ms ease-out` : `slideDown ${ANIMATION_DURATION}ms ease-out`,
        borderRadius: '12px',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)'
      }}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </div>
  );
}
