import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PRESETS, totalFor, inr } from "@/lib/catalogue";
import { CENTRE, RATES, inr as simInr } from "@/lib/simcentre";
import { ROUNDS, SEASON, fmtDate } from "@/lib/league";
import { HeroStats } from "@/components/home/HeroStats";
import { PillarCard } from "@/components/home/PillarCard";

export const metadata = {
  title: "RaceSims — Sim Racing, Engineered in India",
  description:
    "Built by a race engineer. Spec a simulator, book a rig at our Chennai Sim Centre, or race the Indian Esports Racing League.",
};

/* ─── Helpers ─────────────────────────────────────────────────────────── */
const liveRound   = ROUNDS.find((r) => r.status === "live");
const upcoming    = ROUNDS.filter((r) => r.status === "upcoming").slice(0, 2);

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── 1 · HERO ──────────────────────────────────────────────────────── */}
      <section className="grain grid-lines grid-lines-fade relative flex min-h-screen flex-col justify-between overflow-hidden bg-carbon pt-36 md:pt-44">
        {/* corner accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-px w-64 bg-gradient-to-l from-flame/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-64 w-px bg-gradient-to-b from-flame/40 to-transparent"
        />

        {/* hero body */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* kicker */}
          <Reveal className="rise d1 flex items-center gap-3">
            <span className="live-dot-red live-dot" />
            <span className="kicker tracking-[0.25em]">Sim Racing · Engineered in India</span>
          </Reveal>

          {/* headline */}
          <Reveal className="rise d2 mt-8">
            <h1 className="headline text-[clamp(3.5rem,12vw,9rem)] leading-[0.88] text-foreground">
              FEEL EVERY
            </h1>
            <h1 className="headline text-[clamp(3.5rem,12vw,9rem)] leading-[0.88] text-flame">
              APEX
            </h1>
          </Reveal>

          {/* subcopy */}
          <Reveal className="rise d3 mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-fog sm:text-lg">
              Built by a race engineer with championship-winning pedigree. Spec a simulator
              from first principles, book a rig at the Chennai Sim Centre, race the Indian
              Esports Racing League.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal className="rise d4 mt-10 flex flex-wrap gap-4">
            <Link href="/configurator" className="btn btn-flame">
              Build your sim
            </Link>
            <Link href="/sim-centre" className="btn btn-ghost">
              Book the Chennai centre
            </Link>
          </Reveal>
        </div>

        {/* telemetry stats strip */}
        <Reveal className="rise d5 w-full">
          <HeroStats />
        </Reveal>
      </section>

      {/* ── 2 · THREE PILLARS ─────────────────────────────────────────────── */}
      <section className="bg-carbon">
        {/* section label */}
        <div className="mx-auto max-w-7xl border-b border-line px-5 py-10 sm:px-8">
          <Reveal>
            <span className="kicker">02 / 06 · What we do</span>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl gap-px px-5 pb-20 pt-6 sm:px-8 md:grid-cols-3">
          <Reveal className="d1">
            <PillarCard
              index="01"
              heading="CONFIGURE"
              blurb="A race engineer's take on every component — wheelbase, wheel, pedals, cockpit, display, PC, audio, haptics. Matched, not mixed. You get a spec sheet, not a shopping cart."
              href="/configurator"
              label="Spec your rig"
            />
          </Reveal>
          <Reveal className="d2">
            <PillarCard
              index="02"
              heading="SIM CENTRE"
              blurb="8 rigs in Chennai. 1,140 sq ft purpose-built floor in Nungambakkam. Conspit and VNM hardware. Book a 30-minute session or an hour. Opening July 2026."
              href="/sim-centre"
              label="Book a session"
            />
          </Reveal>
          <Reveal className="d3">
            <PillarCard
              index="03"
              heading="LEAGUE"
              blurb="The Indian Esports Racing League — a monthly hot-lap series across the RaceSims partner network on Assetto Corsa. Season {SEASON} runs April through November."
              href="/league"
              label="View the standings"
            />
          </Reveal>
        </div>
      </section>

      {/* ── 3 · THE BUILD teaser ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          {/* header */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <Reveal>
              <span className="kicker">03 / 06 · The Build</span>
              <h2 className="headline mt-4 text-4xl text-foreground sm:text-5xl">
                THREE<br />STARTING POINTS
              </h2>
            </Reveal>
            <Reveal>
              <p className="max-w-xs text-sm text-fog">
                Every build can be customised in the configurator. These are the engineer-curated presets — the fastest path to a decision.
              </p>
            </Reveal>
          </div>

          {/* preset cards */}
          <div className="mt-12 grid gap-px md:grid-cols-3">
            {PRESETS.map((p, i) => {
              const total = totalFor(p.selections, p.addons);
              const isFeatured = p.id === "sim";
              return (
                <Reveal key={p.id} className={`d${i + 1}`}>
                  <div
                    className={`clip-corner relative flex h-full flex-col border p-8 transition-colors duration-200 ${
                      isFeatured
                        ? "border-flame/40 bg-carbon-3"
                        : "border-line bg-carbon hover:border-fog-2"
                    }`}
                  >
                    {/* featured badge */}
                    {isFeatured && (
                      <div className="mb-6 inline-flex">
                        <span className="mono text-[0.6rem] tracking-[0.2em] uppercase bg-flame px-3 py-1 text-white">
                          Most should buy
                        </span>
                      </div>
                    )}

                    {/* name + tagline */}
                    <div>
                      <p className="kicker">{p.name}</p>
                      <h3 className="headline mt-2 text-2xl text-foreground sm:text-3xl">
                        {p.tagline.toUpperCase()}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fog">{p.profile}</p>
                    </div>

                    {/* price */}
                    <div className="mt-8 border-t border-line pt-6">
                      <p className="kicker">From</p>
                      <p className="headline mt-1 text-3xl text-amber">{inr(total)}</p>
                      <p className="mono mt-1 text-[0.65rem] text-fog-2">
                        INR · indicative · confirmed at quote
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                      <Link
                        href={`/configurator?preset=${p.id}`}
                        className={`btn w-full ${isFeatured ? "btn-flame" : "btn-ghost"}`}
                      >
                        Configure {p.name} →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8">
            <Link href="/configurator" className="ulink mono text-xs uppercase tracking-[0.16em] text-fog hover:text-foreground">
              Open full configurator →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 4 · SIM CENTRE teaser ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            {/* left — statement */}
            <div>
              <Reveal>
                <span className="kicker">04 / 06 · Sim Centre</span>
                <h2 className="headline mt-4 text-4xl text-foreground sm:text-5xl">
                  INDIA'S<br />PRECISION<br />SIM FLOOR
                </h2>
              </Reveal>
              <Reveal className="d1 mt-6">
                <p className="text-base leading-relaxed text-fog">
                  {CENTRE.floor} in {CENTRE.area}, {CENTRE.city}.{" "}
                  {CENTRE.rigs} rigs — {CENTRE.rigs - 1} static, 1 full 3DOF motion.
                  Opening {CENTRE.opens}. Book a session and drive the hardware before you buy it.
                </p>
              </Reveal>
              <Reveal className="d2 mt-8">
                <Link href="/sim-centre" className="btn btn-flame">
                  View the centre →
                </Link>
              </Reveal>
            </div>

            {/* right — rate chips + placeholder visual */}
            <div className="flex flex-col gap-6">
              {/* rate chips */}
              <Reveal className="d1">
                <div className="grid gap-px">
                  {RATES.map((r) => (
                    <div key={r.id} className="flex items-center justify-between border-b border-line py-5">
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.label}</p>
                        <p className="mono mt-1 text-[0.65rem] text-fog">{r.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="headline text-2xl text-amber">{simInr(r.price)}</p>
                        <p className="mono text-[0.65rem] text-fog-2">{r.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* image placeholder panel */}
              <Reveal className="d2">
                <div className="grain grid-lines clip-corner relative h-40 border border-line bg-carbon-2">
                  <div className="absolute bottom-4 left-4">
                    <p className="mono text-[0.65rem] uppercase tracking-[0.15em] text-fog-2">
                      Chennai Sim Centre · {CENTRE.area} · {CENTRE.rigs} rigs
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 · LEAGUE teaser ─────────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <Reveal>
            <span className="kicker">05 / 06 · The League · IERL Season {SEASON}</span>
          </Reveal>

          {/* LIVE round */}
          {liveRound && (
            <Reveal className="d1 mt-8">
              <div className="clip-corner relative border border-flame/30 bg-carbon-3 p-8">
                {/* live badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="live-dot-red live-dot" />
                  <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-flame">
                    Live now
                  </span>
                </div>

                <h3 className="headline text-3xl text-foreground sm:text-4xl">
                  {liveRound.name.toUpperCase()}
                </h3>
                <p className="mono mt-2 text-xs text-fog">
                  {liveRound.track} · {liveRound.country}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="kicker">Car class</p>
                    <p className="mt-1 text-sm text-foreground">{liveRound.carClass}</p>
                  </div>
                  <div>
                    <p className="kicker">Car</p>
                    <p className="mt-1 text-sm text-foreground">{liveRound.car}</p>
                  </div>
                  <div>
                    <p className="kicker">Closes</p>
                    <p className="mt-1 text-sm text-foreground">{fmtDate(liveRound.closes)}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/league" className="btn btn-flame">
                    Enter the round →
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* upcoming rounds */}
          {upcoming.length > 0 && (
            <Reveal className="d2 mt-4 grid gap-px sm:grid-cols-2">
              {upcoming.map((r) => (
                <div
                  key={r.n}
                  className="flex flex-col justify-between border border-line bg-carbon p-6 transition-colors hover:border-fog-2"
                >
                  <div>
                    <p className="kicker">Upcoming · R{r.n}</p>
                    <h4 className="headline mt-2 text-xl text-foreground">{r.name.toUpperCase()}</h4>
                    <p className="mono mt-1 text-[0.65rem] text-fog">{r.track}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="mono text-[0.65rem] text-fog">
                      {fmtDate(r.opens)} – {fmtDate(r.closes)}
                    </p>
                    <p className="mono text-[0.65rem] text-fog-2">{r.carClass}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          )}

          <Reveal className="mt-8">
            <Link href="/league" className="ulink mono text-xs uppercase tracking-[0.16em] text-fog hover:text-foreground">
              Full season calendar & standings →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 6 · WHY RACESIMS (inverted) ───────────────────────────────────── */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-28">
          <Reveal>
            <span className="kicker !text-ink/50">06 / 06 · The moat</span>
          </Reveal>

          <div className="mt-8 grid gap-16 md:grid-cols-2">
            {/* left — editorial */}
            <div>
              <Reveal className="d1">
                <h2 className="headline text-4xl text-ink sm:text-5xl md:text-6xl">
                  WHY<br />RACESIMS
                </h2>
              </Reveal>
              <Reveal className="d2 mt-8">
                <p className="text-base leading-relaxed text-ink/70">
                  Thambu, the founder, is a working race engineer — not a hobbyist who got lucky with a product.
                  Championship-winning campaigns. The kind of insight that changes how you tune
                  force-feedback, spec a pedal box, or configure motion settings for a specific
                  circuit. You can hire a consultant. You can buy cheaper hardware. You cannot
                  buy a 130-title championship legacy in sim racing.
                </p>
              </Reveal>
              <Reveal className="d3 mt-6">
                <p className="text-base leading-relaxed text-ink/70">
                  The cockpit is built in Chennai from 40×40 aluminium profile — not imported and
                  rebranded. That means it can be serviced, adapted, and upgraded by the people
                  who made it. When you add a shifter mount or a handbrake bracket a year from now,
                  the answer is "come in" — not "send it back to Germany."
                </p>
              </Reveal>
            </div>

            {/* right — proof points */}
            <div>
              <Reveal className="d1">
                <div className="grid gap-px border-t border-ink/10">
                  {[
                    {
                      label: "Race-engineer founder",
                      detail: "130+ championship titles. The benchmark for what good sim-to-real training looks like.",
                    },
                    {
                      label: "Built in Chennai",
                      detail: "Cockpit frames manufactured locally from 40×40 aluminium profile. No import lead times, full service support.",
                    },
                    {
                      label: "Conspit + VNM partnership",
                      detail: "Authorised distributor for both primary brands — the widest direct-drive range available in India.",
                    },
                    {
                      label: "IERL — the proving ground",
                      detail: "A live championship series across the partner network. Real competition, real data, real improvement.",
                    },
                    {
                      label: "Chennai Sim Centre",
                      detail: "Drive before you buy. Every rig at the centre mirrors a build configuration — it's a product test, not a game room.",
                    },
                  ].map((pt) => (
                    <div key={pt.label} className="border-b border-ink/10 py-6">
                      <p className="font-semibold text-ink">{pt.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">{pt.detail}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · FINAL CTA band ─────────────────────────────────────────────── */}
      <section className="bg-flame">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:py-20">
          <div>
            <Reveal>
              <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                Ready to build?
              </span>
              <h2 className="headline mt-3 text-4xl text-white sm:text-5xl">
                SPEC YOUR<br />SIMULATOR
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                Every component selected by a race engineer. INR pricing, Chennai service,
                real direct-drive hardware from Conspit and VNM.
              </p>
            </Reveal>
          </div>
          <Reveal className="d1 shrink-0">
            <Link href="/configurator" className="btn btn-ink !py-4 !px-8 text-sm">
              Open the configurator →
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
