import { useEffect } from "react";
export const GPT_SCRIPT_URL =
  "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
let servicesEnabled = false;
export const initializeGPT = () => {
  if (typeof window === "undefined") return;
  window.googletag = window.googletag || { cmd: [] };
  window.googletag.cmd.push(() => {
    if (servicesEnabled) return;
    window.googletag.pubads().enableSingleRequest();
    window.googletag.pubads().collapseEmptyDivs(true);
    window.googletag.pubads().setCentering(true);
    window.googletag.enableServices();
    servicesEnabled = true;
  });
};
export const useGPT = () => useEffect(initializeGPT, []);
