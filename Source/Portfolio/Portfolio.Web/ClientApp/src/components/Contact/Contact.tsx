import { useState } from 'react';
import { isAxiosError } from 'axios';
import { SectionTitle, Container, ToastVariant } from '../../design-system/components';
import { useToast } from '../../design-system/hooks';
import { useContent, usePostApiNotificationSend } from '../../api';
import type { NotificationRequest } from '../../api';
import { ContactInfo, ContactForm } from './components';
import type { ContactFormData } from './components/ContactForm/ContactForm.types';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { content } = useContent();
  const { t } = useTranslation();
  const { showToast, ToastComponent } = useToast();
  const [formResetKey, setFormResetKey] = useState(0);
  const notificationMutation = usePostApiNotificationSend();

  const handleFormSubmit = (data: ContactFormData) => {
    const payload: NotificationRequest = {
      name: data.name,
      sender: data.email,
      message: data.message,
    };

    notificationMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          showToast(t('form.successMessage'), ToastVariant.SUCCESS);
          setFormResetKey((key) => key + 1);
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 429) {
            showToast(t('form.rateLimitedMessage'), ToastVariant.INFO);
            setFormResetKey((key) => key + 1);
          } else {
            showToast(t('form.errorMessage'), ToastVariant.ERROR);
          }
        },
      }
    );
  };

  return (
    <>
      <ToastComponent />
      <section id="contact" className="py-20">
        <Container>
          <SectionTitle>{t('navigation.contact')}</SectionTitle>
          <div className="w-full max-w-[1406px] mx-auto">
            <ContactInfo 
              header={t('contact.header')}
              description={t('contact.description')}
              contacts={content?.contacts || []}
            />
            
            <ContactForm 
              key={formResetKey}
              onSubmit={handleFormSubmit}
              isSubmitting={notificationMutation.isPending}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

export default Contact;
