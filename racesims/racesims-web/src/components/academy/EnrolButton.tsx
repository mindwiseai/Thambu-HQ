"use client";

import Link from "next/link";
import { useState } from "react";
import { enrol } from "@/lib/enrol";

export function EnrolButton({
  programme,
  programmeName,
  sessionsTotal,
}: {
  programme: string;
  programmeName: string;
  sessionsTotal: number;
}) {
  const [state, setState] = useState<"idle" | "saving" | "account" | "local" | "signedout">("idle");

  async function onEnrol() {
    setState("saving");
    const res = await enrol({ programme, programme_name: programmeName, sessions_total: sessionsTotal });
    if (res.ok && res.where === "account") setState("account");
    else if (res.ok) setState("local");
    else if (!res.ok && res.reason === "signed-out") setState("signedout");
    else setState("idle");
  }

  if (state === "account")
    return (
      <Link href="/account" className="mono text-xs uppercase tracking-widest text-signal hover:underline">
        ✓ Enrolled — view progress →
      </Link>
    );
  if (state === "local")
    return (
      <Link href="/account" className="mono text-xs uppercase tracking-widest text-amber hover:underline">
        ✓ Enquiry saved — see it →
      </Link>
    );
  if (state === "signedout")
    return (
      <Link href="/login?next=/account" className="mono text-xs uppercase tracking-widest text-flame hover:underline">
        Saved — sign in to keep →
      </Link>
    );

  return (
    <button
      onClick={onEnrol}
      disabled={state === "saving"}
      className="mono text-xs uppercase tracking-widest text-flame transition-all hover:tracking-[0.2em] disabled:opacity-60"
    >
      {state === "saving" ? "Enrolling…" : "Enquire / book →"}
    </button>
  );
}
