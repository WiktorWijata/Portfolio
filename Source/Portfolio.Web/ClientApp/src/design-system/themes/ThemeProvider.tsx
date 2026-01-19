import { useState, createElement, type ReactNode } from 'react';
import { themes, defaultTheme } from './themes/themes';
import { CosmosVariant } from './themes/cosmos';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<string>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return (savedTheme && themes[savedTheme]) ? savedTheme : defaultTheme.id;
  });
  
  const currentTheme = themes[themeId] || defaultTheme;

  const setTheme = (newThemeId: string) => {
    if (themes[newThemeId]) {
      setThemeId(newThemeId);
      localStorage.setItem('portfolio-theme', newThemeId);
    }
  };

  const BackgroundComponent = currentTheme.background;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        availableThemes: Object.values(themes),
      }}
    >
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0015, #1a0a2e, #000000)' }}>
        {/* Dynamic background from current theme */}
        {createElement(BackgroundComponent, { variant: CosmosVariant.STARS_WITH_COMETS })}
        
        {/* App content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
