import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamLog, gamWarn } from './gamDebug';
import nullButton from '../assets/buttons/nullButton.svg';
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

const BlogRewardedAd = ({
  post,
  targetSlug,
  ctaText = '\u0905\u092d\u0940 \u0906\u0935\u0947\u0926\u0928 \u0915\u0930\u0947\u0902',
  renderTrigger,
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [activeTargetSlug, setActiveTargetSlug] = useState(null);
  const slotRef = useRef(null);
  const showRewardedRef = useRef(null);
  const pendingTargetRef = useRef(null);
  const defaultTargetRef = useRef(targetSlug);
  const scrollPositionRef = useRef(0);
  const openingRef = useRef(false);
  const rewardGrantedRef = useRef(false);
  const redirectedRef = useRef(false);
  defaultTargetRef.current = targetSlug;

  useEffect(() => {
    if (!REWARDED_PATH) {
      setStatus('failed');
      gamWarn('blog-rewarded-not-configured', {
        variables: ['VITE_GAM_AD_UNIT_REWARDED', 'VITE_GAM_AD_UNIT_CONTENT_TOP'],
      });
      return undefined;
    }

    setStatus('loading');
    setActiveTargetSlug(null);
    openingRef.current = false;
    rewardGrantedRef.current = false;
    redirectedRef.current = false;
    pendingTargetRef.current = null;
    window.googletag = window.googletag || { cmd: [] };

    let active = true;
    let timeoutId;
    let initDelayTimer;
    const owns = (event) => event.slot === slotRef.current;

    const failSlot = (eventName, details = {}) => {
      window.clearTimeout(timeoutId);
      showRewardedRef.current = null;
      openingRef.current = false;
      setStatus('failed');
      if (slotRef.current) {
        window.googletag?.destroySlots?.([slotRef.current]);
        slotRef.current = null;
      }
      gamWarn(eventName, { path: REWARDED_PATH, ...details });
    };

    const startRequestTimeout = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        if (!active || !slotRef.current) return;
        failSlot('blog-rewarded-timeout', { timeoutMs: 30000 });
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
          failSlot('blog-rewarded-no-fill');
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
        rewardGrantedRef.current = true;
        setStatus('closable');
        gamLog('blog-rewarded-granted', { path: REWARDED_PATH, payload: event.payload });
      },
      rewardedSlotClosed: (event) => {
        if (!active || !owns(event)) return;
        showRewardedRef.current = null;
        openingRef.current = false;
        setStatus('closed');

        const destination = pendingTargetRef.current || defaultTargetRef.current;
        window.requestAnimationFrame(() => {
          if (
            rewardGrantedRef.current &&
            destination &&
            destination !== post.id &&
            !redirectedRef.current
          ) {
            redirectedRef.current = true;
            navigate('/blog/' + destination);
            return;
          }
          pendingTargetRef.current = null;
          setActiveTargetSlug(null);
          window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
        });
        gamLog('blog-rewarded-closed', { path: REWARDED_PATH, destination });
      },
    };

    initDelayTimer = window.setTimeout(() => {
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
          Object.entries(handlers).forEach(([eventName, handler]) =>
            gt.pubads().addEventListener(eventName, handler),
          );
          gt.display(rewardedSlot);
        } catch (error) {
          setStatus('failed');
          gamWarn('blog-rewarded-exception', {
            message: error instanceof Error ? error.message : String(error),
          });
        }
      });
    }, 50);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      window.clearTimeout(initDelayTimer);
      showRewardedRef.current = null;
      const slotToDestroy = slotRef.current;
      slotRef.current = null;
      window.googletag?.cmd?.push(() => {
        Object.entries(handlers).forEach(([eventName, handler]) =>
          window.googletag.pubads().removeEventListener(eventName, handler),
        );
        if (slotToDestroy) window.googletag.destroySlots([slotToDestroy]);
      });
    };
  }, [post.id, navigate]);

  const openRewardedAd = (requestedTargetSlug) => {
    const destination =
      typeof requestedTargetSlug === 'string' ? requestedTargetSlug : defaultTargetRef.current;
    if (!destination || destination === post.id || openingRef.current || redirectedRef.current) return;

    pendingTargetRef.current = destination;
    setActiveTargetSlug(destination);

    if (status === 'failed') {
      redirectedRef.current = true;
      navigate('/blog/' + destination);
      return;
    }
    if (status !== 'ready' || !showRewardedRef.current) return;

    openingRef.current = true;
    rewardGrantedRef.current = false;
    scrollPositionRef.current = window.scrollY;
    setStatus('opened');
    try {
      showRewardedRef.current();
      setStatus('showing');
    } catch (error) {
      showRewardedRef.current = null;
      openingRef.current = false;
      setStatus('failed');
      redirectedRef.current = true;
      gamWarn('blog-rewarded-open-failed', {
        message: error instanceof Error ? error.message : String(error),
      });
      navigate('/blog/' + destination);
    }
  };

  const isBusy = ['idle', 'loading', 'opened', 'showing', 'closable', 'closed'].includes(status);
  if (renderTrigger) {
    return (
      <>
        {(status === 'idle' || status === 'loading' || status === 'failed') && (
          <aside className="blog-rewarded-fallback" aria-label="Advertisement">ADVERTISEMENT</aside>
        )}
        {renderTrigger({
          status,
          isBusy,
          activeTargetSlug,
          openRewardedAd,
        })}
      </>
    );
  }

  if (status === 'failed' || status === 'idle' || status === 'loading') {
    return <aside className="blog-rewarded-fallback" aria-label="Advertisement">ADVERTISEMENT</aside>;
  }

  return (
    <aside className={`blog-rewarded-card is-${status}`} aria-label="Rewarded advertisement">
      <div className="loan-inline-cta">
        <button
          className="svg-cta-button"
          type="button"
          onClick={() => openRewardedAd()}
          disabled={status !== 'ready'}
        >
          <img src={nullButton} alt="" aria-hidden="true" />
          <span className="svg-cta-label">
            {status === 'ready' && ctaText}
            {(status === 'opened' || status === 'showing') && 'विज्ञापन जारी है…'}
            {status === 'closable' && 'विज्ञापन पूरा करें'}
            {status === 'closed' && 'विज्ञापन पूर्ण हुआ'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default BlogRewardedAd;
