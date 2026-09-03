import { useEffect, useRef, useState } from 'react';
import { gamLog, gamWarn } from './gamDebug';
import './BlogRewardedAd.css';

const NETWORK = String(import.meta.env.VITE_GAM_NETWORK_CODE || '').trim().replace(/^\/+|\/+$/g, '');
const normalizePath = (value) => {
  const path = String(value || '').trim();
  if (!path) return '';
  if (path.startsWith('/')) return path;
  return NETWORK ? `/${NETWORK}/${path.replace(/^\/+/, '')}` : '';
};

const REWARDED_PATH = normalizePath(
  import.meta.env.VITE_GAM_AD_UNIT_REWARDED || import.meta.env.VITE_GAM_AD_UNIT_CONTENT_TOP,
);

const BlogRewardedAd = ({ post, ctaText = 'अभी आवेदन करें' }) => {
  const [status, setStatus] = useState('idle');
  const slotRef = useRef(null);
  const showRewardedRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!REWARDED_PATH) {
      setStatus('failed');
      gamWarn('blog-rewarded-not-configured', {
        variables: ['VITE_GAM_AD_UNIT_REWARDED', 'VITE_GAM_AD_UNIT_CONTENT_TOP'],
      });
      return undefined;
    }

    setStatus('loading');

    window.googletag = window.googletag || { cmd: [] };
    let active = true;
    let timeoutId;
    let initDelayTimer;
    const owns = (event) => event.slot === slotRef.current;

    const startRequestTimeout = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (!active || !slotRef.current) return;
        showRewardedRef.current = null;
        setStatus('failed');
        window.googletag?.destroySlots?.([slotRef.current]);
        slotRef.current = null;
        gamWarn('blog-rewarded-timeout', { path: REWARDED_PATH, timeoutMs: 30000 });
      }, 30000);
    };

    const handlers = {
      slotRequested: (event) => {
        if (!active || !owns(event)) return;
        startRequestTimeout();
        gamLog('blog-rewarded-requested', { path: REWARDED_PATH });
      },
      slotRenderEnded: (event) => {
        if (!active || !owns(event)) return;
        if (event.isEmpty) {
          window.clearTimeout(timeoutId);
          setStatus('failed');
          showRewardedRef.current = null;
          window.googletag?.destroySlots?.([slotRef.current]);
          slotRef.current = null;
          gamLog('blog-rewarded-no-fill', { path: REWARDED_PATH });
        }
      },
      rewardedSlotReady: (event) => {
        if (!active || !owns(event)) return;
        window.clearTimeout(timeoutId);
        showRewardedRef.current = event.makeRewardedVisible;
        setStatus('ready');
        gamLog('blog-rewarded-ready', { path: REWARDED_PATH });
      },
      rewardedSlotGranted: (event) => {
        if (!active || !owns(event)) return;
        setStatus('closable');
        gamLog('blog-rewarded-granted', { path: REWARDED_PATH, payload: event.payload });
      },
      rewardedSlotClosed: (event) => {
        if (!active || !owns(event)) return;
        showRewardedRef.current = null;
        setStatus('closed');
        window.requestAnimationFrame(() => window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' }));
        gamLog('blog-rewarded-closed', { path: REWARDED_PATH });
      },
    };

    // CRITICAL FIX: Delay rewarded ad initialization to prevent race condition
    const initRewardedSlot = () => {
      window.googletag.cmd.push(() => {
        if (!active) return;
        const gt = window.googletag;
        try {
          const rewardedSlot = gt.defineOutOfPageSlot(REWARDED_PATH, gt.enums.OutOfPageFormat.REWARDED);
          if (!rewardedSlot) {
            setStatus('failed');
            gamWarn('blog-rewarded-unsupported', { path: REWARDED_PATH });
            return;
          }

          rewardedSlot.addService(gt.pubads());
          slotRef.current = rewardedSlot;
          Object.entries(handlers).forEach(([eventName, handler]) => gt.pubads().addEventListener(eventName, handler));
          gt.display(rewardedSlot);
        } catch (error) {
          setStatus('failed');
          gamWarn('blog-rewarded-exception', { message: error instanceof Error ? error.message : String(error) });
        }
      });
    };

    initDelayTimer = window.setTimeout(initRewardedSlot, 50);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      window.clearTimeout(initDelayTimer);
      showRewardedRef.current = null;
      // Capture this blog's slot before queueing cleanup.
      const slotToDestroy = slotRef.current;
      slotRef.current = null;
      window.googletag?.cmd?.push(() => {
        Object.entries(handlers).forEach(([eventName, handler]) => window.googletag.pubads().removeEventListener(eventName, handler));
        if (slotToDestroy) window.googletag.destroySlots([slotToDestroy]);
      });
    };
  }, [post.id]);

  const openRewardedAd = () => {
    if (status !== 'ready' || !showRewardedRef.current) return;
    scrollPositionRef.current = window.scrollY;
    setStatus('opened');
    try {
      showRewardedRef.current();
      setStatus('showing');
    } catch (error) {
      showRewardedRef.current = null;
      setStatus('failed');
      gamWarn('blog-rewarded-open-failed', { message: error instanceof Error ? error.message : String(error) });
    }
  };

  // Only show fallback for failed or idle/loading states
  // Do NOT show the sponsored break UI until ad is actually ready
  if (status === 'failed' || status === 'idle' || status === 'loading') {
    return <aside className="blog-rewarded-fallback" aria-label="Advertisement">ADVERTISEMENT</aside>;
  }

  // Only render the full sponsored break UI if ad is actually ready or beyond
  // States that reach here: ready, opened, showing, closable, closed
  return (
    <aside className={`blog-rewarded-card is-${status}`} aria-label="Rewarded advertisement">
      <div className="loan-inline-cta">
        <button className="apply-now-btn" type="button" onClick={openRewardedAd} disabled={status !== 'ready'}>
          {status === 'ready' && <>{ctaText} <span aria-hidden="true">→</span></>}
          {(status === 'opened' || status === 'showing') && 'विज्ञापन जारी है…'}
          {status === 'closable' && 'विज्ञापन पूरा करें'}
          {status === 'closed' && 'विज्ञापन पूर्ण हुआ'}
        </button>
      </div>
    </aside>
  );
};

export default BlogRewardedAd;
