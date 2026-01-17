import { useTheme } from '../../../../design-system/themes';
import type { NavBarProps } from './NavBar.types';

export function NavBar({ children }: NavBarProps) {
  const { currentTheme } = useTheme();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        borderBottom: `1px solid ${currentTheme.colors.neutral.border}`,
        backgroundColor: currentTheme.colors.neutral.bg,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </nav>
  );
}
