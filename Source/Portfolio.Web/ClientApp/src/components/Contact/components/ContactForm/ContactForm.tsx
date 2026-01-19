import { useState } from 'react';
import type { FormEvent } from 'react';
import { Tile, Input, Textarea, Button } from '../../../../design-system/components';
import type { ContactFormProps, ContactFormData } from './ContactForm.types';

export function ContactForm({ onSubmit, isSubmitting = false }: ContactFormProps) {
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
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </Button>
      </form>
    </Tile>
  );
}
