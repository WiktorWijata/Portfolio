import { Icon, IconName, IconSize, Link, LinkVariant, Text, TextVariant, TextSize, Alignment } from '../design-system/components';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <Text variant={TextVariant.MUTED} size={TextSize.SM}>
              &copy; {currentYear} Backend Developer Portfolio. Wszystkie prawa zastrzeżone.
            </Text>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <Link
              href="https://github.com/twoj-profil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              variant={LinkVariant.TEXT}
            >
              <Icon name={IconName.GITHUB} size={IconSize.MD} />
            </Link>

            <Link
              href="https://linkedin.com/in/twoj-profil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              variant={LinkVariant.TEXT}
            >
              <Icon name={IconName.LINKEDIN} size={IconSize.MD} />
            </Link>

            <Link
              href="mailto:twoj@email.com"
              aria-label="Email"
              variant={LinkVariant.TEXT}
            >
              <Icon name={IconName.EMAIL} size={IconSize.MD} />
            </Link>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="text-center mt-6">
          <Text variant={TextVariant.MUTED} size={TextSize.XS} align={Alignment.CENTER}>
            Zbudowane z React, TypeScript & Tailwind CSS
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
