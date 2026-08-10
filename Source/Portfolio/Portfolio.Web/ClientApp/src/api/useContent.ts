import { useTranslation } from 'react-i18next';
import { useGetApiContentReadContent } from './generated/content';
import { mockContentPL, mockContentEN } from './mocks/mockData';

/**
 * Custom hook for fetching content based on current language.
 * Wraps the generated useGetApiContentReadContent hook with i18n integration.
 * Falls back to mock data if API is not available.
 */
export function useContent() {
  const { i18n } = useTranslation();
  
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';
  
  const { data, isLoading, error } = useGetApiContentReadContent(
    { languageCode: i18n.language },
    {
      query: {
        enabled: !useMock, // Disable API calls when using mocks
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      }
    }
  );

  // Fallback to mock data if API fails or is disabled
  const mockData = i18n.language === 'en' ? mockContentEN : mockContentPL;
  const content = data?.data || mockData;

  return {
    content,
    isLoading: useMock ? false : isLoading, // Don't show loading state when using mocks
    error: error?.message || null,
  };
}
