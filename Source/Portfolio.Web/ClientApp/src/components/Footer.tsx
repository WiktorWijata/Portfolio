import { Icon, IconName, IconSize } from '../design-system/components';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-gray-400 text-center md:text-left">
            <p>&copy; {currentYear} Backend Developer Portfolio. Wszystkie prawa zastrzeżone.</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/twoj-profil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#9ca3af] transition-colors"
              aria-label="GitHub"
            >
              <Icon name={IconName.GITHUB} size={IconSize.MD} />
            </a>

            <a
              href="https://linkedin.com/in/twoj-profil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#9ca3af] transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name={IconName.LINKEDIN} size={IconSize.MD} />
            </a>

            <a
              href="mailto:twoj@email.com"
              className="text-gray-400 hover:text-[#9ca3af] transition-colors"
              aria-label="Email"
            >
              <Icon name={IconName.EMAIL} size={IconSize.MD} />
            </a>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Zbudowane z React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
