// Indian Esports Racing League (IERL) — source: racesims/ierl/config + fixtures.
// Monthly hot-lap series + season championship on Assetto Corsa across the
// RaceSims partner network. Public leaderboard: indianesportsracingleague.com

export type Round = {
  n: number; name: string; track: string; country: string;
  car: string; carClass: string;
  opens: string; closes: string;       // ISO date (UTC window)
  status: "complete" | "live" | "upcoming";
};

export const SEASON = 2026;

// R1 is real (config/events.json). R2–R8 scheduled cadence: opens 1st, closes
// month-end. Editable in one place when the live config is synced.
export const ROUNDS: Round[] = [
  { n: 1, name: "Round 1 — Monza",        track: "Autodromo Nazionale Monza", country: "Italy",     car: "RSS Formula Hybrid X 2026", carClass: "Open Wheel", opens: "2026-04-01", closes: "2026-04-30", status: "live" },
  { n: 2, name: "Round 2 — Spa",          track: "Spa-Francorchamps",          country: "Belgium",   car: "BMW M4 GT3",                carClass: "GT3",        opens: "2026-05-01", closes: "2026-05-31", status: "upcoming" },
  { n: 3, name: "Round 3 — Suzuka",       track: "Suzuka Circuit",             country: "Japan",     car: "Honda NSX GT3 Evo",         carClass: "GT3",        opens: "2026-06-01", closes: "2026-06-30", status: "upcoming" },
  { n: 4, name: "Round 4 — Silverstone",  track: "Silverstone",                country: "UK",        car: "RSS Formula Hybrid X 2026", carClass: "Open Wheel", opens: "2026-07-01", closes: "2026-07-31", status: "upcoming" },
  { n: 5, name: "Round 5 — Mount Panorama",track: "Bathurst",                  country: "Australia", car: "Mercedes-AMG GT3",          carClass: "GT3",        opens: "2026-08-01", closes: "2026-08-31", status: "upcoming" },
  { n: 6, name: "Round 6 — Nürburgring",  track: "Nürburgring GP",             country: "Germany",   car: "Porsche 911 GT3 R",         carClass: "GT3",        opens: "2026-09-01", closes: "2026-09-30", status: "upcoming" },
  { n: 7, name: "Round 7 — Imola",        track: "Imola",                      country: "Italy",     car: "Ferrari 296 GT3",           carClass: "GT3",        opens: "2026-10-01", closes: "2026-10-31", status: "upcoming" },
  { n: 8, name: "Round 8 — Interlagos",   track: "Interlagos",                 country: "Brazil",    car: "RSS Formula Hybrid X 2026", carClass: "Open Wheel", opens: "2026-11-01", closes: "2026-11-30", status: "upcoming" },
];

// Weekly cadence at partner centres (the Chennai Sim Centre hosts live finals).
export const RACE_NIGHT = {
  day: "Every round runs all month — live grand final on the last Sunday",
  finalTime: "19:00 IST",
  platform: "Assetto Corsa",
  format: "Single fastest valid hot lap. 10% qualification cut to the grand final.",
};

export type Driver = { pos: number; name: string; centre: string; lap: string; gap: string; pts: number };

// Sample Round 1 leaderboard (valid laps from the Monza fixture + championship-style points).
export const R1_LEADERBOARD: Driver[] = [
  { pos: 1, name: "Jitmanyu Singh Shekhawat", centre: "Sim Racing Adda", lap: "1:24.647", gap: "—",      pts: 25 },
  { pos: 2, name: "Aarav Mehta",              centre: "RaceSims Chennai", lap: "1:24.912", gap: "+0.265", pts: 18 },
  { pos: 3, name: "Kabir Nair",               centre: "RaceSims Bengaluru",lap: "1:25.134", gap: "+0.487", pts: 15 },
  { pos: 4, name: "Rohan Iyer",               centre: "RaceSims Mumbai",  lap: "1:25.401", gap: "+0.754", pts: 12 },
  { pos: 5, name: "Vivaan Reddy",             centre: "RaceSims Hyderabad",lap: "1:25.688", gap: "+1.041", pts: 10 },
  { pos: 6, name: "Arjun Sharma",             centre: "RaceSims Delhi",   lap: "1:25.902", gap: "+1.255", pts: 8 },
  { pos: 7, name: "Dev Kulkarni",             centre: "RaceSims Chennai", lap: "1:26.180", gap: "+1.533", pts: 6 },
  { pos: 8, name: "Ishaan Verma",             centre: "RaceSims Bengaluru",lap: "1:26.455", gap: "+1.808", pts: 4 },
];

export type Partner = { slug: string; name: string; city: string; state: string };

export const PARTNERS: Partner[] = [
  { slug: "racesims-chennai",   name: "RaceSims Chennai",   city: "Chennai",   state: "Tamil Nadu" },
  { slug: "racesims-bengaluru", name: "RaceSims Bengaluru", city: "Bengaluru", state: "Karnataka" },
  { slug: "racesims-mumbai",    name: "RaceSims Mumbai",    city: "Mumbai",    state: "Maharashtra" },
  { slug: "racesims-delhi",     name: "RaceSims Delhi",     city: "New Delhi", state: "Delhi" },
  { slug: "racesims-hyderabad", name: "RaceSims Hyderabad", city: "Hyderabad", state: "Telangana" },
  { slug: "sim-racing-adda",    name: "Sim Racing Adda",    city: "Faridabad", state: "Haryana" },
];

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
