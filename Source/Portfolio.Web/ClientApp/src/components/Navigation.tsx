import { useState } from 'react';
import { Select, Icon, IconName, IconSize, Link, LinkVariant, IconButton } from '../design-system/components';
import type { SelectOption } from '../design-system/components';
import { IconButtonSize } from '../design-system/components/IconButton/IconButton.consts';
import { colors } from '../design-system/tokens';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');

  const languageOptions: SelectOption<'pl' | 'en'>[] = [
    { value: 'pl', label: 'Polski', shortLabel: 'PL' },
    { value: 'en', label: 'English', shortLabel: 'EN' }
  ];

  const navLinks = [
    { href: '#home', label: 'Start' },
    { href: '#skills', label: 'Umiejętności i technologie' },
    { href: '#projects', label: 'Projekty' },
    { href: '#experience', label: 'Doświadczenie' },
    { href: '#education', label: 'Edukacja i certyfikaty' },
    { href: '#didyouknow', label: 'Ciekawostki' },
    { href: '#contact', label: 'Kontakt' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        borderBottom: `1px solid ${colors.neutral.border}`,
        backgroundColor: colors.neutral.bg,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-20 relative">
          {/* Desktop Navigation - wyśrodkowane */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block fixed top-5 right-6 z-50">
            <Select
              options={languageOptions}
              value={language}
              onChange={setLanguage}
              icon={<Icon name={IconName.LANGUAGE} size={IconSize.SM} />}
            />
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            size={IconButtonSize.MEDIUM}
            className="md:hidden"
          >
            <Icon 
              name={isMobileMenuOpen ? IconName.CLOSE : IconName.MENU} 
              size={IconSize.MD}
            />
          </IconButton>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden py-4"
            style={{
              backgroundColor: colors.neutral.bgDarkest,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-2"
                variant={LinkVariant.TEXT}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
