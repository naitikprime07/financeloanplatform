import { useEffect, useMemo, useRef, useState } from "react";
import "./AdUnit.css";

const NETWORK = String(import.meta.env.VITE_GAM_NETWORK_CODE || "")
  .trim()
  .replace(/^\/+|\/+$/g, "");
const normalizePath = (value) => {
  const path = String(value || "").trim();
  if (!path) return "";
  if (path.startsWith("/")) return path;
  return NETWORK ? `/${NETWORK}/${path.replace(/^\/+/, "")}` : "";
};
const PATHS = {
  TOP: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_TOP),
  MIDDLE_1: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_1),
  MIDDLE_2: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_2),
  MIDDLE_3: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_3),
  BOTTOM: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_CONTENT_BOTTOM),
  ANCHOR: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_MOBILE_ANCHOR),
  NATIVE: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_NATIVE_IN_CONTENT),
  SIDE_LEFT: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_DESKTOP_SIDE_LEFT),
  SIDE_RIGHT: normalizePath(
    import.meta.env.VITE_GAM_AD_UNIT_DESKTOP_SIDE_RIGHT,
  ),
  BLOG_SIDEBAR: normalizePath(import.meta.env.VITE_GAM_AD_UNIT_BLOG_SIDEBAR),
};
const SIZES = {
  TOP: [
    [970, 90],
    [728, 90],
    [468, 60],
    [320, 100],
    [320, 50],
  ],
  BOTTOM: [
    [970, 90],
    [728, 90],
    [468, 60],
    [320, 100],
    [320, 50],
  ],
  MIDDLE_1: [
    [728, 90],
    [336, 280],
    [300, 250],
    [320, 100],
  ],
  MIDDLE_2: [
    [728, 90],
    [336, 280],
    [300, 250],
    [320, 100],
  ],
  MIDDLE_3: [[728, 90], [336, 280], [300, 250], "fluid"],
  NATIVE: ["fluid", [336, 280], [300, 250]],
  ANCHOR: [
    [320, 100],
    [320, 50],
  ],
  SIDE_LEFT: [
    [160, 600],
    [120, 600],
  ],
  SIDE_RIGHT: [
    [160, 600],
    [120, 600],
  ],
  BLOG_SIDEBAR: [
    [300, 250],
    [320, 100],
  ],
};

const buildMapping = (gt, key) => {
  if (key === "BLOG_SIDEBAR")
    return gt.sizeMapping().addSize([0, 0], SIZES.BLOG_SIDEBAR).build();
  if (key === "ANCHOR")
    return gt.sizeMapping().addSize([0, 0], SIZES.ANCHOR).build();
  if (key.startsWith("SIDE_"))
    return gt
      .sizeMapping()
      .addSize([1536, 0], SIZES[key])
      .addSize([0, 0], [])
      .build();
  if (key === "TOP" || key === "BOTTOM")
    return gt
      .sizeMapping()
      .addSize(
        [1024, 0],
        [
          [970, 90],
          [728, 90],
        ],
      )
      .addSize(
        [768, 0],
        [
          [728, 90],
          [468, 60],
        ],
      )
      .addSize(
        [0, 0],
        [
          [320, 100],
          [320, 50],
        ],
      )
      .build();
  if (key === "NATIVE" || key === "MIDDLE_3")
    return gt
      .sizeMapping()
      .addSize([768, 0], [[728, 90], [336, 280], [300, 250], "fluid"])
      .addSize([0, 0], [[336, 280], [300, 250], "fluid"])
      .build();
  return gt
    .sizeMapping()
    .addSize(
      [768, 0],
      [
        [728, 90],
        [336, 280],
        [300, 250],
      ],
    )
    .addSize(
      [0, 0],
      [
        [336, 280],
        [300, 250],
        [320, 100],
      ],
    )
    .build();
};

const AdUnit = ({
  slot,
  size = "responsive",
  className = "",
  label = true,
  sticky = false,
}) => {
  const id = useRef(
    `gam-${slot.toLowerCase()}-${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`,
  );
  const slotRef = useRef(null);
  const [state, setState] = useState("loading");
  const key = size === "native" && PATHS.NATIVE ? "NATIVE" : slot;
  const path = PATHS[key] || "";
  const sizes = useMemo(() => SIZES[key], [key]);

  useEffect(() => {
    if (!path || !sizes) {
      setState("empty");
      return undefined;
    }
    window.googletag = window.googletag || { cmd: [] };
    let active = true;
    let timer;
    const rendered = (event) => {
      if (!active || event.slot !== slotRef.current) return;
      clearTimeout(timer);
      setState(event.isEmpty ? "empty" : "filled");
    };
    window.googletag.cmd.push(() => {
      if (!active) return;
      const gt = window.googletag;
      const gamSlot = gt.defineSlot(path, sizes, id.current);
      if (!gamSlot) {
        setState("empty");
        return;
      }
      const responsiveMapping = buildMapping(gt, key);
      if (responsiveMapping) gamSlot.defineSizeMapping(responsiveMapping);
      gamSlot.addService(gt.pubads());
      slotRef.current = gamSlot;
      gt.pubads().addEventListener("slotRenderEnded", rendered);
      gt.display(id.current);
      timer = setTimeout(() => active && setState("empty"), 15000);
    });
    return () => {
      active = false;
      clearTimeout(timer);
      window.googletag?.cmd?.push(() => {
        window.googletag
          .pubads()
          .removeEventListener("slotRenderEnded", rendered);
        if (slotRef.current) window.googletag.destroySlots([slotRef.current]);
        slotRef.current = null;
      });
    };
  }, [key, path, sizes]);
  return (
    <aside
      className={`ad-unit-wrapper is-${state} ${sticky ? "ad-sticky" : ""} ${className}`}
      aria-label="Advertisement"
    >
      {label && <div className="ad-label">ADVERTISEMENT</div>}
      {path && sizes && <div className="ad-unit" id={id.current} />}
    </aside>
  );
};
export default AdUnit;
