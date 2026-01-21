import { LinkVariant } from '../../design-system/components';
import { NavBar, NavLinkList, LanguageSwitcher, MobileMenuToggle, MobileMenu } from './components';
import { navLinks } from '../../data/navigation';
import { useNavigation } from './hooks/useNavigation';
import { useResponsive } from './hooks/useResponsive';

export function Navigation() {
  const { isMobileMenuOpen, handleNavClick, toggleMobileMenu } = useNavigation();
  const { isDesktop } = useResponsive();

  return (
    <>
      <NavBar>
      <div className="flex items-center justify-center h-20 relative">
        {isDesktop && (
          <NavLinkList links={navLinks} onLinkClick={handleNavClick} />
        )}

        {!isDesktop && (
          <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        )}
      </div>
    </NavBar>
    
    <div className="fixed top-5 right-6 z-[70]">
      <LanguageSwitcher />
    </div>
    
    <MobileMenu isOpen={isMobileMenuOpen}>
      <NavLinkList 
        links={navLinks} 
        onLinkClick={handleNavClick}
        isVertical
        variant={LinkVariant.TEXT}
        className="py-3 px-2"
      />
    </MobileMenu>
    </>
  );
}