import type { Metadata } from "next";
import { Reveal, CountUp } from "@/components/Reveal";
import { Booking } from "@/components/simcentre/Booking";
import { CENTRE, RATES, RIGS, SIMS, inr, type Rig } from "@/lib/simcentre";

export const metadata: Metadata = {
  title: "Chennai Sim Centre | RaceSims",
  description:
    "8 rigs, 1,140 sq ft, 7 sim titles — RaceSims Chennai opens July 2026 in Nungambakkam. Book your seat now.",
};

export default function SimCentrePage() {
  const formulaRigs = RIGS.filter((r) => r.kind === "Formula / GT");
  const rallyRigs = RIGS.filter((r) => r.kind === "Rally / GT");
  const motionRigs = RIGS.filter((r) => r.kind === "Motion");

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] bg-carbon grain grid-lines grid-lines-fade flex flex-col justify-end overflow-hidden pt-20">
        {/* Gradient fade at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-carbon to-transparent z-10" />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
          <Reveal>
            <p className="kicker mb-6">
              Chennai · Nungambakkam · Opens {CENTRE.opens}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="headline text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-foreground max-w-4xl">
              The Chennai{" "}
              <br className="hidden sm:block" />
              <span className="text-flame">Sim Centre</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 flex items-center gap-2">
              <span className="live-dot" />
              <span className="mono text-xs uppercase tracking-widest text-signal">
                Opening July 2026 — reserve your seat now
              </span>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={240}>
            <div className="mt-10 grid grid-cols-3 gap-px border border-line bg-line max-w-lg">
              <StatCell label="Rigs">
                <CountUp to={CENTRE.rigs} suffix=" rigs" />
              </StatCell>
              <StatCell label="Floor">
                <CountUp to={1140} suffix=" sq ft" />
              </StatCell>
              <StatCell label="Titles">
                <CountUp to={7} suffix=" sims" />
              </StatCell>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#book" className="btn btn-flame">
                Reserve a seat
              </a>
              <a href="#fleet" className="btn btn-ghost">
                See the fleet
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. RATE CARD ─────────────────────────────────────────────────── */}
      <section className="bg-carbon py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-3">Pricing</p>
            <h2 className="headline text-3xl sm:text-4xl mb-12">Rate card</h2>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {RATES.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div
                  className={`clip-corner h-full rounded-sm border p-6 flex flex-col ${
                    r.id === "motion"
                      ? "border-flame/40 bg-flame/5"
                      : "border-line bg-carbon-2"
                  }`}
                >
                  {r.id === "motion" && (
                    <span className="kicker text-flame mb-3">Add-on</span>
                  )}
                  <div className="mb-2">
                    <span className="mono tnum text-4xl font-bold text-amber">
                      {inr(r.price)}
                    </span>
                    <span className="mono text-xs text-fog ml-2">{r.unit}</span>
                  </div>
                  <p className="font-display text-lg uppercase text-foreground mb-3">
                    {r.label}
                  </p>
                  <p className="text-sm text-fog leading-relaxed mt-auto">{r.note}</p>
                  {r.id === "motion" && (
                    <div className="mt-4 flex items-center gap-2">
                      <span className="live-dot live-dot-red" />
                      <span className="mono text-[0.6rem] uppercase tracking-widest text-flame">
                        3DOF Motion
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <p className="mono text-[0.65rem] text-fog-2 mt-6">
              Prices indicative · INR · confirmed at booking · pre-opening reservations for July 2026
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. THE FLEET ─────────────────────────────────────────────────── */}
      <section id="fleet" className="bg-carbon-2 py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-3">8 stations · purpose-built floor</p>
            <h2 className="headline text-3xl sm:text-4xl mb-3">The Fleet</h2>
            <p className="text-fog max-w-xl mb-12">
              Four Formula / GT bays with Conspit Ares direct-drive, four Rally / GT stations
              with VNM Elite & Supreme, and one full 3DOF motion rig.
            </p>
          </Reveal>

          {/* Formula / GT */}
          <RigGroup label="Formula · GT" accent="amber" rigs={formulaRigs} />

          {/* Rally / GT */}
          <RigGroup label="Rally · GT" accent="fog" rigs={rallyRigs} />

          {/* Motion */}
          <RigGroup label="Motion" accent="flame" rigs={motionRigs} />
        </div>
      </section>

      {/* ── 4. SIMS ──────────────────────────────────────────────────────── */}
      <section className="bg-carbon py-16 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-4">Sim library</p>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {SIMS.map((sim, i) => (
              <Reveal key={sim} delay={i * 40}>
                <span className="rounded-sm border border-line bg-carbon-3 px-3 py-1.5 mono text-xs text-fog">
                  {sim}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BOOKING ───────────────────────────────────────────────────── */}
      <section id="book" className="bg-carbon-2 py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-3">Pre-opening reservations</p>
            <h2 className="headline text-3xl sm:text-4xl mb-2">Reserve a seat</h2>
            <p className="text-fog max-w-xl mb-10 text-sm leading-relaxed">
              The centre opens July 2026. Secure your spot now — no charge until we
              confirm your booking by WhatsApp.
            </p>
          </Reveal>
          <Booking />
        </div>
      </section>

      {/* ── 6. HOW IT WORKS + GETTING HERE ───────────────────────────────── */}
      <section className="bg-paper text-ink py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* How it works */}
            <div>
              <Reveal>
                <p className="kicker text-fog mb-3">Process</p>
                <h2 className="headline text-3xl text-ink mb-8">How it works</h2>
              </Reveal>
              <ol className="space-y-6">
                {[
                  { n: "01", title: "Reserve online", body: "Pick your date, rig, duration, and slot. No payment now." },
                  { n: "02", title: "Confirm by WhatsApp", body: "We confirm your booking via WhatsApp before the centre opens." },
                  { n: "03", title: "Arrive at Nungambakkam", body: `Walk in during ${CENTRE.hours}. The rig is set up and ready.` },
                  { n: "04", title: "Drive", body: "Helmet on. Tyres warm. The engineer is watching telemetry." },
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 80}>
                    <li className="flex gap-4">
                      <span className="mono text-fog-2 text-sm mt-0.5 flex-shrink-0">{step.n}</span>
                      <div>
                        <p className="font-display text-sm uppercase text-ink mb-1">{step.title}</p>
                        <p className="text-sm text-fog leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Getting here */}
            <div>
              <Reveal>
                <p className="kicker text-fog mb-3">Location</p>
                <h2 className="headline text-3xl text-ink mb-8">Getting here</h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="border border-ink/10 rounded-sm p-6 space-y-4">
                  <div>
                    <p className="kicker text-fog mb-1">Address</p>
                    <p className="text-sm text-ink leading-relaxed">
                      Nungambakkam<br />Chennai, Tamil Nadu<br />India
                    </p>
                  </div>
                  <div>
                    <p className="kicker text-fog mb-1">Hours</p>
                    <p className="mono text-sm text-ink">{CENTRE.hours}</p>
                  </div>
                  <div>
                    <p className="kicker text-fog mb-1">Contact</p>
                    <a
                      href="mailto:thambu@racesims.in"
                      className="ulink mono text-sm text-ink"
                    >
                      thambu@racesims.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2 border-t border-ink/10 pt-4">
                    <span className="live-dot" />
                    <span className="mono text-[0.65rem] uppercase tracking-widest text-fog">
                      Opening {CENTRE.opens}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* CTA band */}
          <Reveal delay={200}>
            <div className="mt-20 flex flex-col items-center gap-4 text-center border-t border-ink/10 pt-12">
              <p className="headline text-2xl sm:text-3xl text-ink">
                Your seat is waiting.
              </p>
              <a href="#book" className="btn btn-ink mt-2">
                Reserve a seat
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─── Sub-components (server) ────────────────────────────────────────────── */

function StatCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-carbon px-4 py-5">
      <p className="kicker mb-1.5">{label}</p>
      <p className="mono tnum text-xl font-bold text-foreground">{children}</p>
    </div>
  );
}

function RigGroup({
  label, accent, rigs,
}: {
  label: string;
  accent: "amber" | "fog" | "flame";
  rigs: Rig[];
}) {
  const accentClasses: Record<string, string> = {
    amber: "text-amber border-amber/30",
    fog:   "text-fog   border-fog/30",
    flame: "text-flame border-flame/40",
  };

  return (
    <div className="mb-12">
      <Reveal>
        <div className={`inline-flex items-center gap-2 border-b pb-1 mb-6 ${accentClasses[accent]}`}>
          <span className={`mono text-xs uppercase tracking-widest ${accentClasses[accent].split(" ")[0]}`}>
            {label}
          </span>
        </div>
      </Reveal>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rigs.map((rig, i) => (
          <Reveal key={rig.id} delay={i * 60}>
            <div
              className={`rounded-sm border p-4 h-full ${
                rig.motion
                  ? "border-flame/50 bg-flame/5"
                  : accent === "amber"
                  ? "border-line bg-carbon-3"
                  : "border-line bg-carbon-3"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="mono text-[0.6rem] text-fog-2">{rig.id}</span>
                {rig.motion && (
                  <span className="rounded-sm bg-flame/20 px-1.5 py-0.5 mono text-[0.55rem] uppercase tracking-widest text-flame">
                    3DOF Motion
                  </span>
                )}
              </div>
              <p className="font-display text-base uppercase text-foreground leading-tight mb-3">
                {rig.name}
              </p>
              <div className="space-y-1.5">
                <SpecRow label="Base" value={rig.base} />
                <SpecRow label="Wheel" value={rig.wheel} />
                <SpecRow label="Controls" value={rig.controls} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1.5">
      <span className="mono text-[0.55rem] text-fog-2 uppercase tracking-wider flex-shrink-0 w-14 mt-px">
        {label}
      </span>
      <span className="mono text-[0.65rem] text-fog leading-tight">{value}</span>
    </div>
  );
}
