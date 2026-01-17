import { useState } from 'react';
import type { FormEvent } from 'react';
import { SectionTitle, Tile, IconButton, Input, Textarea, Button, Icon, IconName, IconSize, Text, TextSize, TextVariant, TextWeight, TextAs, Alignment, Link, LinkVariant, ToastVariant } from '../design-system/components';
import { useScrollReveal, useToast } from '../design-system/hooks';
import { IconButtonSize } from '../design-system/components/IconButton/IconButton.consts';

function Contact() {
  const { elementRef, className } = useScrollReveal({ delay: 300 });
  const { showToast, ToastComponent } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
      showToast('Wiadomość wysłana pomyślnie!', ToastVariant.SUCCESS);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <ToastComponent />
      <section id="contact" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <SectionTitle>Kontakt</SectionTitle>
        <div className="w-[1406px] mx-auto">
          {/* Contact Info */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <Text 
                as={TextAs.H3} 
                size={TextSize.LG} 
                weight={TextWeight.BOLD} 
                variant={TextVariant.PRIMARY}
                align={Alignment.CENTER}
                className="mb-4"
              >
                Skontaktuj się ze mną
              </Text>
              <Text 
                variant={TextVariant.MUTED}
                align={Alignment.CENTER}
                className="leading-relaxed"
              >
                Szukasz doświadczonego backend developera? Chętnie porozmawiam o Twoim projekcie!
              </Text>
            </div>

            <div className="flex justify-between gap-8">
              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.GITHUB} size={IconSize.LG} />
                </IconButton>
                <div>
                  <Text 
                    size={TextSize.MD} 
                    weight={TextWeight.SEMIBOLD} 
                    variant={TextVariant.PRIMARY}
                    className="mb-1"
                  >
                    GitHub
                  </Text>
                  <Link 
                    href="https://github.com/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={LinkVariant.CONTACT}
                  >
                    github.com/twoj-profil
                  </Link>
                </div>
              </Tile>

              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.LINKEDIN} size={IconSize.LG} />
                </IconButton>
                <div>
                  <Text 
                    size={TextSize.MD} 
                    weight={TextWeight.SEMIBOLD} 
                    variant={TextVariant.PRIMARY}
                    className="mb-1"
                  >
                    LinkedIn
                  </Text>
                  <Link 
                    href="https://linkedin.com/in/twoj-profil" 
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={LinkVariant.CONTACT}
                  >
                    /in/twoj-profil
                  </Link>
                </div>
              </Tile>

              <Tile hover className="flex items-center gap-6 p-6 flex-1">
                <IconButton size={IconButtonSize.LARGE}>
                  <Icon name={IconName.EMAIL} size={IconSize.LG} />
                </IconButton>
                <div>
                  <Text 
                    size={TextSize.MD} 
                    weight={TextWeight.SEMIBOLD} 
                    variant={TextVariant.PRIMARY}
                    className="mb-1"
                  >
                    Email
                  </Text>
                  <Link 
                    href="mailto:twoj@email.com" 
                    variant={LinkVariant.CONTACT}
                  >
                    twoj@email.com
                  </Link>
                </div>
              </Tile>
            </div>
          </div>

          {/* Contact Form */}
          <Tile className="p-8">
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
            </form>
          </Tile>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
