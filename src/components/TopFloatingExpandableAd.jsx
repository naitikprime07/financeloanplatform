import { useEffect, useRef, useState } from 'react';
import { gamLog, gamWarn } from './gamDebug';
import './TopFloatingExpandableAd.css';

const NETWORK = String(import.meta.env.VITE_GAM_NETWORK_CODE || '').trim().replace(/^\/+|\/+$/g, '');
const rawPath = String(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_TOP || '').trim();
const AD_PATH = rawPath.startsWith('/') ? rawPath : NETWORK && rawPath ? `/${NETWORK}/${rawPath.replace(/^\/+/, '')}` : '';
const AD_SIZES = [[970, 250], [900, 250], [970, 90], [728, 90], [468, 60], [320, 100], [320, 50]];
const buildSizeMapping = (gt) => gt.sizeMapping()
  .addSize([1024, 0], [[970, 250], [900, 250], [970, 90], [728, 90]])
  .addSize([768, 0], [[728, 90], [468, 60]])
  .addSize([0, 0], [[320, 100], [320, 50]])
  .build();

const TopFloatingExpandableAd = () => {
  const id = useRef(`gam-top-floating-${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`);
  const slotRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [creativeSize, setCreativeSize] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState('collapsing');

  useEffect(() => {
    if (!AD_PATH) { setStatus('unavailable'); return undefined; }
    window.googletag = window.googletag || { cmd: [] };
    let active = true;
    let timeoutId;
    const onRender = (event) => {
      if (!active || event.slot !== slotRef.current) return;
      window.clearTimeout(timeoutId);
      if (event.isEmpty) {
        setCreativeSize(null);
        setStatus('unavailable');
        gamLog('top-floating-no-fill', { path: AD_PATH });
        return;
      }
      const size = Array.isArray(event.size) ? event.size : null;
      setCreativeSize(size);
      setStatus('expanded');
      gamLog('top-floating-rendered', { path: AD_PATH, size });
    };
    window.googletag.cmd.push(() => {
      if (!active) return;
      const gt = window.googletag;
      try {
        const gamSlot = gt.defineSlot(AD_PATH, AD_SIZES, id.current);
        if (!gamSlot) { setStatus('unavailable'); return; }
        gamSlot.defineSizeMapping(buildSizeMapping(gt)).addService(gt.pubads());
        slotRef.current = gamSlot;
        gt.pubads().addEventListener('slotRenderEnded', onRender);
        gt.display(id.current);
        timeoutId = window.setTimeout(() => active && setStatus('unavailable'), 15000);
      } catch (error) {
        setStatus('unavailable');
        gamWarn('top-floating-exception', { message: error instanceof Error ? error.message : String(error) });
      }
    });
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      window.googletag?.cmd?.push(() => {
        window.googletag.pubads().removeEventListener('slotRenderEnded', onRender);
        if (slotRef.current) window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      });
    };
  }, []);

  const isFilled = ['expanded', 'compact', 'collapsed'].includes(status);
  const compactScale = creativeSize ? Math.min(1, 110 / creativeSize[1]) : 1;
  const style = creativeSize ? {
    '--top-ad-width': `${creativeSize[0]}px`,
    '--top-ad-height': `${creativeSize[1]}px`,
    '--top-ad-compact-scale': compactScale,
    '--top-ad-compact-width': `${creativeSize[0] * compactScale}px`,
    '--top-ad-compact-height': `${creativeSize[1] * compactScale}px`,
  } : undefined;

  const toggleAd = () => {
    setStatus((current) => {
      if (current === 'expanded') { setTransitionDirection('collapsing'); return 'compact'; }
      if (current === 'compact') return transitionDirection === 'collapsing' ? 'collapsed' : 'expanded';
      if (current === 'collapsed') { setTransitionDirection('expanding'); return 'compact'; }
      return current;
    });
  };

  const expanding = status === 'collapsed' || transitionDirection === 'expanding';
  return <>
    <aside className={`top-floating-ad is-${status}`} style={style} aria-label="Advertisement">
      <div className="top-floating-label">ADVERTISEMENT</div>
      <div className="top-floating-creative" aria-hidden={!isFilled || status === 'collapsed'}>
        <div className="top-floating-slot" id={id.current} />
      </div>
      {isFilled && <button type="button" className="top-floating-toggle" onClick={toggleAd} aria-expanded={status === 'expanded'} aria-label={expanding ? 'Expand advertisement' : 'Collapse advertisement'}>
        <span>{status === 'collapsed' ? 'Expand' : 'Advertisement'}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 10 4-4 4 4" /></svg>
      </button>}
    </aside>
    <div className={`top-floating-clearance is-${status}`} style={style} aria-hidden="true" />
  </>;
};

export default TopFloatingExpandableAd;
