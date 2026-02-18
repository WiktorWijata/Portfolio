import { useState } from 'react';
import type { FormEvent } from 'react';
import { Tile, Input, Textarea, Button } from '../../../../design-system/components';
import type { ContactFormProps, ContactFormData } from './ContactForm.types';
import { useTranslation } from 'react-i18next';

export function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Tile className="p-4 md:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label={t('form.nameLabel')}
          placeholder={t('form.namePlaceholder')}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label={t('form.emailLabel')}
          placeholder={t('form.emailPlaceholder')}
          required
        />

        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          label={t('form.messageLabel')}
          placeholder={t('form.messagePlaceholder')}
          rows={5}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? t('form.sending') : t('form.send')}
        </Button>
      </form>
    </Tile>
  );
}
