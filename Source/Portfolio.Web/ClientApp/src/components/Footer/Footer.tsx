import { Text, TextVariant, TextSize, Container, Select, Label, DropdownPosition } from '../../design-system/components';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { FooterSocialLinks } from './components';
import { FooterText } from './Footer.consts';
import { useTheme } from '../../design-system/themes';

function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentTheme, availableThemes, setTheme } = useTheme();

  const themeOptions = availableThemes.map(theme => ({
    value: theme.id,
    label: theme.name
  }));

  return (
    <footer className="py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Label htmlFor="theme-select" className="!mb-0 whitespace-nowrap">Motyw:</Label>
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
                &copy; {currentYear} {FooterText.COPYRIGHT}
              </Text>
            </div>
          </div>

          <FooterSocialLinks links={SOCIAL_LINKS} />
        </div>

        <div className="text-center md:text-left mt-6">
          <Text variant={TextVariant.MUTED} size={TextSize.XS}>
            {FooterText.TECH_STACK}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
