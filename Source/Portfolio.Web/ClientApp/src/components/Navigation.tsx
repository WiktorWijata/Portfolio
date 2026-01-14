import { useState } from 'react';
import { Select, Icon, IconName, IconSize } from '../design-system/components';
import type { SelectOption } from '../design-system/components';

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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300"
      style={{ 
        borderBottom: '1px solid rgba(255, 248, 231, 0.15)',
        backgroundColor: 'rgba(255, 248, 231, 0.03)'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-20 relative">
          {/* Desktop Navigation - wyśrodkowane */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-400 hover:text-gray-300 transition-colors font-medium"
              >
                {link.label}
              </a>
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-black/95 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-2 text-gray-300 hover:text-[#9ca3af] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
