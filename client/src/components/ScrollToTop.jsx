import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // If locomotive scroll exists, reset it too
    if (window.locomotiveScroll) {
      window.locomotiveScroll.scrollTo(0, { 
        duration: 0, 
        disableLerp: true 
      });
      // Update locomotive scroll after a short delay
      setTimeout(() => {
        if (window.locomotiveScroll) {
          window.locomotiveScroll.update();
        }
      }, 100);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
