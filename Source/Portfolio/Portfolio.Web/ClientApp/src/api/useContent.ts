import { useTranslation } from 'react-i18next';
import { useGetApiContentReadContent } from './generated/content';
import { mockContentPL, mockContentEN } from './mocks/mockData';

/**
 * Custom hook for fetching content based on current language.
 * Wraps the generated useGetApiContentReadContent hook with i18n integration.
 *
 * Mock data is used ONLY when explicitly enabled via VITE_USE_MOCK=true.
 * When the real API is in use, a failed/errored request is surfaced through
 * `error` instead of being silently masked by mock data — falling back to
 * mocks on a real failure would make a broken API look like a working one.
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

  if (useMock) {
    const mockData = i18n.language === 'en' ? mockContentEN : mockContentPL;
    return {
      content: mockData,
      isLoading: false,
      error: null,
    };
  }

  return {
    content: data?.data,
    isLoading,
    error: error?.message || null,
  };
}
