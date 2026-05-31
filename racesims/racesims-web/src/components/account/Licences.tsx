"use client";

import { type Licence, fmtDate } from "@/lib/account";

// Earned credentials — the rungs of the Ladder, rendered as badges.
export function Licences({ licences }: { licences: Licence[] }) {
  const LADDER = ["Initiation Licence", "Circuit Race Licence", "Rally Licence"];
  const earnedNames = new Set(licences.map((l) => l.name));

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {LADDER.map((name) => {
        const earned = licences.find((l) => l.name === name);
        const has = earnedNames.has(name);
        return (
          <div
            key={name}
            className={`relative flex items-center gap-3 rounded-sm border p-4 ${
              has ? "border-flame/40 bg-flame/5" : "border-dashed border-line opacity-55"
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
              has ? "border-flame text-flame" : "border-fog-2 text-fog-2"
            }`}>
              {has ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <p className={`font-display text-sm ${has ? "text-foreground" : "text-fog"}`}>{name}</p>
              <p className="mono mt-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-fog-2">
                {has && earned ? `Earned ${fmtDate(earned.earned_at)}` : "Locked — train to earn"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
