import { useState, useEffect } from 'react';
import { IconButton, Icon, IconName, IconSize } from '../design-system/components';
import { IconButtonSize } from '../design-system/components/IconButton/IconButton.consts';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
    >
      <IconButton
        onClick={scrollToTop}
        size={IconButtonSize.MEDIUM}
        className="shadow-lg"
      >
        <Icon name={IconName.CHEVRON_UP} size={IconSize.MD} />
      </IconButton>
    </div>
  );
}

export default ScrollToTop;
