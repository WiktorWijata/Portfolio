import { Icon, IconName, IconSize, Select } from '../../../../design-system/components';
import { useTranslation } from 'react-i18next';

const AVAILABLE_LANGUAGES = [
  { code: 'pl', nativeName: 'Polski', shortLabel: 'PL' },
  { code: 'en', nativeName: 'English', shortLabel: 'EN' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      options={AVAILABLE_LANGUAGES.map(lang => ({
        value: lang.code,
        label: lang.nativeName,
        shortLabel: lang.shortLabel
      }))}
      value={i18n.language}
      onChange={handleLanguageChange}
      icon={<Icon name={IconName.LANGUAGE} size={IconSize.SM} />}
    />
  );
}
