import { useEffect } from 'react';
import { useTheme } from '../design-system/themes';
import faviconSvgRaw from '../assets/favicon.svg?raw';

export function useFavicon() {
  const { currentTheme } = useTheme();

  useEffect(() => {
    const color = currentTheme.colors.primary.borderHover;
    const svg = faviconSvgRaw.replaceAll('{{color}}', color);
    const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = encoded;
  }, [currentTheme]);
}
