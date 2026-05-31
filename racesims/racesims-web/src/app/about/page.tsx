import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "About — Founded by a Race Engineer",
  description:
    "RaceSims was founded by Thambusamy T.D., a motorsport race engineer with 14+ years in Indian motorsport. Official Conspit & VNM distributor, building sim racing hardware and commercial simulators across India.",
};

const TIMELINE = [
  { k: "Discipline", t: "ECU calibration & vehicle electronics", d: "Mapping engines and managing the electronics that decide how a race car actually behaves on track." },
  { k: "Discipline", t: "Powertrain tuning & optimisation", d: "Extracting performance the way it's done on a real race weekend — measured, validated, repeatable." },
  { k: "Discipline", t: "Telemetry-driven coaching", d: "Reading driver inputs against data to find the lap time — braking, throttle, line, consistency." },
  { k: "Discipline", t: "Race-weekend engineering", d: "Setup and support trackside with professional teams across categories." },
];

const BRANDS = [
  { name: "Conspit", role: "Official Master Distributor & Authorised Service Partner — India" },
  { name: "VNM Simulation", role: "Official Distributor — India" },
  { name: "Simagic", role: "Authorised Indian sourcing" },
  { name: "Moza Racing", role: "Authorised Indian sourcing" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grain grid-lines grid-lines-fade relative overflow-hidden border-b border-line bg-carbon pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp>
            <span className="kicker">About · RaceSims Solutions Pvt Ltd</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="headline mt-6 text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] text-foreground">
              ENGINEERED<br />FROM THE <span className="text-flame">PADDOCK</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
              RaceSims designs, manufactures, imports, distributes and integrates professional
              sim racing hardware — for individual drivers, racing teams, training academies and
              commercial simulator facilities across India. Motorsport-led, not gaming-led.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Founder ──────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-carbon-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:py-28">
          <div>
            <FadeUp>
              <span className="kicker">The founder</span>
              <h2 className="headline mt-4 text-4xl text-foreground sm:text-5xl">
                THAMBUSAMY<br />T.D.
              </h2>
              <p className="mono mt-4 text-xs uppercase tracking-[0.18em] text-amber">
                Race engineer · Tuner · Telemetry specialist
              </p>
            </FadeUp>
            <FadeUp delay={0.15} className="mt-8">
              <div className="clip-corner grain grid-lines relative aspect-[4/5] border border-line bg-carbon-3">
                <div className="absolute bottom-5 left-5">
                  <p className="mono text-[0.65rem] uppercase tracking-[0.15em] text-fog-2">
                    14+ years · Indian motorsport
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="flex flex-col justify-center">
            <FadeUp>
              <p className="text-base leading-relaxed text-fog">
                RaceSims was founded by <span className="text-foreground">Thambusamy T.D.</span>,
                a motorsport race engineer, tuner and telemetry specialist with over{" "}
                <span className="text-foreground">14 years of experience</span> in Indian
                motorsport. His career spans vehicle electronics and ECU calibration, powertrain
                tuning, telemetry-driven driver coaching, and race-weekend engineering support.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-fog">
                His motorsport journey was shaped under the mentorship of{" "}
                <span className="text-foreground">Mr. Leelakrishnan</span> — one of India&apos;s
                most respected tuners and a multiple-time racing and rally champion — a
                collaboration that contributed to several championship-winning programmes across
                different manufacturers and categories.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-fog">
                He remains actively involved in Indian motorsport today — still working with
                professional teams on tuning, electronics and telemetry. That ongoing, real-world
                involvement is what keeps RaceSims&apos; simulators informed by current motorsport
                practice rather than theory.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Disciplines ──────────────────────────────────────────────── */}
      <section className="border-b border-line bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <FadeUp>
            <span className="kicker">The engineering background</span>
            <h2 className="headline mt-4 text-3xl text-foreground sm:text-4xl">
              WHAT A PADDOCK CAREER BUYS YOU
            </h2>
          </FadeUp>
          <Stagger className="mt-12 grid gap-px sm:grid-cols-2">
            {TIMELINE.map((row) => (
              <StaggerItem key={row.t}>
                <div className="h-full border border-line bg-carbon-2 p-8 transition-colors hover:border-fog-2">
                  <p className="kicker text-amber">{row.k}</p>
                  <h3 className="headline mt-3 text-xl text-foreground">{row.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{row.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Brands ───────────────────────────────────────────────────── */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <FadeUp>
            <span className="kicker !text-ink/50">Authorised brands &amp; partnerships</span>
            <h2 className="headline mt-4 text-3xl text-ink sm:text-4xl">
              GENUINE HARDWARE. AUTHORISED CHANNELS.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
              RaceSims supplies only 100% genuine, manufacturer-backed products sourced directly
              from authorised channels — never counterfeit, replica or non-genuine.
            </p>
          </FadeUp>
          <Stagger className="mt-12 grid gap-px border-t border-ink/10">
            {BRANDS.map((b) => (
              <StaggerItem key={b.name}>
                <div className="flex flex-col gap-1 border-b border-ink/10 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-display text-xl text-ink">{b.name}</p>
                  <p className="text-sm text-ink/60">{b.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Company + CTA ────────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <FadeUp>
            <span className="kicker">Company information</span>
            <dl className="mt-6 grid gap-4 text-sm">
              {[
                ["Legal entity", "RaceSims Solutions Pvt Ltd"],
                ["GSTIN", "33AAOCR6378K1ZO"],
                ["Registered", "No. 9, First Cross Street, Second Avenue, Ashok Nagar, Chennai 600083, Tamil Nadu"],
                ["Phone", "+91 73582 29224"],
                ["Email", "info@racesims.in"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col border-b border-line pb-4 sm:flex-row sm:justify-between sm:gap-8">
                  <dt className="mono text-[0.7rem] uppercase tracking-[0.18em] text-fog-2">{k}</dt>
                  <dd className="mt-1 text-foreground sm:mt-0 sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          <FadeUp delay={0.1} className="flex flex-col justify-center">
            <h2 className="headline text-3xl text-foreground sm:text-4xl">
              TALK TO THE<br />ENGINEER
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">
              Speccing a rig, fitting out a commercial floor, or building a driver-training
              programme? Start with a free consult.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/configurator" className="btn btn-flame">Build your sim →</Link>
              <a
                href="https://wa.me/917358229224?text=Chat%20for%20expert%20help%20%26%20upto%205%25%20off!"
                className="btn btn-ghost"
              >
                WhatsApp us
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
