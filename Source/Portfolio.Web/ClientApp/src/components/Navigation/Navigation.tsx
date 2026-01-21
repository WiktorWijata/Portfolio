import { LinkVariant } from '../../design-system/components';
import { NavBar, NavLinkList, LanguageSwitcher, MobileMenuToggle, MobileMenu } from './components';
import { useNavigation } from './hooks/useNavigation';
import { useResponsive } from './hooks/useResponsive';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { isMobileMenuOpen, handleNavClick, toggleMobileMenu } = useNavigation();
  const { isDesktop } = useResponsive();
  const { t } = useTranslation();

  const navLinks = [
    { href: '#home', label: t('navigation.home') },
    { href: '#skills', label: t('navigation.skills') },
    { href: '#projects', label: t('navigation.projects') },
    { href: '#experience', label: t('navigation.experience') },
    { href: '#education', label: t('navigation.education') },
    { href: '#did-you-know', label: t('navigation.didYouKnow') },
    { href: '#contact', label: t('navigation.contact') },
  ];

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