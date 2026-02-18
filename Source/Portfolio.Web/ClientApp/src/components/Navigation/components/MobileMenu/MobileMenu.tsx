import { useTheme } from '../../../../design-system/themes';
import { Container } from '../../../../design-system/components';
import type { MobileMenuProps } from './MobileMenu.types';

export function MobileMenu({ isOpen, children }: MobileMenuProps) {
  const { currentTheme } = useTheme();

  return (
    <div 
      className="py-6 fixed top-20 inset-x-4 z-[60] transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: currentTheme.colors.neutral.bgDark,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${currentTheme.colors.primary.border}`,
        borderRadius: '12px',
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden'
      }}
    >
      <Container>
        {children}
      </Container>
    </div>
  );
}
