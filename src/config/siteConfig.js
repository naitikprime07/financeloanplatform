/**
 * Centralized multi-domain site configuration.
 * Domain entries select language and may optionally prioritize one existing
 * blog key. Environment entries override these defaults.
 */

const SUPPORTED_LANGUAGES = new Set(["hi", "en"]);

const normalizeHost = (value = "") => {
  const candidate = String(value).trim();
  if (!candidate) return "";
  try {
    const url = new URL(
      candidate.includes("://") ? candidate : "http://" + candidate,
    );
    return url.host.toLowerCase();
  } catch {
    return "";
  }
};

const normalizeScope = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/-english$/, "") || null;

const addDomainConfig = (configs, domain, config = {}) => {
  if (!config || typeof config !== "object") return;

  const host = normalizeHost(domain);
  const language = String(config.language || "").trim().toLowerCase();
  if (!host || !SUPPORTED_LANGUAGES.has(language)) return;

  configs[host] = {
    language,
    blog: normalizeScope(config.blog),
    primaryCategory:
      String(config.primaryCategory || "").trim().toLowerCase() || null,
  };
};

const createDefaultDomainConfigs = () => {
  const configs = {};

  addDomainConfig(configs, "financeloanplatform.com", {
    language: "en",
    blog: null,
  });
  addDomainConfig(configs, "www.financeloanplatform.com", {
    language: "en",
    blog: null,
  });
  addDomainConfig(configs, "hi.financeloanplatform.com", {
    language: "hi",
    blog: null,
  });
  addDomainConfig(configs, "personal_en.financeloanplatform.com", {
    language: "en",
    blog: "personal-loan",
  });
  addDomainConfig(configs, "personalloan_hi.financeloanplatform.com", {
    language: "hi",
    blog: "personal-loan",
  });

  // Alias for the alternate spelling included in the deployment test list.
  addDomainConfig(configs, "personaloan_hi.financeloanplatform.com", {
    language: "hi",
    blog: "personal-loan",
  });

  return configs;
};

// Supports JSON (recommended) and the legacy pipe-delimited format.
const parseDomainConfig = () => {
  const configs = createDefaultDomainConfigs();
  const configString = (import.meta.env.VITE_DOMAIN_CONFIG || "").trim();

  if (!configString) return configs;

  try {
    const parsed = JSON.parse(configString);
    Object.entries(parsed).forEach(([domain, config]) =>
      addDomainConfig(configs, domain, config),
    );
    return configs;
  } catch {
    // Keep existing pipe-delimited deployments working during migration.
  }

  configString.split("|").forEach((entry) => {
    const match = entry.trim().match(/^(.*):(hi|en)(?::([^:]*))?$/i);
    if (!match) return;
    addDomainConfig(configs, match[1], {
      language: match[2],
      primaryCategory: match[3],
    });
  });

  return configs;
};

export const MAIN_DOMAIN =
  import.meta.env.VITE_MAIN_DOMAIN || "https://financeloanplatform.com";
export const ENGLISH_DOMAIN =
  import.meta.env.VITE_ENGLISH_DOMAIN || MAIN_DOMAIN;
export const HINDI_DOMAIN =
  import.meta.env.VITE_HINDI_DOMAIN || "https://hi.financeloanplatform.com";
export const DEFAULT_LANGUAGE =
  import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

const DOMAIN_CONFIGS = parseDomainConfig();

const FALLBACK_CONFIG = Object.freeze({
  language: SUPPORTED_LANGUAGES.has(DEFAULT_LANGUAGE)
    ? DEFAULT_LANGUAGE
    : "en",
  blog: null,
  primaryCategory: null,
});

export const getCurrentHost = () => {
  if (typeof window === "undefined") return normalizeHost(MAIN_DOMAIN);
  return window.location.host.toLowerCase();
};

export const getCurrentDomain = () => {
  if (typeof window === "undefined") return MAIN_DOMAIN;
  return window.location.origin;
};

export const getSiteConfigForHost = (host) => {
  const hostname = normalizeHost(host);

  if (DOMAIN_CONFIGS[hostname]) return DOMAIN_CONFIGS[hostname];

  const englishHost = normalizeHost(ENGLISH_DOMAIN);
  if (hostname === englishHost) {
    return { language: "en", blog: null, primaryCategory: null };
  }

  const hindiHost = normalizeHost(HINDI_DOMAIN);
  if (hostname === hindiHost) {
    return { language: "hi", blog: null, primaryCategory: null };
  }

  return FALLBACK_CONFIG;
};

export const getCurrentSiteConfig = () =>
  getSiteConfigForHost(getCurrentHost());

export const getCurrentSiteLanguage = () =>
  getCurrentSiteConfig().language;

export const getCurrentLanguage = getCurrentSiteLanguage;

export const getCurrentBlog = () =>
  getCurrentSiteConfig().blog;

export const getPrimaryCategory = () =>
  getCurrentSiteConfig().primaryCategory;

export const getCurrentCategory = getPrimaryCategory;

export const isHindiSite = () => getCurrentSiteLanguage() === "hi";

export const isEnglishSite = () => getCurrentSiteLanguage() === "en";

const domainToOrigin = (host) =>
  host.startsWith("localhost") || host.startsWith("127.0.0.1")
    ? "http://" + host
    : "https://" + host;

const findConfiguredDomain = (language, blog) => {
  const match = Object.entries(DOMAIN_CONFIGS).find(
    ([, config]) =>
      config.language === language && config.blog === (blog || null),
  );
  return match ? domainToOrigin(match[0]) : null;
};

export const getLanguageSwitchDomain = () => {
  const current = getCurrentSiteConfig();
  const targetLanguage = current.language === "hi" ? "en" : "hi";
  const configuredDomain = findConfiguredDomain(
    targetLanguage,
    current.blog,
  );

  if (configuredDomain) return configuredDomain;
  return targetLanguage === "hi" ? HINDI_DOMAIN : ENGLISH_DOMAIN;
};

export const getLanguageSwitchUrl = (path = "/") => {
  const targetDomain = getLanguageSwitchDomain().replace(new RegExp("/+$"), "");
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  return targetDomain + cleanPath;
};

export const getCanonicalUrl = (path = "/") => {
  const currentDomain = getCurrentDomain().replace(new RegExp("/+$"), "");
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  return currentDomain + cleanPath;
};

export default {
  MAIN_DOMAIN,
  ENGLISH_DOMAIN,
  HINDI_DOMAIN,
  DEFAULT_LANGUAGE,
  getCurrentHost,
  getCurrentDomain,
  getCurrentSiteConfig,
  getCurrentSiteLanguage,
  getCurrentLanguage,
  getCurrentBlog,
  getPrimaryCategory,
  getCurrentCategory,
  isHindiSite,
  isEnglishSite,
  getLanguageSwitchDomain,
  getLanguageSwitchUrl,
  getCanonicalUrl,
};
