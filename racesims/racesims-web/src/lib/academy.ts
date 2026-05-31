// RaceSims Motorsport Academy — source: wiki racesims-motorsport-academy,
// racesims-academy-curriculum (B·D·A·D), and the per-programme curriculum pages.
// The Academy is the *programme*, runs *at* any centre (location-aware).

export type Programme = {
  slug: string;
  tier: string;            // "Tier 1" etc, or "Corporate" / "Track Day"
  name: string;
  tagline: string;
  sessions: string;        // "4 sessions × 1 hr"
  price: number;           // INR per person
  prereq: string | null;   // licence required
  earns: string | null;    // licence/outcome granted
  forWho: string;
  about: string;
  platforms: string;
  outcomes: string[];      // what you'll be able to do
  track: "circuit" | "rally" | "engineering" | "real";
};

// The four-beat lesson shape every session runs on.
export const BDAD = [
  { k: "Brief", t: "~10 min", d: "One concept per session. Whiteboard + a real telemetry example." },
  { k: "Drill", t: "~20 min", d: "The skill isolated — e.g. braking with no steering. Build the motor pattern." },
  { k: "Apply", t: "~25 min", d: "The skill returned to a full lap or stage, under realistic conditions." },
  { k: "Debrief", t: "~5 min", d: "Read the telemetry trace against the target. Set the next session's goal." },
];

export const PROGRAMMES: Programme[] = [
  {
    slug: "initiation", tier: "Tier 1 · Foundation", name: "Initiation",
    tagline: "Your first real laps, the right way",
    sessions: "4 sessions × 1 hr", price: 8000, prereq: null, earns: "Initiation Licence",
    forWho: "Complete beginners and casual gamers ready to learn properly.",
    about: "The foundation. Racing line, braking, throttle control and the basics of car control — taught as skills, not vibes. Ends with your Initiation Licence, the key that unlocks the advanced tiers.",
    platforms: "Assetto Corsa · Assetto Corsa Competizione",
    outcomes: ["Hit a consistent racing line", "Brake later, with control", "Read a corner before you reach it", "Earn the Initiation Licence"],
    track: "circuit",
  },
  {
    slug: "advanced-circuit", tier: "Tier 2 · Circuit", name: "Advanced Circuit",
    tagline: "From licensed to competitive",
    sessions: "8 sessions × 1 hr", price: 20000, prereq: "Initiation Licence", earns: "Circuit Race Licence",
    forWho: "Licensed drivers chasing real lap time and race craft.",
    about: "Trail-braking, advanced weight transfer, race starts, overtaking and defending. Telemetry-led throughout — you'll see exactly where the time is and how to take it.",
    platforms: "Assetto Corsa · ACC · iRacing",
    outcomes: ["Trail-brake into apex", "Manage tyres over a stint", "Race wheel-to-wheel", "Earn the Circuit Race Licence"],
    track: "circuit",
  },
  {
    slug: "advanced-rally", tier: "Tier 2 · Rally", name: "Advanced Rally",
    tagline: "Master the loose surface",
    sessions: "10 sessions × 1 hr", price: 25000, prereq: "Initiation Licence", earns: "Rally Licence",
    forWho: "Drivers who want to slide, commit and read pace notes.",
    about: "ARKA-endorsed syllabus shaped by Mr. Leelakrishnan's 7× national-champion technique. Gravel car control, the Scandinavian flick, and the pace-note system — two skill domains the circuit never touches.",
    platforms: "Assetto Corsa Rally · Richard Burns Rally",
    outcomes: ["Control the car on gravel", "Execute the Scandinavian flick", "Drive to pace notes", "Earn the Rally Licence"],
    track: "rally",
  },
  {
    slug: "sim-reality", tier: "Tier 3 · The Bridge", name: "Sim + Reality",
    tagline: "Where the sim meets the real car",
    sessions: "4 sim-prep sessions + 1 real-car day", price: 0, prereq: "A Race Licence", earns: "Real-car track experience",
    forWho: "Licensed drivers ready to take it to a real circuit.",
    about: "Four targeted sim sessions that prepare you for a specific real circuit, then a real-car track day. This is the rung that makes the Ladder real — no one else in India runs it. Price on application.",
    platforms: "Sim prep + real car at MMRT / Coimbatore",
    outcomes: ["Translate sim skill to a real car", "Walk a real circuit prepared", "Log real track time", "Climb toward the Ladder prize"],
    track: "real",
  },
  {
    slug: "tuner-lab", tier: "Corporate / Engineering", name: "Tuner Lab",
    tagline: "How engineers actually win races",
    sessions: "8 sessions × 3 hrs", price: 28000, prereq: null, earns: "Setup & data fundamentals",
    forWho: "Engineering-minded enthusiasts and corporate teams.",
    about: "Vehicle dynamics and car setup taught as real engineering and a teamwork metaphor: gather data → hypothesis → one change → test → iterate. Every corporate offsite is paintball; this one teaches your team how engineers solve problems — and ends in a race.",
    platforms: "Assetto Corsa + setup tooling",
    outcomes: ["Read the friction circle & weight transfer", "Tune springs, dampers, aero", "Run the data-driven setup loop", "Win as a team"],
    track: "engineering",
  },
  {
    slug: "track-day", tier: "Track Day", name: "Track Day Prep",
    tagline: "Arrive at the circuit ready",
    sessions: "90-min sessions", price: 0, prereq: null, earns: "Circuit-specific preparation",
    forWho: "Supercar owners prepping for MMRT, Buddh or Coimbatore.",
    about: "Circuit-specific preparation for owners heading to a real track day. Learn the laps, the braking markers and the line on the exact circuit you'll drive — before you risk your car on it. Price on application.",
    platforms: "Laser-scanned real circuits",
    outcomes: ["Know the circuit cold", "Nail braking markers", "Build confidence before track day", "Protect your car & your time"],
    track: "circuit",
  },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
