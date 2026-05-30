"use client";

import { useState, useMemo } from "react";
import { RIGS, RATES, SLOTS, inr, type Rig } from "@/lib/simcentre";

type Step = "date" | "rig" | "duration" | "slot" | "form";
type DurationId = "30" | "60";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
}

interface BookingState {
  dayIndex: number | null;
  rig: Rig | null;
  durationId: DurationId | null;
  motion: boolean;
  slotIndex: number | null;
}

function generateDays(base: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i + 1);
    return d;
  });
}

function formatDay(d: Date): { short: string; day: string; full: string } {
  return {
    short: d.toLocaleDateString("en-IN", { weekday: "short" }),
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    full: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
  };
}

function isBooked(dayIndex: number, slotIndex: number, rigIndex: number): boolean {
  return (dayIndex * 7 + slotIndex + rigIndex * 3) % 5 === 0;
}

function calcPrice(durationId: DurationId | null, motion: boolean): number {
  if (!durationId) return 0;
  const rate = RATES.find((r) => r.id === durationId);
  const motionRate = RATES.find((r) => r.id === "motion");
  const base = rate?.price ?? 0;
  const motionAdd = motion && durationId === "60" ? (motionRate?.price ?? 0) : 0;
  // For 30-min, motion add-on is pro-rated (250 = 500/2)
  const motionAdd30 = motion && durationId === "30" ? Math.round((motionRate?.price ?? 0) / 2) : 0;
  return base + motionAdd + motionAdd30;
}

const DURATION_OPTS: { id: DurationId; label: string; price: number }[] = [
  { id: "30", label: "30 min", price: 750 },
  { id: "60", label: "1 hour", price: 1250 },
];

export function Booking() {
  const base = useMemo(() => new Date(), []);
  const days = useMemo(() => generateDays(base, 12), [base]);

  const [booking, setBooking] = useState<BookingState>({
    dayIndex: null,
    rig: null,
    durationId: null,
    motion: false,
    slotIndex: null,
  });

  const [form, setForm] = useState<BookingForm>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedRigIndex = booking.rig ? RIGS.findIndex((r) => r.id === booking.rig!.id) : -1;
  const price = calcPrice(booking.durationId, booking.motion);

  const canShowSlots = booking.dayIndex !== null && booking.rig !== null && booking.durationId !== null;
  const canShowForm = canShowSlots && booking.slotIndex !== null;

  function validate(): boolean {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^[+\d\s\-()]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSuccess(true);
  }

  if (success) {
    const day = booking.dayIndex !== null ? days[booking.dayIndex] : null;
    const slot = booking.slotIndex !== null ? SLOTS[booking.slotIndex] : null;
    const dur = DURATION_OPTS.find((d) => d.id === booking.durationId);
    return (
      <div className="rounded-sm border border-signal/30 bg-carbon-2 p-8 text-center">
        <div className="mb-4 flex justify-center">
          <span className="live-dot scale-150" />
        </div>
        <p className="mono mb-2 text-xs uppercase tracking-widest text-signal">Seat held</p>
        <p className="mb-6 text-fog text-sm leading-relaxed">
          We&apos;ll confirm by WhatsApp once the centre opens.
        </p>
        <div className="mx-auto max-w-xs space-y-2 border border-line rounded-sm p-4 text-left">
          <Row label="Name" value={form.name} />
          {day && <Row label="Date" value={day.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })} />}
          <Row label="Rig" value={booking.rig?.name ?? ""} />
          {dur && <Row label="Duration" value={dur.label} />}
          {slot && <Row label="Slot" value={slot} />}
          {booking.motion && <Row label="Motion" value="3DOF" />}
          <div className="border-t border-line pt-2">
            <Row label="Total" value={inr(price)} accent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      {/* Left — steps */}
      <div className="space-y-6">

        {/* Step 1 — Date */}
        <StepBlock
          step="01"
          label="Pick a date"
          active
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {days.map((d, i) => {
              const fmt = formatDay(d);
              const sel = booking.dayIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setBooking((b) => ({ ...b, dayIndex: i, slotIndex: null }))}
                  className={`flex min-w-[60px] cursor-pointer flex-col items-center rounded-sm border px-3 py-2.5 transition-all duration-150 ${
                    sel
                      ? "border-flame bg-flame/10 text-foreground"
                      : "border-line bg-carbon-3 text-fog hover:border-fog"
                  }`}
                >
                  <span className="mono text-[0.6rem] uppercase tracking-widest">{fmt.short}</span>
                  <span className="mono text-lg font-bold leading-none mt-0.5">{fmt.day}</span>
                  <span className="mono text-[0.6rem] text-fog-2">{fmt.full.split(" ")[1]}</span>
                </button>
              );
            })}
          </div>
        </StepBlock>

        {/* Step 2 — Rig */}
        <StepBlock step="02" label="Choose a rig" active={booking.dayIndex !== null}>
          <div className="grid gap-2 sm:grid-cols-2">
            {RIGS.map((rig) => {
              const sel = booking.rig?.id === rig.id;
              return (
                <button
                  key={rig.id}
                  onClick={() => setBooking((b) => ({
                    ...b, rig,
                    motion: rig.motion ? b.motion : false,
                    slotIndex: null,
                  }))}
                  className={`cursor-pointer rounded-sm border p-3 text-left transition-all duration-150 ${
                    sel
                      ? rig.motion
                        ? "border-flame bg-flame/10"
                        : "border-amber/60 bg-amber/5"
                      : "border-line bg-carbon-3 hover:border-fog"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="mono text-[0.6rem] text-fog-2">{rig.id}</span>
                      <p className="font-display text-sm font-bold uppercase text-foreground leading-tight mt-0.5">
                        {rig.name}
                      </p>
                      <p className="mono text-[0.6rem] text-fog mt-1">{rig.kind}</p>
                    </div>
                    {rig.motion && (
                      <span className="flex-shrink-0 rounded-sm bg-flame/20 px-1.5 py-0.5 mono text-[0.55rem] uppercase tracking-widest text-flame">
                        3DOF
                      </span>
                    )}
                  </div>
                  <p className="mono text-[0.6rem] text-fog-2 mt-2">{rig.wheel} · {rig.controls}</p>
                </button>
              );
            })}
          </div>
        </StepBlock>

        {/* Step 3 — Duration + Motion */}
        <StepBlock step="03" label="Duration" active={booking.rig !== null}>
          <div className="flex flex-wrap gap-3">
            {DURATION_OPTS.map((opt) => {
              const sel = booking.durationId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setBooking((b) => ({ ...b, durationId: opt.id, slotIndex: null }))}
                  className={`cursor-pointer flex items-center gap-3 rounded-sm border px-4 py-3 transition-all duration-150 min-h-[44px] ${
                    sel ? "border-amber/60 bg-amber/5 text-foreground" : "border-line bg-carbon-3 text-fog hover:border-fog"
                  }`}
                >
                  <span className="font-display text-sm uppercase">{opt.label}</span>
                  <span className="mono text-xs text-amber">{inr(opt.price)}</span>
                </button>
              );
            })}
          </div>

          {/* Motion toggle */}
          {booking.rig && (
            <div className="mt-4">
              <button
                disabled={!booking.rig.motion}
                onClick={() => setBooking((b) => ({ ...b, motion: !b.motion }))}
                className={`flex items-center gap-3 rounded-sm border px-4 py-3 transition-all duration-150 min-h-[44px] ${
                  !booking.rig.motion
                    ? "cursor-not-allowed border-line opacity-30 text-fog"
                    : booking.motion
                    ? "cursor-pointer border-flame bg-flame/10 text-foreground"
                    : "cursor-pointer border-line bg-carbon-3 text-fog hover:border-fog"
                }`}
              >
                <span className="font-display text-sm uppercase">
                  {!booking.rig.motion ? "Motion (unavailable on this rig)" : "3DOF Motion add-on"}
                </span>
                {booking.rig.motion && (
                  <span className="mono text-xs text-flame">+{inr(booking.durationId === "30" ? 250 : 500)}</span>
                )}
              </button>
              {!booking.rig.motion && (
                <p className="mono text-[0.6rem] text-fog-2 mt-1.5">
                  Motion available on Motion 01 only
                </p>
              )}
            </div>
          )}
        </StepBlock>

        {/* Step 4 — Slot */}
        <StepBlock step="04" label="Pick a time slot" active={canShowSlots}>
          {canShowSlots ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {SLOTS.map((slot, si) => {
                const booked = isBooked(booking.dayIndex!, si, selectedRigIndex);
                const sel = booking.slotIndex === si;
                return (
                  <button
                    key={slot}
                    disabled={booked}
                    onClick={() => !booked && setBooking((b) => ({ ...b, slotIndex: si }))}
                    className={`rounded-sm border py-2.5 mono text-xs transition-all duration-150 min-h-[44px] ${
                      booked
                        ? "cursor-not-allowed border-line text-fog-2 line-through opacity-40"
                        : sel
                        ? "cursor-pointer border-signal bg-signal/10 text-signal"
                        : "cursor-pointer border-line bg-carbon-3 text-fog hover:border-signal/50 hover:text-signal"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mono text-[0.65rem] text-fog-2">Complete steps 1–3 to see availability.</p>
          )}
        </StepBlock>

        {/* Step 5 — Form */}
        <StepBlock step="05" label="Your details" active={canShowForm}>
          {canShowForm ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Field
                label="Name"
                type="text"
                value={form.name}
                error={errors.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Your full name"
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="you@example.com"
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                error={errors.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                placeholder="+91 98765 43210"
              />
              <button
                type="submit"
                disabled={sending}
                className={`btn btn-flame w-full ${sending ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {sending ? "Sending…" : "Reserve seat"}
              </button>
            </form>
          ) : (
            <p className="mono text-[0.65rem] text-fog-2">Complete steps 1–4 first.</p>
          )}
        </StepBlock>
      </div>

      {/* Right — live price */}
      <div className="lg:sticky lg:top-24 self-start">
        <div className="rounded-sm border border-line bg-carbon-2 p-5 space-y-4">
          <p className="kicker">Booking summary</p>

          <SummaryRow label="Date" value={booking.dayIndex !== null ? days[booking.dayIndex].toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" }) : "—"} />
          <SummaryRow label="Rig" value={booking.rig?.name ?? "—"} />
          <SummaryRow label="Duration" value={DURATION_OPTS.find((d) => d.id === booking.durationId)?.label ?? "—"} />
          <SummaryRow label="Motion" value={booking.motion ? "3DOF" : "—"} />
          <SummaryRow label="Slot" value={booking.slotIndex !== null ? SLOTS[booking.slotIndex] : "—"} />

          <div className="border-t border-line pt-4">
            <div className="flex items-end justify-between">
              <span className="kicker">Total</span>
              <span className={`mono tnum text-2xl font-bold ${price > 0 ? "text-amber" : "text-fog-2"}`}>
                {price > 0 ? inr(price) : "₹—"}
              </span>
            </div>
            {booking.motion && booking.durationId === "30" && (
              <p className="mono text-[0.6rem] text-fog mt-1">Motion add-on pro-rated for 30 min</p>
            )}
          </div>

          <p className="mono text-[0.6rem] text-fog-2 leading-relaxed">
            Pre-opening reservation. No charge now — we confirm by WhatsApp when the centre opens July 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StepBlock({
  step, label, children, active,
}: {
  step: string; label: string; children: React.ReactNode; active: boolean;
}) {
  return (
    <div className={`rounded-sm border p-5 transition-all duration-200 ${active ? "border-line bg-carbon-2" : "border-line/40 bg-carbon opacity-40 pointer-events-none"}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="mono text-[0.6rem] text-fog-2">{step}</span>
        <span className="font-display text-sm uppercase text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}

function Field({
  label, type, value, error, onChange, placeholder,
}: {
  label: string; type: string; value: string; error?: string;
  onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="kicker mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-sm border bg-carbon-3 px-3 py-2.5 mono text-sm text-foreground placeholder-fog-2 outline-none transition-colors min-h-[44px] ${
          error ? "border-flame/60 focus:border-flame" : "border-line focus:border-fog"
        }`}
      />
      {error && <p className="mono text-[0.6rem] text-flame mt-1">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="kicker text-fog-2">{label}</span>
      <span className="mono text-xs text-foreground text-right">{value}</span>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="kicker text-fog-2">{label}</span>
      <span className={`mono text-xs ${accent ? "text-amber font-bold" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
