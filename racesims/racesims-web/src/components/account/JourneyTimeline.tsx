"use client";

import { motion } from "motion/react";
import { type JourneyEvent, fmtDate } from "@/lib/account";

const KIND: Record<JourneyEvent["kind"], { label: string; dot: string }> = {
  session:   { label: "Session",   dot: "bg-signal" },
  milestone: { label: "Milestone", dot: "bg-amber" },
  tier:      { label: "Tier up",   dot: "bg-flame" },
  league:    { label: "League",    dot: "bg-flame" },
};

export function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  if (!events.length) {
    return (
      <div className="mt-6 rounded-sm border border-dashed border-line p-8 text-center">
        <p className="text-sm text-fog">No activity yet. Your first session, build or league
          round will appear here.</p>
      </div>
    );
  }
  return (
    <ol className="mt-6 border-l border-line pl-6">
      {events.map((e, i) => {
        const k = KIND[e.kind] ?? KIND.milestone;
        return (
          <motion.li
            key={e.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-8 last:pb-0"
          >
            <span className={`absolute -left-[1.62rem] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-carbon ${k.dot}`} />
            <div className="flex items-center gap-3">
              <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-fog-2">{k.label}</span>
              <span className="mono text-[0.6rem] text-fog-2">{fmtDate(e.occurred_at)}</span>
              {!!e.points && <span className="mono text-[0.6rem] text-amber">+{e.points} pts</span>}
            </div>
            <p className="mt-1 font-display text-base text-foreground">{e.title}</p>
            {e.detail && <p className="mt-0.5 text-sm leading-relaxed text-fog">{e.detail}</p>}
          </motion.li>
        );
      })}
    </ol>
  );
}
