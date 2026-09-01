export const GPT_SCRIPT_URL = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
let configurationQueued = false;

export const initializeGPT = () => {
  if (typeof window === 'undefined') return;
  window.googletag = window.googletag || { cmd: [] };
  if (configurationQueued) return;
  configurationQueued = true;
  window.googletag.cmd.push(() => {
    window.googletag.setConfig({
      singleRequest: true,
      collapseDiv: 'BEFORE_FETCH',
      centering: true,
    });
    window.googletag.enableServices();
  });
};
