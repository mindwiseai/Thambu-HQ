// RaceSims centre network — location-aware from day one.
// Chennai is centre[0]. The 43-centre national rollout (wiki:
// racesims-india-saturation-plan) becomes *adding rows here*, not rebuilding
// pages. Booking, Academy and League all reference a centre by slug.

export type CentreStatus = "open" | "opening" | "planned";
export type CentreFormat = "Mega Flagship" | "Boutique";

export type Centre = {
  slug: string;
  name: string;       // "RaceSims Chennai"
  city: string;
  area: string;
  state: string;
  status: CentreStatus;
  opens: string;      // human label
  format: CentreFormat;
  rigs: number;
  tier: "Tier 1" | "Tier 2";
  flagship?: boolean;
};

export const CENTRES: Centre[] = [
  {
    slug: "chennai", name: "RaceSims Chennai", city: "Chennai", area: "Nungambakkam",
    state: "Tamil Nadu", status: "opening", opens: "July 2026",
    format: "Mega Flagship", rigs: 8, tier: "Tier 1", flagship: true,
  },
  // The network ahead (wiki: racesims-india-saturation-plan — 43 centres / 5yr).
  // Listed as "planned" so the Centres page tells the national story honestly.
  { slug: "bengaluru", name: "RaceSims Bengaluru", city: "Bengaluru", area: "—", state: "Karnataka", status: "planned", opens: "2027", format: "Mega Flagship", rigs: 10, tier: "Tier 1" },
  { slug: "mumbai",    name: "RaceSims Mumbai",    city: "Mumbai",    area: "—", state: "Maharashtra", status: "planned", opens: "2027", format: "Mega Flagship", rigs: 10, tier: "Tier 1" },
  { slug: "hyderabad", name: "RaceSims Hyderabad", city: "Hyderabad", area: "—", state: "Telangana",  status: "planned", opens: "2027", format: "Boutique",     rigs: 6,  tier: "Tier 1" },
  { slug: "delhi",     name: "RaceSims Delhi NCR", city: "New Delhi", area: "—", state: "Delhi",      status: "planned", opens: "2028", format: "Mega Flagship", rigs: 10, tier: "Tier 1" },
];

export const flagship = CENTRES.find((c) => c.flagship) ?? CENTRES[0];
export const openCentres = CENTRES.filter((c) => c.status !== "planned");
export const centreBySlug = (slug: string) => CENTRES.find((c) => c.slug === slug);

// Network ambition (wiki: racesims-india-saturation-plan)
export const NETWORK = {
  target: 43,
  cities: "8 Tier-1 + 18 Tier-2 cities",
  years: 5,
  revenue: "₹105 cr network revenue at saturation",
};
