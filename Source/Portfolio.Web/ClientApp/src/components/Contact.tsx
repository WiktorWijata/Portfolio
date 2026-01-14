import { useState } from 'react';
import type { FormEvent } from 'react';
import { SectionTitle, Tile, IconButton, Input, Textarea, Button, Icon, IconName, IconSize } from '../design-system/components';
import { useScrollReveal } from '../design-system/hooks';
import { useTheme } from '../design-system/themes';
import { IconButtonSize } from '../design-system/components/IconButton/IconButton.consts';

function Contact() {
  const { currentTheme } = useTheme();
  const { elementRef, className } = useScrollReveal({ delay: 300 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Tutaj możesz dodać integrację z backendem
    // Na razie symulujemy wysyłanie
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <SectionTitle>Kontakt</SectionTitle>
        <div className="w-[1406px] mx-auto">
          {/* Contact Info */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-200 mb-4">
                Skontaktuj się ze mną
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!
              </p>
            </div>

            <div className="flex justify-between gap-8">
              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.GITHUB} size={IconSize.LG} />
                </IconButton>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">GitHub</div>
                  <a 
                    href="https://github.com/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    github.com/twoj-profil
                  </a>
                </div>
              </Tile>

              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.LINKEDIN} size={IconSize.LG} />
                </IconButton>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">LinkedIn</div>
                  <a 
                    href="https://linkedin.com/in/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    /in/twoj-profil
                  </a>
                </div>
              </Tile>

              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.EMAIL} size={IconSize.LG} />
                </IconButton>
                <div>
                  <div className="font-semibold text-gray-300 text-lg mb-1">Email</div>
                  <a 
                    href="mailto:twoj@email.com" 
                    className="text-gray-400 hover:text-purple-300 transition-colors text-base"
                  >
                    twoj@email.com
                  </a>
                </div>
              </Tile>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="rounded-lg p-8 backdrop-blur-sm overflow-visible"
            style={{
              border: `1px solid ${currentTheme.colors.neutral.border}`,
              backgroundColor: currentTheme.colors.neutral.bg
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Imię"
                placeholder="Jan Kowalski"
                required
              />

              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                placeholder="jan@example.com"
                required
              />

              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                label="Wiadomość"
                placeholder="Twoja wiadomość..."
                rows={5}
                required
              />

              <Button
                type="submit"
                disabled={status === 'sending'}
                className="w-full"
              >
                {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </Button>

              {status === 'success' && (
                <div className="text-green-400 text-center font-semibold">
                  ✓ Wiadomość wysłana pomyślnie!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
