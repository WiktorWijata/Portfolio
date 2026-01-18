import { useState } from 'react';
import { SectionTitle, Container } from '../../design-system/components';
import { useScrollReveal } from '../../design-system/hooks';
import { experiences } from '../../data';
import { ExperienceList } from './components';

function Experience() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="experience" ref={elementRef} className={`py-20 ${className}`}>
      <Container>
        <SectionTitle>Doświadczenie</SectionTitle>
        
        <ExperienceList
          experiences={experiences}
          expandedCards={expandedCards}
          onToggleCard={toggleCard}
        />
      </Container>
    </section>
  );
}

export default Experience;
