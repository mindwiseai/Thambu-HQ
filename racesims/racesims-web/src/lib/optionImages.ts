// Real RaceSims product photography → option / group lookup.
// Source files in public/products/ are pulled from the live racesims.in Shopify
// store by scripts/fetch-live-images.mjs (filenames match catalogue.ts option ids).
// Only ids with a real photo on disk appear here; anything else renders text-only.

export const OPTION_IMAGES: Record<string, string> = {
  // wheelbases
  "ares-apex-8": "/products/ares-apex-8.jpg",
  "ares-12": "/products/ares-12.jpg",
  "vnm-premier-13": "/products/vnm-premier-13.jpg",
  "ares-plat-20": "/products/ares-plat-20.jpg",
  "vnm-elite-18": "/products/vnm-elite-18.jpg",
  "vnm-supreme-25": "/products/vnm-supreme-25.jpg",
  "vnm-xtreme-32": "/products/vnm-xtreme-32.jpg",
  // wheels
  "c310-apex": "/products/c310-apex.jpg",
  "c300gt": "/products/c300gt.jpg",
  "vnm-gt-v1": "/products/vnm-gt-v1.jpg",
  "c290gp": "/products/c290gp.jpg",
  "max-01": "/products/max-01.jpg",
  "pw-1": "/products/pw-1.jpg",
  // pedals (cpp-evo-2 and cpp-evo-3 share the EVO V2 photo)
  "cpp-apex": "/products/cpp-apex.jpg",
  "vnm-lite": "/products/vnm-lite.jpg",
  "cpp-lite-2": "/products/cpp-lite-2.jpg",
  "cpp-evo-2": "/products/cpp-evo-3.jpg",
  "cpp-evo-3": "/products/cpp-evo-3.jpg",
  // cockpit + seats
  "gt-cockpit": "/products/gt-cockpit.jpg",
  "premium-recliner": "/products/premium-recliner.jpg",
  "sport-recliner": "/products/sport-recliner.jpg",
  "pro-fixed": "/products/pro-fixed.jpg",
  "pro-xl": "/products/pro-xl.jpg",
  // displays
  "single-34": "/products/single-34.jpg",
  "triple-27": "/products/triple-27.jpg",
  "triple-32": "/products/triple-32.jpg",
  "single-49-oled": "/products/single-49-oled.jpg",
  // pc
  "standard": "/products/standard.jpg",
};

// Add-on pack imagery (configurator add-on cards).
export const ADDON_IMAGES: Record<string, string> = {
  motion: "/products/motion.jpg",
  rally: "/products/rally.jpg",
  shifter: "/products/shifter.jpg",
};

// One representative shot per component group for the products "stack" cards.
export const GROUP_IMAGES: Record<string, string> = {
  wheelbase: "/products/ares-plat-20.jpg",
  wheel: "/products/c300gt.jpg",
  pedals: "/products/cpp-evo-3.jpg",
  cockpit: "/products/gt-cockpit.jpg",
  seat: "/products/sport-recliner.jpg",
  display: "/products/triple-32.jpg",
  pc: "/products/standard.jpg",
};
