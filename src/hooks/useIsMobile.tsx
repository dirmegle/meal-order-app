import { useEffect, useState } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleTabsResize = () => {
      const breakpoint = window.innerWidth;
      if (breakpoint < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleTabsResize();

    window.addEventListener('resize', handleTabsResize);

    return () => {
      window.removeEventListener('resize', handleTabsResize);
    };
  }, []);

  return { isMobile };
}
