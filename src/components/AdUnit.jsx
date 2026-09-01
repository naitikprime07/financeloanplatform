import { useEffect, useMemo, useRef, useState } from "react";
import "./AdUnit.css";
const PATHS = {
  TOP: import.meta.env.VITE_GAM_AD_UNIT_CONTENT_TOP,
  MIDDLE_1: import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_1,
  MIDDLE_2: import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_2,
  MIDDLE_3: import.meta.env.VITE_GAM_AD_UNIT_CONTENT_MIDDLE_3,
  BOTTOM: import.meta.env.VITE_GAM_AD_UNIT_CONTENT_BOTTOM,
  ANCHOR: import.meta.env.VITE_GAM_AD_UNIT_MOBILE_ANCHOR,
  NATIVE: import.meta.env.VITE_GAM_AD_UNIT_NATIVE_IN_CONTENT,
  SIDE_LEFT: import.meta.env.VITE_GAM_AD_UNIT_DESKTOP_SIDE_LEFT,
  SIDE_RIGHT: import.meta.env.VITE_GAM_AD_UNIT_DESKTOP_SIDE_RIGHT,
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
};
const mapping = (gt, slot) => {
  if (slot === "ANCHOR")
    return gt.sizeMapping().addSize([0, 0], SIZES.ANCHOR).build();
  if (slot.startsWith("SIDE_"))
    return gt
      .sizeMapping()
      .addSize([1536, 0], SIZES[slot])
      .addSize([0, 0], [])
      .build();
  if (slot === "TOP" || slot === "BOTTOM")
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
  const sizes = useMemo(() => SIZES[key] || SIZES.MIDDLE_1, [key]);
  useEffect(() => {
    if (!path) {
      setState("empty");
      return undefined;
    }
    window.googletag = window.googletag || { cmd: [] };
    let active = true,
      timer;
    const rendered = (event) => {
      if (active && event.slot === slotRef.current) {
        clearTimeout(timer);
        setState(event.isEmpty ? "empty" : "filled");
      }
    };
    window.googletag.cmd.push(() => {
      if (!active) return;
      const gt = window.googletag;
      const gamSlot = gt.defineSlot(path, sizes, id.current);
      if (!gamSlot) {
        setState("empty");
        return;
      }
      gamSlot.defineSizeMapping(mapping(gt, key)).addService(gt.pubads());
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
      {path && <div className="ad-unit" id={id.current} />}
    </aside>
  );
};
export default AdUnit;
