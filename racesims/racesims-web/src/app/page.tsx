import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { PillarCard } from "@/components/home/PillarCard";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";
import { PRESETS, totalFor, inr } from "@/lib/catalogue";
import { CENTRE, RATES, inr as simInr } from "@/lib/simcentre";
import { ROUNDS, SEASON, fmtDate } from "@/lib/league";

export const metadata = {
  title: "RaceSims — Sim Racing, Engineered in India",
  description:
    "Built by a race engineer. Spec a simulator, book a rig at our Chennai Sim Centre, or race the Indian Esports Racing League.",
};

const liveRound = ROUNDS.find((r) => r.status === "live");
const upcoming = ROUNDS.filter((r) => r.status === "upcoming").slice(0, 2);

export default function HomePage() {
  return (
    <>
      {/* ── 1 · HERO (cinematic, client) ──────────────────────────────── */}
      <Hero />

      {/* ── 2 · THREE PILLARS ─────────────────────────────────────────── */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl border-b border-line px-5 py-10 sm:px-8">
          <FadeUp>
            <span className="kicker">02 / 06 · What we do</span>
          </FadeUp>
        </div>

        <Stagger className="mx-auto grid max-w-7xl gap-px px-5 pb-20 pt-6 sm:px-8 md:grid-cols-3">
          <StaggerItem>
            <PillarCard
              index="01"
              heading="CONFIGURE"
              blurb="A race engineer's take on every component — wheelbase, wheel, pedals, cockpit, display, PC, audio, haptics. Matched, not mixed. You get a spec sheet, not a shopping cart."
              href="/configurator"
              label="Spec your rig"
            />
          </StaggerItem>
          <StaggerItem>
            <PillarCard
              index="02"
              heading="SIM CENTRE"
              blurb="8 rigs in Chennai. 1,140 sq ft purpose-built floor in Nungambakkam. Conspit and VNM hardware. Book a 30-minute session or an hour. Opening July 2026."
              href="/sim-centre"
              label="Book a session"
            />
          </StaggerItem>
          <StaggerItem>
            <PillarCard
              index="03"
              heading="LEAGUE"
              blurb={`The Indian Esports Racing League — a monthly hot-lap series across the RaceSims partner network on Assetto Corsa. Season ${SEASON} runs April through November.`}
              href="/league"
              label="View the standings"
            />
          </StaggerItem>
        </Stagger>
      </section>

      {/* ── 3 · THE BUILD teaser ──────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <FadeUp>
              <span className="kicker">03 / 06 · The Build</span>
              <h2 className="headline mt-4 text-4xl text-foreground sm:text-5xl">
                THREE<br />STARTING POINTS
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="max-w-xs text-sm text-fog">
                Every build can be customised in the configurator. These are the
                engineer-curated presets — the fastest path to a decision.
              </p>
            </FadeUp>
          </div>

          <Stagger className="mt-12 grid gap-px md:grid-cols-3" amount={0.15}>
            {PRESETS.map((p) => {
              const total = totalFor(p.selections, p.addons);
              const isFeatured = p.id === "sim";
              return (
                <StaggerItem key={p.id}>
                  <div
                    className={`clip-corner group relative flex h-full flex-col border p-8 transition-all duration-300 hover:-translate-y-1 ${
                      isFeatured
                        ? "border-flame/40 bg-carbon-3"
                        : "border-line bg-carbon hover:border-fog-2"
                    }`}
                  >
                    {isFeatured && (
                      <div className="mb-6 inline-flex">
                        <span className="mono bg-flame px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white">
                          Most should buy
                        </span>
                      </div>
                    )}

                    <div>
                      <p className="kicker">{p.name}</p>
                      <h3 className="headline mt-2 text-2xl text-foreground sm:text-3xl">
                        {p.tagline.toUpperCase()}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fog">{p.profile}</p>
                    </div>

                    <div className="mt-8 border-t border-line pt-6">
                      <p className="kicker">From</p>
                      <p className="headline mt-1 text-3xl text-amber">{inr(total)}</p>
                      <p className="mono mt-1 text-[0.65rem] text-fog-2">
                        INR · indicative · confirmed at quote
                      </p>
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/configurator?preset=${p.id}`}
                        className={`btn w-full ${isFeatured ? "btn-flame" : "btn-ghost"}`}
                      >
                        Configure {p.name} →
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeUp className="mt-8">
            <Link
              href="/configurator"
              className="ulink mono text-xs uppercase tracking-[0.16em] text-fog hover:text-foreground"
            >
              Open full configurator →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── 4 · SIM CENTRE teaser ─────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <FadeUp>
                <span className="kicker">04 / 06 · Sim Centre</span>
                <h2 className="headline mt-4 text-4xl text-foreground sm:text-5xl">
                  INDIA&apos;S<br />PRECISION<br />SIM FLOOR
                </h2>
              </FadeUp>
              <FadeUp delay={0.1} className="mt-6">
                <p className="text-base leading-relaxed text-fog">
                  {CENTRE.floor} in {CENTRE.area}, {CENTRE.city}. {CENTRE.rigs} rigs —{" "}
                  {CENTRE.rigs - 1} static, 1 full 3DOF motion. Opening {CENTRE.opens}. Book a
                  session and drive the hardware before you buy it.
                </p>
              </FadeUp>
              <FadeUp delay={0.2} className="mt-8">
                <Link href="/sim-centre" className="btn btn-flame">
                  View the centre →
                </Link>
              </FadeUp>
            </div>

            <div className="flex flex-col gap-6">
              <Stagger className="grid gap-px">
                {RATES.map((r) => (
                  <StaggerItem key={r.id}>
                    <div className="flex items-center justify-between border-b border-line py-5 transition-colors hover:bg-carbon-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.label}</p>
                        <p className="mono mt-1 text-[0.65rem] text-fog">{r.note}</p>
                      </div>
                      <div className="text-right">
                        <p className="headline text-2xl text-amber">{simInr(r.price)}</p>
                        <p className="mono text-[0.65rem] text-fog-2">{r.unit}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <FadeUp delay={0.15}>
                <div className="grain grid-lines clip-corner relative h-40 border border-line bg-carbon-2">
                  <div className="absolute bottom-4 left-4">
                    <p className="mono text-[0.65rem] uppercase tracking-[0.15em] text-fog-2">
                      Chennai Sim Centre · {CENTRE.area} · {CENTRE.rigs} rigs
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 · LEAGUE teaser ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <FadeUp>
            <span className="kicker">05 / 06 · The League · IERL Season {SEASON}</span>
          </FadeUp>

          {liveRound && (
            <FadeUp delay={0.1} className="mt-8">
              <div className="clip-corner relative overflow-hidden border border-flame/30 bg-carbon-3 p-8">
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
            </FadeUp>
          )}

          {upcoming.length > 0 && (
            <Stagger className="mt-4 grid gap-px sm:grid-cols-2">
              {upcoming.map((r) => (
                <StaggerItem key={r.n}>
                  <div className="flex h-full flex-col justify-between border border-line bg-carbon p-6 transition-colors hover:border-fog-2">
                    <div>
                      <p className="kicker">Upcoming · R{r.n}</p>
                      <h4 className="headline mt-2 text-xl text-foreground">
                        {r.name.toUpperCase()}
                      </h4>
                      <p className="mono mt-1 text-[0.65rem] text-fog">{r.track}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="mono text-[0.65rem] text-fog">
                        {fmtDate(r.opens)} – {fmtDate(r.closes)}
                      </p>
                      <p className="mono text-[0.65rem] text-fog-2">{r.carClass}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <FadeUp className="mt-8">
            <Link
              href="/league"
              className="ulink mono text-xs uppercase tracking-[0.16em] text-fog hover:text-foreground"
            >
              Full season calendar &amp; standings →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── 6 · WHY RACESIMS (inverted) ───────────────────────────────── */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-28">
          <FadeUp>
            <span className="kicker !text-ink/50">06 / 06 · The moat</span>
          </FadeUp>

          <div className="mt-8 grid gap-16 md:grid-cols-2">
            <div>
              <FadeUp>
                <h2 className="headline text-4xl text-ink sm:text-5xl md:text-6xl">
                  WHY<br />RACESIMS
                </h2>
              </FadeUp>
              <FadeUp delay={0.1} className="mt-8">
                <p className="text-base leading-relaxed text-ink/70">
                  Thambu, the founder, is a working race engineer — not a hobbyist who got
                  lucky with a product. Championship-winning campaigns. The kind of insight
                  that changes how you tune force-feedback, spec a pedal box, or configure
                  motion settings for a specific circuit. You can hire a consultant. You can
                  buy cheaper hardware. You cannot buy a 130-title championship legacy in sim
                  racing.
                </p>
              </FadeUp>
              <FadeUp delay={0.2} className="mt-6">
                <p className="text-base leading-relaxed text-ink/70">
                  The cockpit is built in Chennai from 40×40 aluminium profile — not imported
                  and rebranded. That means it can be serviced, adapted, and upgraded by the
                  people who made it. When you add a shifter mount or a handbrake bracket a
                  year from now, the answer is &quot;come in&quot; — not &quot;send it back to Germany.&quot;
                </p>
              </FadeUp>
            </div>

            <div>
              <Stagger className="grid gap-px border-t border-ink/10">
                {[
                  { label: "Race-engineer founder", detail: "130+ championship titles. The benchmark for what good sim-to-real training looks like." },
                  { label: "Built in Chennai", detail: "Cockpit frames manufactured locally from 40×40 aluminium profile. No import lead times, full service support." },
                  { label: "Conspit + VNM partnership", detail: "Authorised distributor for both primary brands — the widest direct-drive range available in India." },
                  { label: "IERL — the proving ground", detail: "A live championship series across the partner network. Real competition, real data, real improvement." },
                  { label: "Chennai Sim Centre", detail: "Drive before you buy. Every rig at the centre mirrors a build configuration — it's a product test, not a game room." },
                ].map((pt) => (
                  <StaggerItem key={pt.label}>
                    <div className="border-b border-ink/10 py-6">
                      <p className="font-semibold text-ink">{pt.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">{pt.detail}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · FINAL CTA band ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-flame">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:py-20">
          <FadeUp>
            <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
              Ready to build?
            </span>
            <h2 className="headline mt-3 text-4xl text-white sm:text-5xl">
              SPEC YOUR<br />SIMULATOR
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Every component selected by a race engineer. INR pricing, Chennai service, real
              direct-drive hardware from Conspit and VNM.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="shrink-0">
            <Link href="/configurator" className="btn btn-ink !px-8 !py-4 text-sm">
              Open the configurator →
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
