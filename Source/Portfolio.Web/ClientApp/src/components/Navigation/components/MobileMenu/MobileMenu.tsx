import { useTheme } from '../../../../design-system/themes';
import type { MobileMenuProps } from './MobileMenu.types';

export function MobileMenu({ isOpen, children }: MobileMenuProps) {
  const { currentTheme } = useTheme();

  return (
    <div 
      className="py-6 mx-4 fixed top-20 left-0 right-0 z-[60] transition-all duration-300"
      style={{
        backgroundColor: currentTheme.colors.neutral.bgDark,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${currentTheme.colors.primary.border}`,
        borderRadius: '12px',
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        visibility: isOpen ? 'visible' : 'hidden'
      }}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </div>
  );
}
