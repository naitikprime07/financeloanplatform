import { useEffect } from "react";
import { GPT_SCRIPT_URL, initializeGPT } from "./AdManager";
const AdScriptLoader = () => {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    if (document.querySelector('script[data-finvexa-gpt="true"]')) {
      initializeGPT();
      return undefined;
    }
    const script = document.createElement("script");
    script.async = true;
    script.dataset.finvexaGpt = "true";
    script.src = GPT_SCRIPT_URL;
    script.onload = initializeGPT;
    script.onerror = () => script.remove();
    document.head.appendChild(script);
    return undefined;
  }, []);
  return null;
};
export default AdScriptLoader;
