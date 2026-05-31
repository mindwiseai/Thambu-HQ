"use client";

import Link from "next/link";
import { type Booking, fmtDate } from "@/lib/account";

export function Bookings({ bookings, preview }: { bookings: Booking[]; preview: boolean }) {
  if (preview || !bookings.length) {
    return (
      <div className="mt-5 rounded-sm border border-dashed border-line p-6">
        <p className="text-sm text-fog">
          {preview
            ? "Your Chennai Sim Centre sessions will show here once booking goes live (July 2026)."
            : "No bookings yet."}
        </p>
        <Link href="/sim-centre" className="btn btn-ghost mt-4">Book a rig →</Link>
      </div>
    );
  }
  return (
    <div className="mt-5 grid gap-px">
      {bookings.map((b) => (
        <div key={b.id} className="border-b border-line py-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm text-foreground">{b.rig}</span>
            <span className={`mono text-[0.6rem] uppercase tracking-widest ${
              b.status === "confirmed" ? "text-signal" : "text-fog-2"
            }`}>{b.status}</span>
          </div>
          <p className="mono mt-1 text-[0.65rem] text-fog">
            {fmtDate(b.booked_for)} · {b.slot} · {b.duration}{b.motion ? " · motion" : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
