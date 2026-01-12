import { useState } from 'react';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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

          {/* Language Switcher - dropdown menu */}
          <div className="hidden md:block fixed top-5 right-6 z-50">
            <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: '1px solid rgba(168, 85, 247, 0.4)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                color: '#e9d5ff',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {language === 'pl' ? 'PL' : 'EN'}
              <svg className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {isLanguageMenuOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-32 rounded backdrop-blur-md overflow-hidden"
                style={{ 
                  border: '1px solid rgba(255, 248, 231, 0.15)',
                  backgroundColor: 'rgba(26, 10, 46, 0.9)'
                }}
              >
                <button
                  onClick={() => {
                    setLanguage('pl');
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-all ${
                    language === 'pl' ? 'text-gray-300' : 'text-gray-400 hover:text-gray-300'
                  }`}
                  style={language === 'pl' ? { 
                    backgroundColor: 'rgba(255, 248, 231, 0.08)',
                    border: '1px solid rgba(255, 248, 231, 0.2)'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (language !== 'pl') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 248, 231, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'pl') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  Polski
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-all ${
                    language === 'en' ? 'text-gray-300' : 'text-gray-400 hover:text-gray-300'
                  }`}
                  style={language === 'en' ? { 
                    backgroundColor: 'rgba(255, 248, 231, 0.08)',
                    border: '1px solid rgba(255, 248, 231, 0.2)'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (language !== 'en') {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 248, 231, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== 'en') {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  English
                </button>
              </div>
            )}
            </div>
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
