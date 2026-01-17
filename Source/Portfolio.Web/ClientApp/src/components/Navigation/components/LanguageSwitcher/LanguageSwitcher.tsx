import { useState } from 'react';
import { Select, Icon, IconName, IconSize } from '../../../../design-system/components';
import { languageOptions } from '../../../../data/navigation';

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');

  return (
    <Select
      options={languageOptions}
      value={language}
      onChange={setLanguage}
      icon={<Icon name={IconName.LANGUAGE} size={IconSize.SM} />}
    />
  );
}
