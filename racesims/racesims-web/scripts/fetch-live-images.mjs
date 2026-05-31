#!/usr/bin/env node
/**
 * fetch-live-images.mjs — pull real product photography from the live
 * racesims.in Shopify store into public/products/, named to match the
 * configurator option ids in src/lib/catalogue.ts.
 *
 * Source of truth: https://racesims.in/products.json (Shopify handles).
 * Images are downscaled via Shopify's CDN ?width= param to keep files light.
 *
 * Run once from racesims-web/:  node scripts/fetch-live-images.mjs
 * Idempotent: overwrites the same filenames. Logs every decision.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const FEED = "https://racesims.in/products.json?limit=250";
const OUT = new URL("../public/products/", import.meta.url).pathname;
const WIDTH = 1000; // CDN downscale

// Shopify product handle  ->  output filename stem (matches catalogue option ids).
// Only items we actually surface in the UI need an entry.
const MAP = {
  // wheelbases
  "conspit-ares-apex-8nm-cdr-qr-nrg-style-direct-drive-sim-racing-wheelbase": "ares-apex-8",
  "conspit-ares-12nm-holding-torque-direct-drive-sim-racing-wheelbase-conspit": "ares-12",
  "vnm-direct-drive-premier-13-nm-sim-racing-wheelbase": "vnm-premier-13",
  "conspit-ares-platinum-20nm-holding-torque-direct-drive-sim-racing-wheelbase-conspit": "ares-plat-20",
  "vnm-direct-drive-elite-18-nm-sim-racing-wheelbase": "vnm-elite-18",
  "vnm-direct-drive-supreme-25-nm-sim-racing-wheelbase": "vnm-supreme-25",
  "vnm-direct-drive-xtream-32-nm-sim-racing-wheelbase": "vnm-xtreme-32",
  // wheels
  "conspit-310-apex-racing-wheel": "c310-apex",
  "conspit-300gt-sim-racing-wheel": "c300gt",
  "vnm-gt-steering-wheel-v1": "vnm-gt-v1",
  "conspit-290gp": "c290gp",
  "conspit-max-01": "max-01",
  "conspit-pw-1": "pw-1",
  // pedals
  "conspit-cpp-apex-pedals-sim-racing-pedals": "cpp-apex",
  "vnm-lite-2-pedal": "vnm-lite",
  "conspit-cpp-lite-pedals": "cpp-lite-2",
  "conspit-cpp-evo-v2": "cpp-evo-3",
  // cockpit + seats
  "gt-sim-cockpit": "gt-cockpit",
  "racesims-premium-recliner-v1-seats-copy": "premium-recliner",
  "racesims-sport-recliner-seats": "sport-recliner",
  "racesims-pro-fixed-back-sim-racing-bucket-seats-motorsports-grade": "pro-fixed",
  "racesims-pro-x-large-fixed-back-sim-racing-bucket-seats-motorsports-grade-copy": "pro-xl",
  // displays
  "gigabyte-g34wqc": "single-34",
  "gigabyte-gs27f": "triple-27",
  "triple-32-gigabyte-gs32qc-32-165hz-1440p-curved-monitor": "triple-32",
  "gigabyte-co49dq": "single-49-oled",
  // pc + motion + addons
  "race-sims-pro-sim-pc": "standard",
  "vnm-3-dof-motion-kit-with-4-linear-actuator-150": "motion",
  "vnm-1-5-rally-handbrake": "rally",
  "vnm-sequential-h-pattern-shifter": "shifter",
  // group hero shots (products "stack" cards) — reuse some of the above
};

function cdn(src) {
  // inject width param before the query string Shopify already uses
  const u = new URL(src);
  u.searchParams.set("width", String(WIDTH));
  return u.toString();
}

const res = await fetch(FEED);
const { products } = await res.json();
const byHandle = Object.fromEntries(products.map((p) => [p.handle, p]));

await mkdir(OUT, { recursive: true });

let ok = 0;
const miss = [];
for (const [handle, stem] of Object.entries(MAP)) {
  const p = byHandle[handle];
  if (!p || !(p.images || []).length) { miss.push(handle); console.log(`MISS  ${handle}`); continue; }
  const src = cdn(p.images[0].src);
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  const out = join(OUT, `${stem}.jpg`);
  await writeFile(out, buf);
  ok++;
  console.log(`ok    ${handle}  ->  products/${stem}.jpg  (${(buf.length / 1024).toFixed(0)}kb)`);
}
console.log(`\nDone. ${ok} downloaded, ${miss.length} missing.${miss.length ? " Missing: " + miss.join(", ") : ""}`);
