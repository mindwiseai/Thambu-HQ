"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { type Enrolment } from "@/lib/account";
import { localEnrolments } from "@/lib/enrol";

export function ProgrammeProgress({ enrolments, preview }: { enrolments: Enrolment[]; preview: boolean }) {
  // In preview, merge demo enrolments with anything enrolled on this device.
  const [local, setLocal] = useState<Enrolment[]>([]);
  useEffect(() => {
    if (preview) {
      setLocal(
        localEnrolments().map((e) => ({
          id: e.id, programme: e.programme, programme_name: e.programme_name,
          sessions_total: e.sessions_total, sessions_done: e.sessions_done,
          status: e.status, centre: e.centre ?? "chennai", created_at: e.created_at,
        }))
      );
    }
  }, [preview]);

  // de-dupe by programme (local enquiry shouldn't double a demo row)
  const merged = [...enrolments];
  for (const e of local) if (!merged.some((m) => m.programme === e.programme)) merged.push(e);

  if (!merged.length) {
    return (
      <div className="mt-5 rounded-sm border border-dashed border-line p-6">
        <p className="text-sm text-fog">
          No programmes yet. Start with{" "}
          <Link href="/train" className="ulink text-foreground">the Academy →</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-4">
      {merged.map((e) => {
        const pct = e.sessions_total ? Math.round((e.sessions_done / e.sessions_total) * 100) : 0;
        const done = e.status === "completed";
        return (
          <div key={e.id} className="rounded-sm border border-line bg-carbon-2 p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-base text-foreground">{e.programme_name}</p>
              <span className={`mono text-[0.6rem] uppercase tracking-[0.15em] ${
                done ? "text-signal" : e.status === "active" ? "text-amber" : "text-fog-2"
              }`}>{e.status}</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-carbon-3">
              <motion.div
                className="h-full rounded-full bg-flame"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mono mt-2 text-[0.65rem] text-fog">
              {e.status === "enquiry"
                ? "Enquiry sent — the Academy team will confirm your start"
                : `${e.sessions_done} of ${e.sessions_total} sessions · ${pct}%`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
