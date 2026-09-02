export const GPT_SCRIPT_URL = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';

export const initializeGPT = () => {
  if (typeof window === 'undefined') return;
  window.googletag = window.googletag || { cmd: [] };
  if (window.__finvexaGptConfigured) return;
  window.__finvexaGptConfigured = true;

  window.googletag.cmd.push(() => {
    const gt = window.googletag;
    const pubads = gt.pubads();

    gt.setConfig({ singleRequest: true });
    pubads.collapseEmptyDivs(true, true);
    pubads.setCentering(true);
    pubads.enableLazyLoad({
      fetchMarginPercent: 200,
      renderMarginPercent: 100,
      mobileScaling: 2.0,
    });
    pubads.setPrivacySettings({
      restrictDataProcessing: false,
      childDirectedTreatment: false,
      underAgeOfConsent: false,
    });
    gt.enableServices();
  });
};
