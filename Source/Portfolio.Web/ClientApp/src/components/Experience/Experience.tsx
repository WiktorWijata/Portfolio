import { useState } from 'react';
import { SectionTitle, Container } from '../../design-system/components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';
import { ExperienceList } from './components';

function Experience() {
  const { content } = useContent();
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!content) {
    return null;
  }

  return (
    <section id="experience" className="py-20">
      <Container>
        <SectionTitle>{t('navigation.experience')}</SectionTitle>
        
        <ExperienceList
          experiences={content.experiences || []}
          expandedCards={expandedCards}
          onToggleCard={toggleCard}
        />
      </Container>
    </section>
  );
}

export default Experience;
