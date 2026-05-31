import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import {
  SEASON,
  ROUNDS,
  RACE_NIGHT,
  R1_LEADERBOARD,
  PARTNERS,
  fmtDate,
  type Round,
  type Driver,
  type Partner,
} from "@/lib/league";

export const metadata: Metadata = {
  title: "The League",
  description:
    "Indian Esports Racing League — monthly hot-laps across the RaceSims partner network on Assetto Corsa. One championship. Season " +
    SEASON +
    ".",
};

/* ─── Status pill ────────────────────────────────────────────────────────── */
function StatusPill({ status }: { status: Round["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-flame/40 bg-flame/10 px-2 py-0.5 mono text-[0.6rem] tracking-[0.18em] text-flame">
        <span className="live-dot live-dot-red" />
        LIVE
      </span>
    );
  }
  if (status === "complete") {
    return (
      <span className="inline-flex items-center rounded-[2px] border border-line px-2 py-0.5 mono text-[0.6rem] tracking-[0.18em] text-fog-2">
        DONE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-[2px] border border-line px-2 py-0.5 mono text-[0.6rem] tracking-[0.18em] text-fog">
      UPCOMING
    </span>
  );
}

/* ─── Country flag emoji avoided — inline svg pin ───────────────────────── */
function TrackPin() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 10 C5 10 2 6.5 2 4a3 3 0 0 1 6 0c0 2.5-3 6-3 6z" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function LeaguePage() {
  const liveRound = ROUNDS.find((r) => r.status === "live");

  return (
    <div className="flex min-h-dvh flex-col bg-carbon">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="grid-lines grain relative overflow-hidden border-b border-line pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* subtle radial glow behind headline */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,59,29,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-4">
              Assetto Corsa · Season {SEASON}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="headline max-w-4xl text-4xl leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
              Indian Esports{" "}
              <br className="hidden sm:block" />
              Racing League
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-fog sm:text-base">
              Monthly hot-laps across the RaceSims partner network. Drive at
              any partner centre, post your fastest lap, compete for the
              championship.
            </p>
          </Reveal>

          {/* LIVE badge */}
          {liveRound && (
            <Reveal delay={240}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-[3px] border border-flame/30 bg-flame/8 px-4 py-2">
                <span className="live-dot live-dot-red flex-shrink-0" />
                <span className="mono text-[0.7rem] tracking-[0.2em] text-flame uppercase">
                  Round {liveRound.n} — {liveRound.track} · Live
                </span>
              </div>
            </Reveal>
          )}

          {/* CTAs */}
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sim-centre" className="btn btn-flame">
                Race at the Chennai centre
              </Link>
              <a
                href="https://indianesportsracingleague.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Full IERL site
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. FORMAT / RACE NIGHT ───────────────────────────────────────── */}
      <section className="border-b border-line bg-carbon-2 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-8">Race Night · Format</p>
          </Reveal>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Platform", value: RACE_NIGHT.platform },
              { label: "Format", value: RACE_NIGHT.format },
              { label: "Final Time", value: RACE_NIGHT.finalTime },
              { label: "Schedule", value: RACE_NIGHT.day },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 60}>
                <div
                  className={`py-6 pr-6 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-6" : ""}`}
                >
                  <p className="kicker mb-2">{row.label}</p>
                  <p className="text-sm leading-snug text-foreground sm:text-base">
                    {row.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SEASON SCHEDULE ───────────────────────────────────────────── */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-8 flex items-end justify-between">
              <p className="kicker">Season Schedule · {SEASON}</p>
              <span className="mono text-[0.65rem] text-fog-2 uppercase tracking-widest">
                8 Rounds
              </span>
            </div>
          </Reveal>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-[3px] border border-line md:block">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-carbon-3">
                  {["RND", "Round", "Track", "Car / Class", "Window", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left kicker text-fog-2"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {ROUNDS.map((r, i) => (
                  <tr
                    key={r.n}
                    className={`border-b border-line transition-colors last:border-0 hover:bg-carbon-2 ${
                      r.status === "live"
                        ? "border-l-2 border-l-flame bg-flame/5"
                        : ""
                    } ${i % 2 === 0 ? "" : "bg-carbon-2/40"}`}
                  >
                    <td className="px-4 py-4">
                      <span className="mono tnum text-xs text-fog">
                        {String(r.n).padStart(2, "0")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-medium ${
                          r.status === "live" ? "text-flame" : "text-foreground"
                        }`}
                      >
                        {r.name}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 text-fog">
                        <TrackPin />
                        <span className="text-xs">
                          {r.track}, {r.country}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-xs text-foreground">{r.car}</p>
                      <p className="kicker mt-0.5 text-[0.6rem]">{r.carClass}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="mono tnum text-xs text-fog">
                        {fmtDate(r.opens)} – {fmtDate(r.closes)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="flex flex-col gap-3 md:hidden">
            {ROUNDS.map((r) => (
              <Reveal key={r.n}>
                <div
                  className={`rounded-[3px] border p-4 ${
                    r.status === "live"
                      ? "border-flame/40 bg-flame/5"
                      : "border-line bg-carbon-2"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="mono tnum text-xs text-fog-2">
                        {String(r.n).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          r.status === "live" ? "text-flame" : "text-foreground"
                        }`}
                      >
                        {r.name}
                      </span>
                    </div>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <p className="kicker mb-0.5">Track</p>
                      <p className="text-xs text-fog">
                        {r.track}, {r.country}
                      </p>
                    </div>
                    <div>
                      <p className="kicker mb-0.5">Car</p>
                      <p className="text-xs text-foreground">{r.car}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="kicker mb-0.5">Window</p>
                      <p className="mono tnum text-xs text-fog">
                        {fmtDate(r.opens)} – {fmtDate(r.closes)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STANDINGS — Round 1 ───────────────────────────────────────── */}
      <section className="border-b border-line bg-carbon-2 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-2 flex items-end justify-between">
              <p className="kicker">Standings · Round 1 · Monza</p>
              <span className="inline-flex items-center gap-1.5">
                <span className="live-dot live-dot-red" />
                <span className="mono text-[0.65rem] tracking-widest text-flame uppercase">Live</span>
              </span>
            </div>
            <p className="mb-8 text-xs text-fog">
              RSS Formula Hybrid X 2026 — single fastest valid hot lap
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="overflow-hidden rounded-[3px] border border-line">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-carbon-3">
                    <th className="px-4 py-3 text-left kicker text-fog-2 w-12">POS</th>
                    <th className="px-4 py-3 text-left kicker text-fog-2">Driver</th>
                    <th className="hidden px-4 py-3 text-left kicker text-fog-2 sm:table-cell">Centre</th>
                    <th className="px-4 py-3 text-right kicker text-fog-2">Hot Lap</th>
                    <th className="px-4 py-3 text-right kicker text-fog-2">Gap</th>
                    <th className="px-4 py-3 text-right kicker text-fog-2 w-14">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {R1_LEADERBOARD.map((d: Driver) => {
                    const isP1 = d.pos === 1;
                    return (
                      <tr
                        key={d.pos}
                        className={`border-b border-line transition-colors last:border-0 hover:bg-carbon-3 ${
                          isP1 ? "bg-flame/8" : ""
                        }`}
                      >
                        <td className="px-4 py-4">
                          <span
                            className={`mono tnum text-xs font-bold ${
                              isP1 ? "text-flame" : "text-fog"
                            }`}
                          >
                            P{d.pos}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-medium ${
                              isP1 ? "text-flame" : "text-foreground"
                            }`}
                          >
                            {d.name}
                          </span>
                          {/* Show centre on mobile below name */}
                          <p className="mt-0.5 text-xs text-fog sm:hidden">
                            {d.centre}
                          </p>
                        </td>
                        <td className="hidden px-4 py-4 sm:table-cell">
                          <span className="text-xs text-fog">{d.centre}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="mono tnum text-xs text-amber">
                            {d.lap}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span
                            className={`mono tnum text-xs ${
                              d.gap === "—" ? "text-fog-2" : "text-fog"
                            }`}
                          >
                            {d.gap}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span
                            className={`mono tnum text-xs font-bold ${
                              isP1 ? "text-signal" : "text-foreground"
                            }`}
                          >
                            {d.pts}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 mono text-[0.65rem] text-fog-2">
              Points: 25 · 18 · 15 · 12 · 10 · 8 · 6 · 4 · 2 · 1 · Championship
              accumulated across all 8 rounds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. PARTNER NETWORK ───────────────────────────────────────────── */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-2">Partner Network</p>
            <p className="mb-10 max-w-xl text-sm leading-relaxed text-fog">
              Every partner centre hosts IERL rounds. Set your hot lap locally —
              it counts toward the national championship.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p: Partner, i) => {
              const isChennai = p.slug === "racesims-chennai";
              const card = (
                <div
                  className={`clip-corner rounded-[3px] border p-5 transition-colors ${
                    isChennai
                      ? "border-flame/30 bg-flame/5 hover:border-flame/50"
                      : "border-line bg-carbon-2 hover:border-line hover:bg-carbon-3"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isChennai ? "text-flame" : "text-foreground"
                        }`}
                      >
                        {p.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-fog">
                        <TrackPin />
                        {p.city}, {p.state}
                      </p>
                    </div>
                    {isChennai && (
                      <span className="flex-shrink-0 rounded-[2px] border border-flame/30 bg-flame/10 px-2 py-0.5 mono text-[0.6rem] tracking-widest text-flame uppercase">
                        Live Finals
                      </span>
                    )}
                  </div>
                  {isChennai && (
                    <p className="mt-3 text-xs text-fog">
                      The Chennai Sim Centre hosts live grand finals every last
                      Sunday of the round.
                    </p>
                  )}
                </div>
              );

              return (
                <Reveal key={p.slug} delay={i * 50}>
                  {isChennai ? (
                    <Link href="/sim-centre" className="block cursor-pointer">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BAND ─────────────────────────────────────────────────── */}
      <section className="grid-lines grain bg-carbon-3 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="headline text-2xl text-foreground sm:text-3xl">
                  Ready to set your lap?
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">
                  Book a session at the Chennai Sim Centre or browse rigs to build
                  your home setup.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/sim-centre" className="btn btn-flame">
                  Book Sim Centre
                </Link>
                <Link href="/products" className="btn btn-ghost">
                  Shop Hardware
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
