import { SectionTitle, Tag, Text, TextSize, TextVariant, TextWeight, TextAs } from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { useTheme } from '../design-system/themes';
import { education } from '../data';

function Education() {
  const { currentTheme } = useTheme();
  const { elementRef, className } = useScrollReveal({ delay: 200 });

  return (
    <section id="education" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-0">
        <SectionTitle>Edukacja i certyfikaty</SectionTitle>

        <div className="w-[1406px] mx-auto relative px-0">
          {/* Vertical timeline line */}
          <div
            className="absolute right-0 w-0.5"
            style={{
              top: '-60px',
              height: 'calc(100% + 120px)',
              background: currentTheme.colors.gradient.title,
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
            }}
          ></div>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative pr-12"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -right-3 w-6 h-6 rounded-full border-4"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderColor: currentTheme.colors.primary.borderHover,
                    backgroundColor: currentTheme.colors.neutral.bgDarkest,
                    boxShadow: currentTheme.colors.primary.glow
                  }}
                ></div>
                {/* Content card */}
                <div
                  className="p-6 rounded-lg backdrop-blur-sm transition-all duration-500 relative"
                  style={{
                    border: `1px solid ${currentTheme.colors.neutral.border}`,
                    backgroundColor: currentTheme.colors.neutral.bg,
                    ...fadeInStagger(index, { staggerDelay: 0.2, duration: 0.6 }),
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    transformOrigin: 'right center'
                  }}
                >
                  <Tag variant="date">{edu.period}</Tag>
                  <div className="flex items-center gap-3 mb-1">
                    <Text as={TextAs.H3} size={TextSize.MD} variant={TextVariant.PRIMARY} weight={TextWeight.BOLD}>
                      {edu.degree}
                    </Text>
                  </div>
                  <Text size={TextSize.SM} variant={TextVariant.ACCENT} weight={TextWeight.MEDIUM}>
                    {edu.school}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
