import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { COMPONENTS, PRESETS, totalFor, inr, type ComponentGroup } from "@/lib/catalogue";
import { GROUP_IMAGES } from "@/lib/optionImages";

export const metadata: Metadata = {
  title: "Hardware | RaceSims",
  description:
    "Sim racing systems engineered by a race engineer. Conspit and VNM hardware, specced and serviced in Chennai.",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function priceRange(group: ComponentGroup): string {
  const prices = group.options.map((o) => o.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return inr(min);
  return `${inr(min)} – ${inr(max)}`;
}

/** Map a component group id + option id to a short readable label */
function labelFor(groupId: string, optId: string): string {
  const group = COMPONENTS.find((g) => g.id === groupId);
  const opt = group?.options.find((o) => o.id === optId);
  return opt?.label ?? optId;
}

/** Key specs to highlight per preset — pick wheelbase, wheel, pedals, display */
const HIGHLIGHT_GROUPS = ["wheelbase", "wheel", "pedals", "display"] as const;

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative grid-lines grain min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* corner accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 bg-flame/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-20">
        <Reveal>
          <p className="kicker mb-6 text-flame">Built &amp; Serviced in Chennai</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="headline text-5xl sm:text-7xl lg:text-[5.5rem] max-w-4xl text-foreground leading-[0.9]">
            Hardware,{" "}
            <br className="hidden sm:block" />
            Specced{" "}
            <span className="text-flame">/ Like a</span>
            <br className="hidden sm:block" />
            Race{" "}
            <span className="text-fog">Engineer</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            RaceSims sells systems, not components. The driver&apos;s connection is the
            controls and the seat — everything else supports it. Every build is
            engineered to balance, not assembled from a wishlist.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="mono text-xs text-fog-2 uppercase tracking-widest">Partners:</span>
            <span className="clip-corner border border-line bg-carbon-2 px-3 py-1.5 mono text-xs text-foreground uppercase tracking-wider">
              Conspit
            </span>
            <span className="clip-corner border border-line bg-carbon-2 px-3 py-1.5 mono text-xs text-foreground uppercase tracking-wider">
              VNM
            </span>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10">
            <Link href="/configurator" className="btn btn-flame">
              Build your sim
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* hairline bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-line" />
    </section>
  );
}

// ─── Section: The Systems (Presets) ──────────────────────────────────────────

function Systems() {
  return (
    <section className="relative bg-carbon-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3">The Systems</p>
          <h2 className="headline text-4xl sm:text-5xl text-foreground max-w-2xl">
            Three builds. <span className="text-fog">One right answer</span> for most.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fog">
            Every preset is engineered to be balanced end-to-end — no bottleneck
            components, no mismatched stacks.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRESETS.map((preset, i) => {
            const total = totalFor(preset.selections, preset.addons);
            const isFeatured = preset.id === "sim";

            return (
              <Reveal key={preset.id} delay={i * 80}>
                <div
                  className={`relative clip-corner flex flex-col h-full border transition-colors duration-200 ${
                    isFeatured
                      ? "border-flame/40 bg-carbon-3"
                      : "border-line bg-carbon hover:border-line/60"
                  }`}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div className="absolute top-0 right-0">
                      <div className="mono text-[0.6rem] uppercase tracking-widest bg-flame text-white px-3 py-1.5">
                        Most Should Buy
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-6">
                      <p className="kicker mb-1">
                        System{" "}
                        <span className="text-amber">0{i + 1}</span>
                      </p>
                      <h3 className="font-display text-2xl sm:text-3xl text-foreground">
                        {preset.name}
                      </h3>
                      <p className="mt-1 text-sm text-fog">{preset.tagline}</p>
                    </div>

                    {/* Profile */}
                    <p className="text-xs leading-relaxed text-fog-2 border-l border-line pl-4 mb-6">
                      {preset.profile}
                    </p>

                    {/* Key specs */}
                    <div className="space-y-2 mb-8 flex-1">
                      {HIGHLIGHT_GROUPS.map((groupId) => {
                        const optId = preset.selections[groupId];
                        const group = COMPONENTS.find((g) => g.id === groupId);
                        if (!group || !optId) return null;
                        const label = labelFor(groupId, optId);
                        const opt = group.options.find((o) => o.id === optId);
                        return (
                          <div
                            key={groupId}
                            className="flex items-start justify-between gap-3 border-b border-line/50 pb-2"
                          >
                            <span className="mono text-[0.65rem] uppercase tracking-wider text-fog-2 pt-0.5 shrink-0">
                              {group.name}
                            </span>
                            <span className="mono text-[0.7rem] text-foreground text-right leading-snug">
                              {label}
                              {opt?.brand && (
                                <span className="ml-1 text-fog-2">· {opt.brand}</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                      {preset.addons.length > 0 && (
                        <div className="flex items-center justify-between gap-3 border-b border-line/50 pb-2">
                          <span className="mono text-[0.65rem] uppercase tracking-wider text-fog-2 pt-0.5 shrink-0">
                            Add-ons
                          </span>
                          <span className="mono text-[0.7rem] text-signal text-right">
                            {preset.addons.length} pack{preset.addons.length > 1 ? "s" : ""} included
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto">
                      <div className="mb-4">
                        <p className="kicker mb-1">System Total</p>
                        <p className="tnum text-2xl text-foreground">
                          {inr(total)}
                        </p>
                        <p className="mono text-[0.6rem] text-fog-2 mt-0.5 uppercase tracking-wider">
                          Indicative · confirmed at quote
                        </p>
                      </div>
                      <Link
                        href="/configurator"
                        className={`btn w-full ${isFeatured ? "btn-flame" : "btn-ghost"}`}
                      >
                        Configure this build
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: The Stack ───────────────────────────────────────────────────────

function TheStack() {
  return (
    <section className="relative bg-carbon py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3">Component Philosophy</p>
          <h2 className="headline text-4xl sm:text-5xl text-foreground max-w-2xl">
            The Stack
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fog">
            Nine decision points. A race engineer&apos;s rationale behind each one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS.map((group, i) => {
            const range = priceRange(group);
            const index = String(i + 1).padStart(2, "0");

            return (
              <Reveal key={group.id} delay={i * 60}>
                <div className="group relative clip-corner border border-line bg-carbon-2 p-6 transition-colors duration-200 hover:border-line/60 h-full flex flex-col">
                  {/* telemetry index */}
                  <div className="absolute top-4 right-5 mono text-[0.6rem] text-fog-2">
                    {index}
                  </div>

                  <div className="mb-3">
                    <h3 className="font-display text-base text-foreground">
                      {group.name}
                    </h3>
                  </div>

                  {GROUP_IMAGES[group.id] ? (
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-sm border border-line">
                      <Image
                        src={GROUP_IMAGES[group.id]}
                        alt={group.name}
                        fill
                        sizes="(max-width:1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}

                  <p className="text-xs leading-relaxed text-fog flex-1 mb-5">
                    {group.why}
                  </p>

                  <div className="border-t border-line pt-4 flex items-center justify-between">
                    <span className="kicker">Price Range</span>
                    <span className="tnum text-sm text-amber">{range}</span>
                  </div>

                  {/* option count */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="kicker">Options</span>
                    <span className="mono text-xs text-fog">
                      {group.options.length} variant{group.options.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Why a Race Engineer (inverted) ─────────────────────────────────

function RaceEngineer() {
  const pillars = [
    {
      index: "01",
      title: "Race-engineer founder",
      body:
        "RaceSims is founded by Thambusamy T.D. — a motorsport race engineer with 14+ years in Indian motorsport: ECU calibration, powertrain tuning, and telemetry-driven driver coaching. The hardware speccing, rig geometry and setup philosophy come from the paddock, not a retail counter.",
    },
    {
      index: "02",
      title: "Built, serviced &amp; customised in Chennai",
      body:
        "Cockpit frames are manufactured locally from aluminium profile. That means faster turnaround on service, custom geometry for your discipline, and modifications no imported rig can offer.",
    },
    {
      index: "03",
      title: "No mismatched stacks",
      body:
        "Cheap pedals undercut an expensive wheelbase. An underpowered PC bottlenecks a triple-screen build. Every system is engineered to balance — you get the full capability of each component.",
    },
  ];

  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3 text-ink/50">Why a Race Engineer</p>
          <h2 className="headline text-4xl sm:text-5xl text-ink max-w-2xl">
            The spec philosophy
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
            Anyone can list components. A race engineer specs for outcomes — lap
            time, consistency, fatigue management, development headroom.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.index} delay={i * 80}>
              <div className="border-t-2 border-ink/10 pt-6 h-full">
                <p className="mono text-xs text-ink/30 mb-3">{p.index}</p>
                <h3
                  className="font-display text-lg text-ink mb-3"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
                <p className="text-sm leading-relaxed text-ink/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-16 border-t border-ink/10 pt-8 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-ink/20"
                aria-hidden="true"
              />
              <span className="mono text-xs text-ink/40 uppercase tracking-widest">
                Championship background
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-ink/20"
                aria-hidden="true"
              />
              <span className="mono text-xs text-ink/40 uppercase tracking-widest">
                Local manufacturing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-ink/20"
                aria-hidden="true"
              />
              <span className="mono text-xs text-ink/40 uppercase tracking-widest">
                Systems-level thinking
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Section: Brand Partners ──────────────────────────────────────────────────

const PARTNERS = [
  {
    id: "conspit",
    name: "Conspit",
    tier: "Primary Partner",
    note:
      "The Ares direct-drive wheelbase series and CPP pedal line form the core of most RaceSims builds. Conspit hardware is specified from entry through flagship — engineered for load-cell feedback at every tier.",
    range: "Ares 8Nm → Ares Platinum 20Nm · CPP Apex → CPP EVO V2",
  },
  {
    id: "vnm",
    name: "VNM",
    tier: "Primary Partner",
    note:
      "VNM anchors the motion-platform pathway. The Direct Drive Premier and Elite wheelbases are paired with VNM pedals, shifter and handbrake — the right ecosystem when 3DOF motion is on the horizon.",
    range: "DD Premier 13Nm → DD Xtreme 32Nm · Rally Handbrake · 3DOF Motion Kit",
  },
];

function BrandPartners() {
  return (
    <section className="relative bg-carbon-2 py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3">Hardware Ecosystem</p>
          <h2 className="headline text-4xl sm:text-5xl text-foreground max-w-xl">
            Brand Partners
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PARTNERS.map((partner, i) => (
            <Reveal key={partner.id} delay={i * 80}>
              <div className="clip-corner border border-line bg-carbon h-full p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-2xl text-foreground">
                      {partner.name}
                    </h3>
                    <p className="kicker mt-1">{partner.tier}</p>
                  </div>
                  <div className="live-dot mt-2 shrink-0" aria-hidden="true" />
                </div>

                <p className="text-sm leading-relaxed text-fog mb-6">
                  {partner.note}
                </p>

                <div className="border-t border-line pt-4">
                  <p className="kicker mb-1.5">Range stocked</p>
                  <p className="mono text-xs text-amber leading-relaxed">
                    {partner.range}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA Band ────────────────────────────────────────────────────────

function CTABand() {
  return (
    <section className="relative bg-carbon grid-lines grain py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="kicker mb-3">Ready to spec?</p>
              <h2 className="headline text-3xl sm:text-5xl text-foreground">
                Your build,{" "}
                <span className="text-flame">engineered</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
                Use the configurator to spec component-by-component, or browse
                and buy individual parts on the Shopify store.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/configurator" className="btn btn-flame">
                Spec your build
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="https://www.racesims.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Shop individual parts
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 2.5h7m0 0v7m0-7L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <>
      <Hero />
      <Systems />
      <TheStack />
      <RaceEngineer />
      <BrandPartners />
      <CTABand />
    </>
  );
}
