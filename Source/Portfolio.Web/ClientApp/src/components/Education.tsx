import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { colors } from '../design-system/tokens';
import { education } from '../data';

function Education() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });

  return (
    <section id="education" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span 
            style={{
              background: 'linear-gradient(to right, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Edukacja i certyfikaty
          </span>
        </h2>

        <div className="w-[1406px] mx-auto relative px-0">
          {/* Vertical timeline line */}
          <div
            className="absolute right-0 w-0.5"
            style={{
              top: '-60px',
              height: 'calc(100% + 120px)',
              background: 'linear-gradient(to bottom, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
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
                    borderColor: '#a855f7',
                    backgroundColor: '#1a0a2e',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                  }}
                ></div>
                {/* Content card */}
                <div
                  className="p-6 rounded-lg backdrop-blur-sm transition-all duration-500 relative"
                  style={{
                    border: `1px solid ${colors.neutral.border}`,
                    backgroundColor: colors.neutral.bg,
                    ...fadeInStagger(index, { staggerDelay: 0.2, duration: 0.6 }),
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    transformOrigin: 'right center'
                  }}
                >
                  <span
                    className="absolute top-4 right-4 text-gray-300 text-sm font-semibold px-2 py-1 rounded backdrop-blur-sm"
                    style={{
                      border: `1px solid ${colors.neutral.border}`,
                      backgroundColor: colors.neutral.bg
                    }}
                  >
                    {edu.period}
                  </span>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-200">{edu.degree}</h3>
                  </div>
                  <p className="text-base text-purple-400 font-medium">{edu.school}</p>
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
