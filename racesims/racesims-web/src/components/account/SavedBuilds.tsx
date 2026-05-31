"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type SavedBuild, inr, fmtDate } from "@/lib/account";
import { localBuilds } from "@/lib/saveBuild";

export function SavedBuilds({ builds, preview }: { builds: SavedBuild[]; preview: boolean }) {
  // In preview / signed-out mode, surface anything saved to this device so the
  // "Save build" flow visibly works before Supabase is wired.
  const [local, setLocal] = useState<SavedBuild[]>([]);
  useEffect(() => {
    if (preview) {
      setLocal(
        localBuilds().map((b) => ({
          id: b.id,
          name: b.name,
          preset: b.preset,
          selections: b.selections,
          addons: b.addons,
          total: b.total,
          created_at: b.created_at,
        }))
      );
    }
  }, [preview]);

  const all = preview ? local : builds;

  if (!all.length) {
    return (
      <div className="mt-6 rounded-sm border border-dashed border-line p-6">
        <p className="text-sm text-fog">
          {preview ? (
            <>Save a build in the{" "}
              <Link href="/configurator" className="ulink text-foreground">configurator</Link>{" "}
              and it appears here on this device. Sign in to keep it across devices.</>
          ) : (
            <>No saved builds yet.{" "}
              <Link href="/configurator" className="ulink text-foreground">Open the configurator →</Link></>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-px">
      {preview && (
        <p className="mb-2 mono text-[0.6rem] uppercase tracking-[0.15em] text-amber">
          Saved on this device
        </p>
      )}
      {all.map((b) => (
        <div key={b.id} className="flex items-center justify-between border-b border-line py-4">
          <div>
            <p className="font-display text-base text-foreground">{b.name}</p>
            <p className="mono mt-0.5 text-[0.65rem] text-fog-2">
              {b.preset ? `${b.preset} · ` : ""}{fmtDate(b.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="headline text-lg text-amber">{inr(b.total)}</span>
            <Link
              href={`/configurator?build=${b.id}`}
              className="mono text-xs uppercase tracking-widest text-flame hover:underline"
            >
              Open
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
