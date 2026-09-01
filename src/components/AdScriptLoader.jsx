import { useEffect } from 'react';

const AdScriptLoader = () => {
  const clientId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || import.meta.env.VITE_ADSENSE_CLIENT_ID || '';

  useEffect(() => {
    if (!clientId) return undefined;

    window.adsbygoogle = window.adsbygoogle || [];
    const selector = 'script[data-finvexa-adsense="true"]';
    if (document.querySelector(selector)) return undefined;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.finvexaAdsense = 'true';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    script.onerror = () => script.remove();
    document.head.appendChild(script);

    return undefined;
  }, [clientId]);

  return null;
};

export default AdScriptLoader;