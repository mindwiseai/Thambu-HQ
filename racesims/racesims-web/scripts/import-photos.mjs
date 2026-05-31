#!/usr/bin/env node
/**
 * import-photos.mjs — copy real RaceSims product/rig photography from the raw
 * marketing folder into public/, renamed to predictable slugs that match the
 * configurator option IDs (src/lib/catalogue.ts).
 *
 * Run once from racesims-web/:   node scripts/import-photos.mjs
 *
 * Safe + idempotent: only reads the raw folder, only writes into public/.
 * Picks the LARGEST jpg/png/webp in each source folder (usually best quality).
 * Skips HEIC (browsers can't render it). Logs every decision; never throws on a
 * missing folder — it just reports it so you can see the gaps.
 */
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const RAW = "/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/raw/racesims/06_Marketing/Website/Website images";
const PUB = new URL("../public/", import.meta.url).pathname;
const OUT_PROD = join(PUB, "products");
const OUT_HERO = join(PUB, "hero");

const WEB_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// raw folder name  ->  output filename (matches catalogue option ids where possible)
const PRODUCTS = {
  "Ares Apex 8nm":       "ares-apex-8.jpg",
  "Ares 12 nm":          "ares-12.jpg",
  "Ares 20nm platinum":  "ares-plat-20.jpg",
  "VNM DD":              "vnm-dd.jpg",
  "290GP":               "c290gp.jpg",
  "MAX-01":              "max-01.jpg",
  "PW-1":                "pw-1.jpg",
  "VNM gt wheel":        "vnm-gt-v1.jpg",
  "CPP Apex pedals":     "cpp-apex.jpg",
  "Conspit Apex pedals": "cpp-apex-alt.jpg",
  "CPP Lite":            "cpp-lite-2.jpg",
  "CPP EVO":             "cpp-evo.jpg",
  "VNM Lite Pedals":     "vnm-lite.jpg",
  "RaceSims Cockpit":    "gt-cockpit.jpg",
  "Seat":                "seat.jpg",
  "GS32QC":              "triple-32.jpg",
  "GS27F":               "triple-27.jpg",
  "GIGABYTE G34WQCA":    "single-34.jpg",
  "CO49DQ":              "single-49-oled.jpg",
  "Sequential Shifter":  "shifter.jpg",
  "Wind sim":            "wind-sim.jpg",
  "H.AO hub":            "hub.jpg",
  "ZOTAC 5070 ti":       "gpu.jpg",
};

// hero/atmosphere shots — pick a few good frames from these folders
const HEROES = {
  "the rigs":              ["hero-rigs-1.jpg", "hero-rigs-2.jpg", "hero-rigs-3.jpg"],
  "RaceSims rig":          ["hero-rig-1.jpg", "hero-rig-2.jpg"],
  "GT cockpit":            ["hero-cockpit-1.jpg", "hero-cockpit-2.jpg"],
  "race sims website pics":["hero-web-1.jpg", "hero-web-2.jpg", "hero-web-3.jpg"],
  "b roll":                ["hero-broll-1.jpg", "hero-broll-2.jpg"],
};

function webImagesIn(dir) {
  if (!existsSync(dir)) return [];
  let out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      if (name.startsWith(".")) continue;
      const p = join(d, name);
      let s;
      try { s = statSync(p); } catch { continue; }
      if (s.isDirectory()) walk(p);
      else if (WEB_EXT.has(extname(name).toLowerCase())) out.push({ p, size: s.size });
    }
  };
  walk(dir);
  return out.sort((a, b) => b.size - a.size); // largest first
}

mkdirSync(OUT_PROD, { recursive: true });
mkdirSync(OUT_HERO, { recursive: true });

let copied = 0, missing = [];

console.log("== PRODUCTS ==");
for (const [folder, outName] of Object.entries(PRODUCTS)) {
  const imgs = webImagesIn(join(RAW, folder));
  if (!imgs.length) { missing.push(folder); console.log(`  MISS  ${folder}`); continue; }
  copyFileSync(imgs[0].p, join(OUT_PROD, outName));
  copied++;
  console.log(`  ok    ${folder}  ->  products/${outName}`);
}

console.log("== HEROES ==");
for (const [folder, outNames] of Object.entries(HEROES)) {
  const imgs = webImagesIn(join(RAW, folder));
  if (!imgs.length) { missing.push(folder); console.log(`  MISS  ${folder}`); continue; }
  outNames.forEach((outName, i) => {
    if (imgs[i]) { copyFileSync(imgs[i].p, join(OUT_HERO, outName)); copied++;
      console.log(`  ok    ${folder}[${i}]  ->  hero/${outName}`); }
  });
}

console.log(`\nDone. Copied ${copied} files. ${missing.length ? "Missing folders: " + missing.join(", ") : "No missing folders."}`);
console.log("Next: wire <Image> tags into hero sections + configurator/products cards using these filenames.");
