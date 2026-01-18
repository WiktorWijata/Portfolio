import { useState } from 'react';
import { SectionTitle, Container, ToastVariant } from '../../design-system/components';
import { useScrollReveal, useToast } from '../../design-system/hooks';
import { ContactInfo, ContactForm } from './components';
import { CONTACT_TEXT, CONTACT_DATA } from './Contact.consts';
import type { ContactFormData } from './components/ContactForm/ContactForm.types';

function Contact() {
  const { elementRef, className } = useScrollReveal({ delay: 300 });
  const { showToast, ToastComponent } = useToast();
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');

  const handleFormSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    console.log('Form data:', data);
    
    setTimeout(() => {
      setStatus('idle');
      showToast('Wiadomość wysłana pomyślnie!', ToastVariant.SUCCESS);
    }, 1000);
  };

  return (
    <>
      <ToastComponent />
      <section id="contact" ref={elementRef} className={`py-20 ${className}`}>
        <Container>
          <SectionTitle>Kontakt</SectionTitle>
          <div className="w-full max-w-[1406px] mx-auto">
            <ContactInfo 
              header={CONTACT_TEXT.header}
              description={CONTACT_TEXT.description}
              cards={CONTACT_DATA}
            />
            
            <ContactForm 
              onSubmit={handleFormSubmit}
              isSubmitting={status === 'sending'}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

export default Contact;
