import { Icon, IconName, IconSize, Select } from '../../../../design-system/components';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from './LanguageSwitcher.consts';

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
