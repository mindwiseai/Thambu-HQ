import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  DEMO_PROFILE, DEMO_JOURNEY, tierFor, nextTier, TIERS,
  type Profile, type JourneyEvent, type SavedBuild, type Booking,
} from "@/lib/account";
import { TierProgress } from "@/components/account/TierProgress";
import { JourneyTimeline } from "@/components/account/JourneyTimeline";
import { SavedBuilds } from "@/components/account/SavedBuilds";
import { Bookings } from "@/components/account/Bookings";
import { inr } from "@/lib/account";

export const metadata: Metadata = {
  title: "Driver Account",
  description: "Your RaceSims driver account — training journey, saved builds, bookings and tier.",
};

export default async function AccountPage() {
  const supabase = await createClient();

  let profile: Profile = DEMO_PROFILE;
  let journey: JourneyEvent[] = DEMO_JOURNEY;
  let builds: SavedBuild[] = [];
  let bookings: Booking[] = [];
  let preview = true;
  let email = "";

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      preview = false;
      email = user.email ?? "";
      const [{ data: p }, { data: j }, { data: b }, { data: bk }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("journey_events").select("*").eq("user_id", user.id).order("occurred_at", { ascending: false }),
        supabase.from("saved_builds").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("bookings").select("*").eq("user_id", user.id).order("booked_for", { ascending: false }),
      ]);
      if (p) profile = p as Profile;
      journey = (j as JourneyEvent[]) ?? [];
      builds = (b as SavedBuild[]) ?? [];
      bookings = (bk as Booking[]) ?? [];
    }
  }

  const points = profile.points ?? 0;
  const tier = isSupabaseConfigured ? tierFor(points) : (profile.tier ?? "Club");
  const next = nextTier(points);

  return (
    <div className="bg-carbon">
      {/* ── Driver card header ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line pt-28 pb-12 sm:pt-36">
        <div className="grid-lines grid-lines-fade pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-1/4 h-[40vh] w-[40vh] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,59,29,0.16) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          {preview && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-amber/30 bg-amber/5 px-3 py-1.5">
              <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">Preview</span>
              <span className="text-xs text-fog">Sample data — sign in to build your real journey</span>
            </div>
          )}
          <p className="kicker">Driver Account{!preview && email ? ` · ${email}` : ""}</p>
          <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="headline text-4xl text-foreground sm:text-5xl">
              {(profile.display_name ?? "Driver").toUpperCase()}
            </h1>
            <div className="flex items-center gap-8">
              <Stat label="Tier" value={tier} accent />
              <Stat label="Points" value={points.toLocaleString("en-IN")} />
              <Stat label="Home centre" value={profile.home_centre ?? "Chennai"} />
            </div>
          </div>
          <div className="mt-8">
            <TierProgress points={points} />
          </div>
        </div>
      </section>

      {/* ── Body grid ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <div>
              <SectionHead n="01" title="Training journey"
                blurb="Every session, milestone and league round — your development on record." />
              <JourneyTimeline events={journey} />
            </div>
            <div>
              <SectionHead n="02" title="Saved builds"
                blurb="Configurator specs you've saved. Pick up where you left off." />
              <SavedBuilds builds={builds} preview={preview} />
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <SectionHead n="03" title="Bookings" blurb="Chennai Sim Centre sessions." />
              <Bookings bookings={bookings} preview={preview} />
            </div>
            <div>
              <SectionHead n="04" title="Your tier perks" blurb="" />
              <ul className="mt-5 space-y-px border-t border-line">
                {TIERS.map((t) => {
                  const reached = points >= t.min;
                  const current = t.name === tier;
                  return (
                    <li key={t.name}
                      className={`flex flex-col gap-1 border-b border-line py-4 ${reached ? "" : "opacity-45"}`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-display text-sm ${current ? "text-flame" : "text-foreground"}`}>
                          {t.name}{current && " · you"}
                        </span>
                        <span className="mono text-[0.65rem] text-fog-2">{t.min.toLocaleString("en-IN")} pts</span>
                      </div>
                      <span className="text-xs leading-relaxed text-fog">{t.perk}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {!preview && (
              <form action="/auth/signout" method="post">
                <button type="submit" className="btn btn-ghost w-full justify-center">Sign out</button>
              </form>
            )}
            {preview && (
              <Link href="/login" className="btn btn-flame w-full justify-center">
                Sign in to start →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* secondary CTA */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="kicker">Keep climbing</p>
            <p className="mt-2 max-w-md text-sm text-fog">
              Points come from centre sessions, coaching, and league rounds. Spec a build or
              book a rig to move up a tier.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/configurator" className="btn btn-flame">Build a sim</Link>
            <Link href="/sim-centre" className="btn btn-ghost">Book a rig</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="kicker">{label}</p>
      <p className={`headline mt-1 text-2xl ${accent ? "text-flame" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function SectionHead({ n, title, blurb }: { n: string; title: string; blurb: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="mono text-[0.65rem] text-fog-2">{n}</span>
      <div>
        <h2 className="headline text-2xl text-foreground">{title}</h2>
        {blurb && <p className="mt-1 text-sm text-fog">{blurb}</p>}
      </div>
    </div>
  );
}

export { inr };
