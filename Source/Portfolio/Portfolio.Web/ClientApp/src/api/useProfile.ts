import { Language, usePreferences } from '@/context'
import {
  getGetProfileAspirationsQueryKey,
  getGetProfileBusinessQueryKey,
  getGetProfileCertificatesQueryKey,
  getGetProfileContactsQueryKey,
  getGetProfileExperiencesQueryKey,
  getGetProfileIntroductionQueryKey,
  getGetProfileProjectsQueryKey,
  getGetProfileServicesQueryKey,
  getGetProfileSkillsQueryKey,
  getGetProfileSpecializationsQueryKey,
  useGetProfileAspirations,
  useGetProfileBusiness,
  useGetProfileCertificates,
  useGetProfileContacts,
  useGetProfileExperiences,
  useGetProfileIntroduction,
  useGetProfileProjects,
  useGetProfileServices,
  useGetProfileSkills,
  useGetProfileSpecializations,
} from './generated/profile'
import {
  mockAspirationsEn,
  mockAspirationsPl,
  mockBusiness,
  mockCertificates,
  mockContacts,
  mockExperiencesEn,
  mockExperiencesPl,
  mockIntroductionEn,
  mockIntroductionPl,
  mockProjectsEn,
  mockProjectsPl,
  mockServicesEn,
  mockServicesPl,
  mockSkillCategoriesEn,
  mockSkillCategoriesPl,
  mockSpecializationsEn,
  mockSpecializationsPl,
} from './mocks/mockData'

/**
 * Mock data is used ONLY when explicitly enabled via VITE_USE_MOCK=true, so the frontend
 * can be developed without a backend. When the real API is in use, a failed request is
 * surfaced through `error` instead of being silently masked by mock data.
 */
const useMock = import.meta.env.VITE_USE_MOCK === 'true'

const QUERY_OPTIONS = { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false }

export function useIntroduction() {
  const { language } = usePreferences()
  const query = useGetProfileIntroduction({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileIntroductionQueryKey(), language] },
  })

  if (useMock) {
    return { data: language === Language.En ? mockIntroductionEn : mockIntroductionPl, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useServices() {
  const { language } = usePreferences()
  const query = useGetProfileServices({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileServicesQueryKey(), language] },
  })

  if (useMock) {
    return { data: language === Language.En ? mockServicesEn : mockServicesPl, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useSpecializations() {
  const { language } = usePreferences()
  const query = useGetProfileSpecializations({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileSpecializationsQueryKey(), language] },
  })

  if (useMock) {
    return {
      data: language === Language.En ? mockSpecializationsEn : mockSpecializationsPl,
      isLoading: false,
      error: null,
    }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useAspirations() {
  const { language } = usePreferences()
  const query = useGetProfileAspirations({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileAspirationsQueryKey(), language] },
  })

  if (useMock) {
    return { data: language === Language.En ? mockAspirationsEn : mockAspirationsPl, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useSkillCategories() {
  const { language } = usePreferences()
  const query = useGetProfileSkills({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileSkillsQueryKey(), language] },
  })

  if (useMock) {
    return {
      data: language === Language.En ? mockSkillCategoriesEn : mockSkillCategoriesPl,
      isLoading: false,
      error: null,
    }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useExperiences() {
  const { language } = usePreferences()
  const query = useGetProfileExperiences({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileExperiencesQueryKey(), language] },
  })

  if (useMock) {
    return { data: language === Language.En ? mockExperiencesEn : mockExperiencesPl, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

// Certificates, projects (URLs aside), contacts and business have no Translation
// table, but Projects does carry translated fields, so it still varies by language.

export function useCertificates() {
  const query = useGetProfileCertificates({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: getGetProfileCertificatesQueryKey() },
  })

  if (useMock) {
    return { data: mockCertificates, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useProjects() {
  const { language } = usePreferences()
  const query = useGetProfileProjects({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: [...getGetProfileProjectsQueryKey(), language] },
  })

  if (useMock) {
    return { data: language === Language.En ? mockProjectsEn : mockProjectsPl, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useContacts() {
  const query = useGetProfileContacts({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: getGetProfileContactsQueryKey() },
  })

  if (useMock) {
    return { data: mockContacts, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}

export function useBusiness() {
  const query = useGetProfileBusiness({
    query: { ...QUERY_OPTIONS, enabled: !useMock, queryKey: getGetProfileBusinessQueryKey() },
  })

  if (useMock) {
    return { data: mockBusiness, isLoading: false, error: null }
  }
  return { data: query.data?.data, isLoading: query.isLoading, error: query.error }
}
