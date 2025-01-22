import { useState, useEffect } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll coordinate to 0
  // Behavior set to 'smooth' for smooth scrolling
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && 
        <div 
          onClick={scrollToTop}
          className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
        >
          ↑
        </div>
      }
    </>
  );
}

export default ScrollToTop; 