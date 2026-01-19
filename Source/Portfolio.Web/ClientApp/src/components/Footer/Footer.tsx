import { Text, TextVariant, TextSize, Alignment, Container } from '../../design-system/components';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { FooterSocialLinks } from './components';
import { FOOTER_TEXT } from './Footer.consts';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <Text variant={TextVariant.MUTED} size={TextSize.SM}>
              &copy; {currentYear} {FOOTER_TEXT.copyright}
            </Text>
          </div>

          <FooterSocialLinks links={SOCIAL_LINKS} />
        </div>

        <div className="text-center mt-6">
          <Text variant={TextVariant.MUTED} size={TextSize.XS} align={Alignment.CENTER}>
            {FOOTER_TEXT.techStack}
          </Text>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
