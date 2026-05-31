// Real RaceSims product photography → option / group lookup.
// Source files live in public/products/ (imported from raw marketing folder).
// Only options/groups we actually have a photo for appear here; everything else
// renders text-only (no broken image slot). Keyed by the ids in catalogue.ts.

export const OPTION_IMAGES: Record<string, string> = {
  "ares-apex-8": "/products/ares-apex-8.jpg",
  "ares-plat-20": "/products/ares-plat-20.jpg",
  "c290gp": "/products/c290gp.jpg",
  "cpp-apex": "/products/cpp-apex-alt.jpg",
  "cpp-lite-2": "/products/cpp-lite-2.jpg",
  "single-34": "/products/single-34.jpg",
};

// One representative shot per component group for the products "stack" cards.
export const GROUP_IMAGES: Record<string, string> = {
  wheelbase: "/products/ares-plat-20.jpg",
  wheel: "/products/c290gp.jpg",
  pedals: "/products/cpp-apex-alt.jpg",
  display: "/products/single-34.jpg",
};
