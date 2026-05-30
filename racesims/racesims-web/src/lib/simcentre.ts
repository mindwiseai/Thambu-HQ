// RaceSims Chennai Sim Centre — source: wiki/hot.md + racesims-chennai-premium-baseline.
// Nungambakkam, Chennai. Opens July 2026. 8 rigs (7 static + 1 motion).

export const CENTRE = {
  city: "Chennai",
  area: "Nungambakkam",
  opens: "July 2026",
  hours: "10:00 – 22:00, daily",
  rigs: 8,
  floor: "~1,140 sq ft purpose-built floor",
};

// Master rate card (wiki: racesims-master-rate-card)
export const RATES = [
  { id: "30",     label: "30 minutes",      price: 750,  unit: "/ session", note: "Best for a first taste or a quick hot-lap session." },
  { id: "60",     label: "1 hour",          price: 1250, unit: "/ hour",    note: "The standard stint. Time to warm tyres and chase a time." },
  { id: "motion", label: "Motion rig",      price: 500,  unit: "/ hour add-on", note: "Add full 3DOF motion to any hour on the motion rig." },
];

export type Rig = {
  id: string; name: string; kind: "Formula / GT" | "Rally / GT" | "Motion";
  base: string; wheel: string; controls: string; motion: boolean;
};

// 4 Formula/GT (Apex 2-pedal) + 4 Rally/GT (VNM 3-pedal + shifter + handbrake);
// one of the eight is the motion rig.
export const RIGS: Rig[] = [
  { id: "R1", name: "Apex 01", kind: "Formula / GT", base: "Conspit Ares Platinum 20Nm", wheel: "Conspit 300GT",  controls: "2-pedal load cell", motion: false },
  { id: "R2", name: "Apex 02", kind: "Formula / GT", base: "Conspit Ares Platinum 20Nm", wheel: "Conspit 290GP",  controls: "2-pedal load cell", motion: false },
  { id: "R3", name: "Apex 03", kind: "Formula / GT", base: "Conspit Ares 12Nm",          wheel: "Conspit 300GT",  controls: "2-pedal load cell", motion: false },
  { id: "R4", name: "Apex 04", kind: "Formula / GT", base: "Conspit Ares 12Nm",          wheel: "Conspit MAX-01", controls: "2-pedal load cell", motion: false },
  { id: "R5", name: "Rally 01",kind: "Rally / GT",   base: "VNM Direct Drive Elite 18Nm", wheel: "VNM GT V1",     controls: "3-pedal + sequential + handbrake", motion: false },
  { id: "R6", name: "Rally 02",kind: "Rally / GT",   base: "VNM Direct Drive Elite 18Nm", wheel: "VNM GT V1",     controls: "3-pedal + sequential + handbrake", motion: false },
  { id: "R7", name: "Rally 03",kind: "Rally / GT",   base: "VNM Direct Drive Supreme 25Nm",wheel: "VNM GT V1",    controls: "3-pedal + sequential + handbrake", motion: false },
  { id: "R8", name: "Motion 01",kind: "Motion",      base: "VNM Direct Drive Supreme 25Nm",wheel: "Conspit PW-1 Formula", controls: "3-pedal + VNM 3DOF motion platform", motion: true },
];

// Booking grid time slots (centre hours, 1-hour blocks).
export const SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
];

export const SIMS = [
  "Assetto Corsa", "Assetto Corsa Competizione", "iRacing",
  "EA WRC", "Le Mans Ultimate", "rFactor 2", "Automobilista 2",
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
