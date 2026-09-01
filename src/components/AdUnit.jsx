import { useEffect, useRef, useState } from 'react';
import './AdUnit.css';
const AD_SLOT_ENV_MAP = {
  TOP: import.meta.env.VITE_AD_SLOT_CONTENT_TOP || import.meta.env.VITE_AD_TOP,
  MIDDLE_1: import.meta.env.VITE_AD_SLOT_CONTENT_MIDDLE_1 || import.meta.env.VITE_AD_MIDDLE_1,
  MIDDLE_2: import.meta.env.VITE_AD_SLOT_CONTENT_MIDDLE_2 || import.meta.env.VITE_AD_MIDDLE_2,
  MIDDLE_3: import.meta.env.VITE_AD_SLOT_CONTENT_MIDDLE_3 || import.meta.env.VITE_AD_MIDDLE_3,
  BOTTOM: import.meta.env.VITE_AD_SLOT_CONTENT_BOTTOM || import.meta.env.VITE_AD_BOTTOM,
  ANCHOR: import.meta.env.VITE_AD_SLOT_MOBILE_ANCHOR || import.meta.env.VITE_AD_ANCHOR,
  NATIVE: import.meta.env.VITE_AD_SLOT_NATIVE_IN_CONTENT || import.meta.env.VITE_AD_NATIVE,
  SIDE_LEFT: import.meta.env.VITE_AD_SLOT_DESKTOP_SIDE_LEFT || import.meta.env.VITE_AD_SIDE_LEFT,
  SIDE_RIGHT: import.meta.env.VITE_AD_SLOT_DESKTOP_SIDE_RIGHT || import.meta.env.VITE_AD_SIDE_RIGHT,
  INTERSTITIAL: import.meta.env.VITE_AD_SLOT_INTERSTITIAL || import.meta.env.VITE_AD_INTERSTITIAL,
  REWARDED: import.meta.env.VITE_AD_SLOT_REWARDED || import.meta.env.VITE_AD_REWARDED,
};

const AdUnit = ({
  slot,
  size = 'responsive',
  className = '',
  label = true,
  sticky = false,
}) => {
  const adRef = useRef(null);
  const divId = useRef(`ad-${slot}-${Math.random().toString(36).slice(2, 11)}`);
  const [adState, setAdState] = useState('loading');

  const clientId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || import.meta.env.VITE_ADSENSE_CLIENT_ID || '';
  const configuredSlot = AD_SLOT_ENV_MAP[slot] || '';
  const adSlot = size === 'native'
    ? AD_SLOT_ENV_MAP.NATIVE || configuredSlot
    : configuredSlot;
  const configured = Boolean(clientId && adSlot);

  useEffect(() => {
    const container = adRef.current;
    if (!configured || !container) {
      setAdState('empty');
      return undefined;
    }

    setAdState('loading');
    const adElement = container.querySelector('.adsbygoogle');
    const syncStatus = () => {
      const status = adElement?.getAttribute('data-ad-status');
      if (status === 'filled') setAdState('filled');
      if (status === 'unfilled') setAdState('empty');
    };
    const observer = new MutationObserver(syncStatus);
    if (adElement) observer.observe(adElement, { attributes: true, attributeFilter: ['data-ad-status'] });

    window.adsbygoogle = window.adsbygoogle || [];
    try {
      window.adsbygoogle.push({});
    } catch (error) {
      console.warn(`Ad ${slot} failed to initialize:`, error);
      setAdState('empty');
    }

    const timeout = window.setTimeout(() => {
      if (!adElement?.getAttribute('data-ad-status')) setAdState('empty');
    }, 12000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [adSlot, clientId, configured, slot]);

  return (
    <aside
      className={`ad-unit-wrapper is-${adState} ${sticky ? 'ad-sticky' : ''} ${className}`}
      aria-label="Advertisement"
    >
      {label && <div className="ad-label">ADVERTISEMENT</div>}
      {configured && (
        <div ref={adRef} className="ad-unit" id={divId.current}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={adSlot}
            data-ad-format={size === 'native' ? 'fluid' : size === 'responsive' ? 'auto' : size}
            data-full-width-responsive="true"
          />
        </div>
      )}
    </aside>
  );
};

export default AdUnit;