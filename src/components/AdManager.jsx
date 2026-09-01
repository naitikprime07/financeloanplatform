export const GPT_SCRIPT_URL = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
let configurationQueued = false;

export const initializeGPT = () => {
  if (typeof window === 'undefined') return;
  window.googletag = window.googletag || { cmd: [] };
  if (configurationQueued) return;
  configurationQueued = true;
  window.googletag.cmd.push(() => {
    const pubads = window.googletag.pubads();

    // Core configuration
    pubads.enableSingleRequest();
    pubads.collapseEmptyDivs(true, true); // Collapse before and after ad fetch
    pubads.setCentering(true);

    // Performance optimizations
    pubads.enableLazyLoad({
      fetchMarginPercent: 200,  // Fetch ads 200% before viewport
      renderMarginPercent: 100, // Render ads 100% before viewport
      mobileScaling: 2.0        // Double margins on mobile
    });

    // Privacy and targeting settings
    pubads.setPrivacySettings({
      restrictDataProcessing: false,
      childDirectedTreatment: false,
      underAgeOfConsent: false
    });

    // Enable services
    window.googletag.enableServices();
  });
};
