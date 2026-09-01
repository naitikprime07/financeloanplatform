import { useEffect } from 'react';

// Initialize Google Publisher Tag
export const initializeGPT = () => {
  if (typeof window === 'undefined') return;

  window.googletag = window.googletag || { cmd: [] };

  window.googletag.cmd.push(() => {
    // Enable single request mode
    window.googletag.pubads().enableSingleRequest();
    // Collapse empty divs
    window.googletag.pubads().collapseEmptyDivs();
    // Enable services
    window.googletag.enableServices();
  });
};

// Hook to initialize GPT on mount
export const useGPT = () => {
  useEffect(() => {
    initializeGPT();
  }, []);
};
