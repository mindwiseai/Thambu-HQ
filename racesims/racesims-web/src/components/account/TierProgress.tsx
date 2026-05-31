"use client";

import { motion } from "motion/react";
import { TIERS, nextTier } from "@/lib/account";

// A horizontal tier rail with an animated fill to the driver's current points.
export function TierProgress({ points }: { points: number }) {
  const max = TIERS[TIERS.length - 1].min;
  const pct = Math.min((points / max) * 100, 100);
  const next = nextTier(points);

  return (
    <div>
      <div className="relative h-2 w-full rounded-full bg-carbon-3">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-flame"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        {TIERS.map((t) => (
          <div
            key={t.name}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${(t.min / max) * 100}%` }}
          >
            <div className={`h-3 w-3 -translate-x-1/2 rounded-full border-2 ${
              points >= t.min ? "border-flame bg-flame" : "border-fog-2 bg-carbon"
            }`} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {TIERS.map((t) => (
          <span key={t.name} className="mono text-[0.6rem] uppercase tracking-[0.15em] text-fog-2">
            {t.name}
          </span>
        ))}
      </div>
      {next && (
        <p className="mt-3 text-xs text-fog">
          <span className="text-amber">{(next.min - points).toLocaleString("en-IN")} pts</span>{" "}
          to <span className="text-foreground">{next.name}</span> — {next.perk}
        </p>
      )}
    </div>
  );
}
