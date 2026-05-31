import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";
import { PROGRAMMES, BDAD, inr } from "@/lib/academy";
import { flagship } from "@/lib/centres";
import { EnrolButton } from "@/components/academy/EnrolButton";

export const metadata: Metadata = {
  title: "Train — The Motorsport Academy",
  description:
    "Structured sim racing coaching by a race engineer. Initiation → Advanced Circuit & Rally → real-car days. Earn your licence, climb the Ladder from sim to a real seat.",
};

const TRACK_LABEL: Record<string, string> = {
  circuit: "Circuit", rally: "Rally", engineering: "Engineering", real: "Sim → Real",
};

export default function TrainPage() {
  const career = PROGRAMMES.filter((p) => ["initiation", "advanced-circuit", "advanced-rally", "sim-reality"].includes(p.slug));
  const other = PROGRAMMES.filter((p) => ["tuner-lab", "track-day"].includes(p.slug));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden bg-carbon pt-28">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="absolute right-[6%] top-[18%] h-[55vh] w-[55vh] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,59,29,0.16) 0%, transparent 70%)" }} />
          <div className="absolute inset-y-0 right-0 hidden w-[55%] opacity-90 lg:block">
            <Image src="/hero/rig-studio.png" alt="RaceSims motion simulator" fill priority
              sizes="55vw" className="object-contain object-right" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/70 to-transparent lg:via-carbon/40" />
          <div className="grid-lines grid-lines-fade absolute inset-0 opacity-25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
          <FadeUp><p className="kicker">Train · The Motorsport Academy</p></FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="headline mt-5 text-[clamp(2.75rem,8vw,6rem)] leading-[0.88] text-foreground">
              LEARN IT LIKE<br /><span className="text-flame">A RACE ENGINEER</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              Not track time with a coach nearby — structured programmes where every session
              has a concept, a drill, an application and a telemetry debrief. Earn your licence,
              then climb the Ladder from the sim to a real seat.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#programmes" className="btn btn-flame">See the programmes</a>
              <a href="#ladder" className="btn btn-ghost">The Ladder →</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── The method (B·D·A·D) ─────────────────────────────────────── */}
      <section className="border-y border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <FadeUp>
            <p className="kicker">The method</p>
            <h2 className="headline mt-4 max-w-2xl text-3xl text-foreground sm:text-4xl">
              EVERY SESSION RUNS THE SAME FOUR BEATS
            </h2>
            <p className="mt-4 max-w-xl text-sm text-fog">
              The B·D·A·D loop — identical across every programme and (soon) every centre, so the
              coaching is consistent whether you train in Chennai or Bengaluru.
            </p>
          </FadeUp>
          <Stagger className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {BDAD.map((b, i) => (
              <StaggerItem key={b.k}>
                <div className="h-full border border-line bg-carbon p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="headline text-2xl text-flame">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mono text-[0.6rem] text-fog-2">{b.t}</span>
                  </div>
                  <h3 className="headline mt-4 text-lg text-foreground">{b.k}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{b.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── The career path programmes ───────────────────────────────── */}
      <section id="programmes" className="bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <FadeUp>
            <p className="kicker">The career path</p>
            <h2 className="headline mt-4 text-3xl text-foreground sm:text-4xl">FOUR RUNGS, IN SEQUENCE</h2>
            <p className="mt-4 max-w-xl text-sm text-fog">
              Each programme earns a licence that unlocks the next. No shortcuts — the climb is the point.
            </p>
          </FadeUp>

          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {career.map((p) => (
              <StaggerItem key={p.slug}>
                <ProgrammeCard p={p} trackLabel={TRACK_LABEL[p.track]} />
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={0.1}>
            <h3 className="kicker mt-16">Also at the Academy</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {other.map((p) => (
                <ProgrammeCard key={p.slug} p={p} trackLabel={TRACK_LABEL[p.track]} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── The Ladder ───────────────────────────────────────────────── */}
      <section id="ladder" className="border-t border-line bg-paper text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-28">
          <FadeUp>
            <p className="kicker !text-ink/50">The moat · sim-to-reality</p>
            <h2 className="headline mt-4 text-4xl text-ink sm:text-5xl md:text-6xl">THE LADDER</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
              The earned pathway from RaceSims customer to a real motorsport seat. No one else in
              India offers this. The prize at the top isn&apos;t given — it&apos;s earned, one rung at a time.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-px border-t border-ink/10">
            {[
              { n: "01", t: "Train & earn your licence", d: "Initiation → Advanced. Structured coaching, telemetry debriefs, real progression." },
              { n: "02", t: "Compete in the league", d: "Weekly hot laps, quarterly shootouts — climb the championship table across the network." },
              { n: "03", t: "Win the annual Grand Final", d: "Top of the season. The Circuit Champion earns a real-drive prize — the sim made real." },
            ].map((s) => (
              <FadeUp key={s.n}>
                <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink/10 py-7 sm:grid-cols-[5rem_1fr]">
                  <span className="headline text-3xl text-flame">{s.n}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{s.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/sim-centre" className="btn btn-ink">Book your first session →</Link>
              <Link href="/league" className="btn !border-ink/20 !text-ink hover:!border-flame hover:!text-flame border">
                See the league
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Where ────────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="kicker">Where to train</p>
            <p className="mt-2 max-w-md text-sm text-fog">
              The Academy runs at <span className="text-foreground">{flagship.name}</span>,{" "}
              {flagship.area} — opening {flagship.opens}. More centres rolling out across India.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/sim-centre" className="btn btn-flame">Book a rig</Link>
            <Link href="/account" className="btn btn-ghost">Track my progress</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgrammeCard({ p, trackLabel }: { p: { slug: string; tier: string; name: string; tagline: string; sessions: string; price: number; prereq: string | null; earns: string | null; about: string; platforms: string; outcomes: string[] }; trackLabel: string }) {
  return (
    <div className="clip-corner group flex h-full flex-col border border-line bg-carbon-2 p-7 transition-colors duration-200 hover:border-fog-2">
      <div className="flex items-center justify-between">
        <span className="kicker">{p.tier}</span>
        <span className="mono text-[0.6rem] uppercase tracking-widest text-fog-2">{trackLabel}</span>
      </div>
      <h3 className="headline mt-3 text-2xl text-foreground">{p.name}</h3>
      <p className="mt-1 text-sm text-flame">{p.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-fog">{p.about}</p>

      <ul className="mt-5 grid gap-2">
        {p.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2 text-xs text-fog">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flame" />{o}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 text-xs">
        <Meta label="Format" value={p.sessions} />
        <Meta label="Platforms" value={p.platforms} />
        {p.prereq && <Meta label="Requires" value={p.prereq} />}
        {p.earns && <Meta label="You earn" value={p.earns} accent />}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="headline text-2xl text-amber">
          {p.price > 0 ? inr(p.price) : "On application"}
        </span>
        <EnrolButton
          programme={p.slug}
          programmeName={p.name}
          sessionsTotal={parseInt(p.sessions, 10) || 0}
        />
      </div>
    </div>
  );
}

function Meta({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="mono text-[0.58rem] uppercase tracking-[0.15em] text-fog-2">{label}</p>
      <p className={`mt-0.5 leading-snug ${accent ? "text-amber" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
