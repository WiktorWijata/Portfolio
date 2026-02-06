import { useTheme } from '../../../../design-system/themes';
import { Container } from '../../../../design-system/components';
import type { NavBarProps } from './NavBar.types';

export function NavBar({ children }: NavBarProps) {
  const { currentTheme } = useTheme();

  return (
    <nav 
      className="fixed top-0 inset-x-0 z-50"
      style={{ 
        borderBottom: `1px solid ${currentTheme.colors.neutral.border}`,
        backgroundColor: currentTheme.colors.neutral.bg,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        boxShadow: currentTheme.colors.shadow.tile
      }}
    >
      <Container className="!px-6">
        {children}
      </Container>
    </nav>
  );
}
