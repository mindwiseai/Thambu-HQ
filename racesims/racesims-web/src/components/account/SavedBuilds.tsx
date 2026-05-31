"use client";

import Link from "next/link";
import { type SavedBuild, inr, fmtDate } from "@/lib/account";

export function SavedBuilds({ builds, preview }: { builds: SavedBuild[]; preview: boolean }) {
  if (preview) {
    return (
      <div className="mt-6 rounded-sm border border-dashed border-line p-6">
        <p className="text-sm text-fog">
          When you save a build in the{" "}
          <Link href="/configurator" className="ulink text-foreground">configurator</Link>, it lands
          here — ready to revisit, tweak, or request a quote.
        </p>
      </div>
    );
  }
  if (!builds.length) {
    return (
      <div className="mt-6 rounded-sm border border-dashed border-line p-6 text-center">
        <p className="text-sm text-fog">No saved builds yet.</p>
        <Link href="/configurator" className="btn btn-ghost mt-4">Open the configurator →</Link>
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-px">
      {builds.map((b) => (
        <div key={b.id} className="flex items-center justify-between border-b border-line py-4">
          <div>
            <p className="font-display text-base text-foreground">{b.name}</p>
            <p className="mono mt-0.5 text-[0.65rem] text-fog-2">
              {b.preset ? `${b.preset} · ` : ""}{fmtDate(b.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="headline text-lg text-amber">{inr(b.total)}</span>
            <Link href={`/configurator?build=${b.id}`} className="mono text-xs uppercase tracking-widest text-flame hover:underline">
              Open
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
