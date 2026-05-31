// Driver Account data model + helpers. Tier thresholds and the demo journey
// (used in preview mode when Supabase isn't configured) live here.

export type Tier = "Rookie" | "Club" | "Pro" | "Elite";

export const TIERS: { name: Tier; min: number; perk: string }[] = [
  { name: "Rookie", min: 0, perk: "Welcome to the grid — every journey starts here." },
  { name: "Club", min: 500, perk: "5% off accessories · priority centre booking." },
  { name: "Pro", min: 1500, perk: "10% off · free motion add-on hours · league seeding." },
  { name: "Elite", min: 4000, perk: "Coaching credits · early hardware access · paddock invites." },
];

export function tierFor(points: number): Tier {
  return [...TIERS].reverse().find((t) => points >= t.min)?.name ?? "Rookie";
}
export function nextTier(points: number) {
  return TIERS.find((t) => t.min > points) ?? null;
}

export type Profile = {
  id: string;
  display_name: string | null;
  home_centre: string | null;
  tier: string | null;
  points: number | null;
  created_at?: string;
};

export type JourneyEvent = {
  id: string;
  kind: "session" | "milestone" | "tier" | "league";
  title: string;
  detail: string | null;
  points: number | null;
  occurred_at: string;
};

export type SavedBuild = {
  id: string;
  name: string;
  preset: string | null;
  selections: Record<string, string>;
  addons: string[];
  total: number;
  created_at: string;
};

export type Booking = {
  id: string;
  rig: string;
  slot: string;
  duration: string;
  motion: boolean;
  booked_for: string;
  status: string;
};

// Demo data shown in preview mode (no Supabase yet) so the dashboard reads as
// real. Clearly fictional, labelled "preview" in the UI.
export const DEMO_PROFILE: Profile = {
  id: "demo",
  display_name: "Driver",
  home_centre: "Chennai",
  tier: "Club",
  points: 720,
};

export const DEMO_JOURNEY: JourneyEvent[] = [
  { id: "1", kind: "league", title: "Round 1 — Monza", detail: "Best lap 1:24.9 · P2 at RaceSims Chennai", points: 180, occurred_at: "2026-04-25" },
  { id: "2", kind: "session", title: "Motion rig — 1 hr", detail: "GT3 at Spa. Braking consistency +0.3s", points: 60, occurred_at: "2026-04-18" },
  { id: "3", kind: "tier", title: "Reached Club tier", detail: "Unlocked 5% off accessories + priority booking", points: 0, occurred_at: "2026-04-10" },
  { id: "4", kind: "session", title: "Coaching session", detail: "Telemetry review with the race engineer", points: 120, occurred_at: "2026-03-28" },
  { id: "5", kind: "milestone", title: "Joined RaceSims", detail: "Driver account created", points: 0, occurred_at: "2026-03-20" },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function fmtDate(d: string) {
  return new Date(d + (d.length === 10 ? "T00:00:00Z" : "")).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}
