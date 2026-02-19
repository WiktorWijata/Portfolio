import { Text, TextVariant, TextSize, Container, Select, Label, DropdownPosition, IconName } from '../../design-system/components';
import type { IconNameType } from '../../design-system/components';
import { FooterSocialLinks } from './components';
import { useTheme } from '../../design-system/themes';
import { useTranslation } from 'react-i18next';
import { useContent } from '../../api/useContent';
import type { ContactDto } from '../../api/models';
import type { SocialLink } from './components/FooterSocialLinks/FooterSocialLinks.types';

const CONTACT_TYPE_TO_ICON: Record<string, IconNameType> = {
  github: IconName.GITHUB,
  linkedin: IconName.LINKEDIN,
  email: IconName.EMAIL,
};

function contactToSocialLink(contact: ContactDto): SocialLink | null {
  const icon = CONTACT_TYPE_TO_ICON[contact.type?.toLowerCase() ?? ''];
  if (!icon || !contact.value || !contact.title) return null;
  return { name: contact.title, url: contact.value, icon };
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const { t } = useTranslation();
  const { content } = useContent();

  const themeOptions = availableThemes.map(theme => ({
    value: theme.id,
    label: t(`themes.${theme.id}`)
  }));

  return (
    <footer className="py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Label htmlFor="theme-select" className="!mb-0 whitespace-nowrap">{t('footer.themeLabel')}</Label>
              <Select 
                value={currentTheme.id} 
                onChange={setTheme} 
                options={themeOptions}
                dropdownPosition={DropdownPosition.UP}
                className="!py-1.5 !px-3 text-sm"
              />
            </div>
            
            <div className="text-center md:text-left">
              <Text variant={TextVariant.MUTED} size={TextSize.SM}>
                &copy; {currentYear} {t('footer.copyright')}
              </Text>
            </div>
          </div>

          <FooterSocialLinks links={(content?.contact ?? []).map(contactToSocialLink).filter(Boolean) as SocialLink[]} />
        </div>

        <div className="text-center md:text-left mt-6">
          <Text variant={TextVariant.MUTED} size={TextSize.XS}>
            {t('footer.techStack')}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
