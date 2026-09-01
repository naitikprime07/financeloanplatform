import { useEffect } from 'react';
import { GPT_SCRIPT_URL, initializeGPT } from './AdManager';

const AdScriptLoader = () => {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    // Queue page configuration before any slot commands and before GPT loads.
    initializeGPT();
    if (document.querySelector('script[data-finvexa-gpt="true"]')) return undefined;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.finvexaGpt = 'true';
    script.src = GPT_SCRIPT_URL;
    script.onerror = () => script.remove();
    document.head.appendChild(script);
    return undefined;
  }, []);
  return null;
};
export default AdScriptLoader;
