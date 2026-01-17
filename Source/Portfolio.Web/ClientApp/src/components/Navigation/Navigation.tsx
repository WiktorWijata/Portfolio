import React from 'react';
import { LinkVariant } from '../../design-system/components';
import { NavBar, NavLinkList, LanguageSwitcher, MobileMenuToggle, MobileMenu } from './components';
import { navLinks } from '../../data/navigation';
import { useNavigation } from './hooks/useNavigation';
import { useResponsive } from './hooks/useResponsive';

export function Navigation() {
  const { isMobileMenuOpen, handleNavClick, toggleMobileMenu } = useNavigation();
  const { isMobile } = useResponsive();

  return (
    <React.Fragment>
      <NavBar rightContent={<LanguageSwitcher />}>
      <div className="flex items-center justify-center h-20 relative">
        {!isMobile && (
          <NavLinkList links={navLinks} onLinkClick={handleNavClick} />
        )}

        {isMobile && (
          <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
        )}
      </div>
    </NavBar>
    
    <MobileMenu isOpen={isMobileMenuOpen}>
      <NavLinkList 
        links={navLinks} 
        onLinkClick={handleNavClick}
        isVertical
        variant={LinkVariant.TEXT}
        className="py-3 px-2"
      />
    </MobileMenu>
    </React.Fragment>
  );
};