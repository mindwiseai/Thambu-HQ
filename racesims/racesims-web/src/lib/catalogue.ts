// RaceSims configurator data — source of truth: wiki/concepts/racesims-catalogue.md
// Prices are INR MRP, indicative (May 2026). Confirmed at quote. Configurator
// total = sum of selected option prices + selected add-on packs.

export type Option = {
  id: string;
  label: string;
  brand?: string;
  price: number;          // absolute INR
  note: string;           // race-engineer rationale
  default?: boolean;
};

export type ComponentGroup = {
  id: string;
  name: string;
  why: string;            // why this decision matters
  options: Option[];
};

export const COMPONENTS: ComponentGroup[] = [
  {
    id: "wheelbase",
    name: "Wheelbase",
    why: "The spine of the build. The motor that generates force feedback — pick this first, everything matches its capability.",
    options: [
      { id: "ares-apex-8", label: "Ares Apex 8Nm CDR QR", brand: "Conspit", price: 49999, note: "Entry into real direct-drive FFB. Enough headroom to learn proper inputs without overwhelming a budget rig." },
      { id: "ares-12", label: "Ares 12Nm CDR QR", brand: "Conspit", price: 59999, default: true, note: "The sweet spot for GT content — proper kerb feel, stable on any rig. The default for a reason." },
      { id: "vnm-premier-13", label: "Direct Drive Premier 13Nm", brand: "VNM", price: 75000, note: "Step into the VNM ecosystem — the right base if a motion platform is on your horizon." },
      { id: "ares-plat-20", label: "Ares Platinum 20Nm CDR QR", brand: "Conspit", price: 85000, note: "Aerospace-alloy body, 24/7 commercial-rated. Conspit's flagship for the standard line." },
      { id: "vnm-elite-18", label: "Direct Drive Elite 18Nm", brand: "VNM", price: 95000, note: "Covers all current content — rally, GT, formula. The VNM motion-path pick." },
      { id: "vnm-supreme-25", label: "Direct Drive Supreme 25Nm", brand: "VNM", price: 115000, note: "Pro-tier. The torque/build intersection that suits a serious league racer or coach." },
      { id: "vnm-xtreme-32", label: "Direct Drive Xtreme 32Nm", brand: "VNM", price: 140000, note: "Matches real-car telemetry at extreme cornering loads. Pro drivers and full-motion rigs only." },
    ],
  },
  {
    id: "wheel",
    name: "Steering wheel",
    why: "Your most-touched component. Real materials, real feel — this is the interface to the car.",
    options: [
      { id: "c310-apex", label: "310 APEX", brand: "Conspit", price: 39999, note: "Round rim, beginner-friendly. The right starting point for any serious customer." },
      { id: "c300gt", label: "300GT", brand: "Conspit", price: 49999, default: true, note: "Carbon-fibre construction, integrated display, premium buttons. The default GT wheel." },
      { id: "vnm-gt-v1", label: "GT Steering Wheel V1", brand: "VNM", price: 59999, note: "Brand-matched paddles and buttons for the VNM ecosystem." },
      { id: "c290gp", label: "290GP", brand: "Conspit", price: 69500, note: "F1/F2-style flat-front grip. Bridges GT and formula content." },
      { id: "max-01", label: "MAX-01", brand: "Conspit", price: 76500, note: "Dual rotary encoders, 12 buttons, OLED telemetry. For drivers who know their inputs." },
      { id: "pw-1", label: "PW-1 Formula", brand: "Conspit", price: 210000, note: "The pro F1 wheel. Magnetic paddles, OLED screen, motorsport-grade switches." },
    ],
  },
  {
    id: "pedals",
    name: "Pedals",
    why: "Where most lap time lives. Cheap pedals undercut an expensive wheelbase — we don't sell mismatched stacks.",
    options: [
      { id: "cpp-apex", label: "CPP Apex (2-pedal)", brand: "Conspit", price: 33000, note: "Entry serious set. Industrial load-cell brake — the modulation curve real braking feels like." },
      { id: "vnm-lite", label: "Lite Pedal (2-pedal)", brand: "VNM", price: 42000, default: true, note: "Load-cell brake, the right anchor for the default. Headroom for serious GT/circuit content." },
      { id: "cpp-lite-2", label: "CPP Lite (2-pedal)", brand: "Conspit", price: 59999, note: "Mid-tier load cell — the step up once you're doing time trials seriously." },
      { id: "cpp-evo-2", label: "CPP EVO V2 (2-pedal)", brand: "Conspit", price: 79999, note: "Hydraulic-feel brake, 200kg load cell. Feels like an actual pedal box." },
      { id: "cpp-evo-3", label: "CPP EVO V2 (3-pedal + clutch)", brand: "Conspit", price: 95999, note: "Adds the clutch for formula and H-pattern. The flagship for serious racers." },
    ],
  },
  {
    id: "cockpit",
    name: "Cockpit frame",
    why: "Built in Chennai from 40×40 / 40×80 aluminium profile. Local manufacturing = quick service and customisation no imported rig offers.",
    options: [
      { id: "gt-cockpit", label: "RaceSims GT Sim Cockpit", brand: "RaceSims", price: 38500, default: true, note: "Handles GT, formula (with formula wheel + 3-pedal) and rally (with handbrake add-on)." },
    ],
  },
  {
    id: "seat",
    name: "Seat",
    why: "The seat absorbs every input. Geometry matched to how committed you are to the discipline.",
    options: [
      { id: "premium-recliner", label: "Premium Recliner", brand: "RaceSims", price: 29500, note: "Comfortable motorsport profile — the entry choice for long sessions." },
      { id: "sport-recliner", label: "Sport Recliner", brand: "RaceSims", price: 36500, default: true, note: "Stiffer support, racing-spec geometry. Right for between casual and serious." },
      { id: "pro-fixed", label: "Pro Fixed-Back Bucket", brand: "RaceSims", price: 39500, note: "Stiff, narrow, no recline — the proper GT/circuit seat." },
      { id: "pro-xl", label: "Pro X-Large Fixed-Back", brand: "RaceSims", price: 45500, note: "Same geometry, more shoulder and hip room for drivers over 110 kg." },
    ],
  },
  {
    id: "display",
    name: "Display",
    why: "Field of view is lap time. Triple at race speed; ultrawide for a clean single-screen build.",
    options: [
      { id: "single-34", label: "Single 34\" Ultrawide", brand: "Gigabyte G34WQC", price: 57000, note: "Wider FOV than a flat 27/32 without going triple. The single-screen default." },
      { id: "triple-27", label: "Triple 27\" 1080p", brand: "Gigabyte GS27F", price: 68000, note: "Surround FOV at minimum cost — the budget triple." },
      { id: "triple-32", label: "Triple 32\" 1440p", brand: "Gigabyte GS32QC", price: 92000, default: true, note: "165Hz curved, with precision-alignment stand. Best balance of size, refresh and price." },
      { id: "single-49-oled", label: "Single 49\" OLED Curved", brand: "Gigabyte CO49DQ", price: 157000, note: "OLED contrast, 144Hz, ultra-curve. Best single-monitor option in the line." },
    ],
  },
  {
    id: "pc",
    name: "Sim PC",
    why: "Built to order. Ryzen X3D + RTX class GPU — the right compute for high-refresh triple at race speed.",
    options: [
      { id: "standard", label: "Standard Build", brand: "RaceSims", price: 240000, default: true, note: "Ryzen 7 9800X3D · RTX 5070 Ti · 32GB DDR5-6000 · 1TB Gen4 · 360 AIO · Win 11." },
    ],
  },
  {
    id: "audio",
    name: "Audio",
    why: "Not an afterthought. The cabin is half the immersion — engine note, surface, slip, all of it.",
    options: [
      { id: "mid", label: "Mid Tier", brand: "Logitech + Creative + Razer", price: 75000, default: true, note: "Z906 5.1 + Sound Blaster AE-5+ + Razer BlackShark V2 Hyperspeed." },
      { id: "sonos-beam", label: "High-End — Sonos Beam", brand: "Sonos + Audeze", price: 190000, note: "Beam Gen 2 + Sub Mini + 2× Era 100 + Audeze Maxwell." },
      { id: "sonos-arc", label: "High-End — Sonos Arc Ultra", brand: "Sonos + Audeze", price: 250000, note: "Arc Ultra + Sub Gen 3 + 2× Era 100 + Audeze Maxwell — the flagship cabin." },
    ],
  },
  {
    id: "haptics",
    name: "Haptics",
    why: "Bass transducers put the road into the seat — ABS rumble, kerb strike, traction loss, felt not heard.",
    options: [
      { id: "standard", label: "Standard", brand: "Dayton + Nobsound", price: 17000, default: true, note: "2× Dayton BTS-1 + Nobsound USB DAC amp + RaceSims mount kit." },
      { id: "premium", label: "Premium", brand: "ButtKicker", price: 117000, note: "ButtKicker LFE kit + amp — the most physical haptic option in the line." },
    ],
  },
];

export type AddOn = { id: string; name: string; price: number; note: string };

export const ADDONS: AddOn[] = [
  { id: "rally",   name: "Rally Pack",          price: 39000,  note: "VNM 1.5 Rally Handbrake + mount. Required for serious rally — no base sim ships a handbrake." },
  { id: "shifter", name: "Shifter Pack",        price: 39000,  note: "VNM Sequential / H-Pattern shifter + mount. For classic GT and rally." },
  { id: "motion",  name: "Motion Add-on (3DOF)",price: 600000, note: "VNM 3DOF Motion Kit — 4 actuators. Pitch, roll, heave. Pair with Pro-tier controls." },
  { id: "cabin",   name: "Cabin Comfort Pack",  price: 6000,   note: "HD castor wheels + mouse tray for long sessions." },
  { id: "office",  name: "Office Integration",  price: 12500,  note: "Keyboard tray + integrated PC stand — for the rig room that doubles as a desk." },
  { id: "immersion", name: "Immersion Pack",    price: 8000,   note: "LED strip channel + Hue Play + dual wind simulators." },
  { id: "branding",name: "Branding Pack",       price: 4000,   note: "RaceSims 3D-printed badge, phone holder, custom shift knob." },
];

export type Preset = {
  id: string; name: string; tagline: string; profile: string;
  selections: Record<string, string>;
  addons: string[];
};

export const PRESETS: Preset[] = [
  {
    id: "starter", name: "Starter", tagline: "Learn it right", profile: "New to sim racing, single screen, building the fundamentals.",
    selections: { wheelbase: "ares-apex-8", wheel: "c310-apex", pedals: "cpp-apex", cockpit: "gt-cockpit", seat: "premium-recliner", display: "single-34", pc: "standard", audio: "mid", haptics: "standard" },
    addons: [],
  },
  {
    id: "sim", name: "The Sim", tagline: "The one most should buy", profile: "Serious league racer, triple screen — the volume build, engineered to balance.",
    selections: { wheelbase: "ares-12", wheel: "c300gt", pedals: "vnm-lite", cockpit: "gt-cockpit", seat: "sport-recliner", display: "triple-32", pc: "standard", audio: "mid", haptics: "standard" },
    addons: [],
  },
  {
    id: "pro", name: "Pro", tagline: "Everything, dialled", profile: "Pro / academy / commercial. Full motion, pro F1 wheel, flagship cabin.",
    selections: { wheelbase: "vnm-supreme-25", wheel: "pw-1", pedals: "cpp-evo-3", cockpit: "gt-cockpit", seat: "pro-xl", display: "triple-32", pc: "standard", audio: "sonos-arc", haptics: "standard" },
    addons: ["motion"],
  },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export function optionById(groupId: string, optId: string): Option | undefined {
  return COMPONENTS.find((g) => g.id === groupId)?.options.find((o) => o.id === optId);
}

export function totalFor(selections: Record<string, string>, addons: string[]): number {
  const comp = COMPONENTS.reduce((sum, g) => {
    const sel = selections[g.id];
    const opt = g.options.find((o) => o.id === sel) ?? g.options.find((o) => o.default);
    return sum + (opt?.price ?? 0);
  }, 0);
  const add = addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
  return comp + add;
}

export function defaultSelections(): Record<string, string> {
  return Object.fromEntries(
    COMPONENTS.map((g) => [g.id, (g.options.find((o) => o.default) ?? g.options[0]).id])
  );
}
