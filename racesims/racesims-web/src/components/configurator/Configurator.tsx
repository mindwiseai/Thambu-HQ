"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ADDONS,
  COMPONENTS,
  PRESETS,
  defaultSelections,
  inr,
  optionById,
  totalFor,
  type AddOn,
  type ComponentGroup,
  type Option,
  type Preset,
} from "@/lib/catalogue";
import { OPTION_IMAGES } from "@/lib/optionImages";

// ─── helpers ─────────────────────────────────────────────────────────────────

function deepEqual(a: Record<string, string>, b: Record<string, string>): boolean {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => a[k] === b[k]);
}

function arrEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function activePreset(
  selections: Record<string, string>,
  addons: string[],
): Preset | null {
  return (
    PRESETS.find(
      (p) => deepEqual(p.selections, selections) && arrEqual(p.addons, addons),
    ) ?? null
  );
}

// ─── Animated total ───────────────────────────────────────────────────────────

function AnimatedTotal({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  const raf  = useRef<number | null>(null);

  useEffect(() => {
    const from = prev.current;
    const to   = value;
    prev.current = value;
    if (from === to) return;
    const start = performance.now();
    const dur   = 320;
    const tick  = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (t < 1) { raf.current = requestAnimationFrame(tick); }
    };
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value]);

  return (
    <span className="tnum tabular-nums">
      {display.toLocaleString("en-IN")}
    </span>
  );
}

// ─── Preset switcher ──────────────────────────────────────────────────────────

function PresetSwitcher({
  active,
  onSelect,
}: {
  active: Preset | null;
  onSelect: (p: Preset) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => {
        const isActive = active?.id === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={[
              "btn relative transition-all duration-150",
              isActive ? "btn-flame" : "btn-ghost",
            ].join(" ")}
          >
            {p.name}
            {p.id === "sim" && (
              <span
                className="absolute -top-2 -right-2 rounded-sm bg-amber px-1 py-px mono text-[0.58rem] text-carbon font-bold leading-none"
                style={{ letterSpacing: "0.1em" }}
              >
                REC
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Option card ─────────────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  currentPrice,
  onSelect,
  locked,
}: {
  option: Option;
  selected: boolean;
  currentPrice: number;
  onSelect: () => void;
  locked: boolean;
}) {
  const delta = option.price - currentPrice;
  let deltaEl: React.ReactNode = null;
  if (!selected) {
    if (delta > 0) {
      deltaEl = (
        <span className="tnum mono text-xs text-amber">
          +{inr(delta)}
        </span>
      );
    } else if (delta < 0) {
      deltaEl = (
        <span className="tnum mono text-xs text-signal">
          −{inr(Math.abs(delta))}
        </span>
      );
    } else {
      deltaEl = (
        <span className="tnum mono text-xs text-fog">
          same
        </span>
      );
    }
  }

  return (
    <div
      role={locked ? "presentation" : "radio"}
      aria-checked={selected}
      tabIndex={locked ? -1 : 0}
      onClick={locked ? undefined : onSelect}
      onKeyDown={
        locked
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
      }
      className={[
        "group relative flex cursor-pointer flex-col gap-2 rounded-sm border p-4 transition-all duration-150",
        locked && "cursor-default",
        selected
          ? "border-flame bg-carbon-3"
          : "border-line bg-carbon-2 hover:border-fog-2 hover:bg-carbon-3",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Radio pip */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={[
              "mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] transition-colors",
              selected
                ? "border-flame bg-flame"
                : "border-fog-2 bg-transparent group-hover:border-fog",
            ].join(" ")}
          />
          {OPTION_IMAGES[option.id] ? (
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-line bg-carbon-3">
              <Image
                src={OPTION_IMAGES[option.id]}
                alt={option.label}
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
          ) : null}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-sm text-foreground leading-snug">
                {option.label}
              </span>
              {option.brand && (
                <span className="rounded-sm border border-line px-1.5 py-px mono text-[0.6rem] text-fog uppercase tracking-widest shrink-0">
                  {option.brand}
                </span>
              )}
              {selected && (
                <span className="rounded-sm bg-flame/10 border border-flame/30 px-1.5 py-px mono text-[0.6rem] text-flame uppercase tracking-widest shrink-0">
                  Selected
                </span>
              )}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-fog">{option.note}</p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="tnum mono text-sm font-semibold text-foreground">
            {inr(option.price)}
          </div>
          {deltaEl && <div className="mt-0.5">{deltaEl}</div>}
        </div>
      </div>
    </div>
  );
}

// ─── Component group section ──────────────────────────────────────────────────

function GroupSection({
  group,
  index,
  total,
  selectedId,
  onSelect,
}: {
  group: ComponentGroup;
  index: number;
  total: number;
  selectedId: string;
  onSelect: (optId: string) => void;
}) {
  const selectedOpt = group.options.find((o) => o.id === selectedId);
  const currentPrice = selectedOpt?.price ?? 0;
  const locked = group.options.length === 1;

  const idxStr = String(index + 1).padStart(2, "0");
  const totStr = String(total).padStart(2, "0");

  return (
    <section
      className="border-b border-line py-8 last:border-0"
      role="group"
      aria-labelledby={`group-${group.id}`}
    >
      <div className="mb-5">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="mono text-[0.65rem] text-fog-2 tabular-nums">
            {idxStr}/{totStr}
          </span>
          <h2
            id={`group-${group.id}`}
            className="font-display text-base font-bold uppercase tracking-wider text-foreground"
          >
            {group.name}
          </h2>
          {locked && (
            <span className="mono text-[0.6rem] text-fog uppercase tracking-widest border border-line rounded-sm px-1.5 py-px">
              Included
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-fog max-w-2xl">{group.why}</p>
      </div>

      <div className="flex flex-col gap-2" role="radiogroup">
        {group.options.map((opt) => (
          <OptionCard
            key={opt.id}
            option={opt}
            selected={opt.id === selectedId}
            currentPrice={currentPrice}
            onSelect={() => onSelect(opt.id)}
            locked={locked}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Add-on card ─────────────────────────────────────────────────────────────

function AddonCard({
  addon,
  selected,
  onToggle,
}: {
  addon: AddOn;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
      }}
      className={[
        "group flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-all duration-150",
        selected
          ? "border-flame bg-carbon-3"
          : "border-line bg-carbon-2 hover:border-fog-2 hover:bg-carbon-3",
      ].join(" ")}
    >
      {/* Checkbox pip */}
      <div
        className={[
          "mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border-[1.5px] transition-colors flex items-center justify-center",
          selected
            ? "border-flame bg-flame"
            : "border-fog-2 bg-transparent group-hover:border-fog",
        ].join(" ")}
      >
        {selected && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="text-sm font-medium text-foreground">{addon.name}</span>
          <span className="tnum mono text-sm font-semibold text-foreground shrink-0">
            {inr(addon.price)}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-fog">{addon.note}</p>
      </div>
    </div>
  );
}

// ─── Order form ───────────────────────────────────────────────────────────────

type FormState = "idle" | "sending" | "sent";

function buildSpecText(
  selections: Record<string, string>,
  addons: string[],
  total: number,
): string {
  const lines: string[] = ["=== RaceSims Build Spec ===", ""];
  COMPONENTS.forEach((g) => {
    const opt = optionById(g.id, selections[g.id]);
    if (opt) lines.push(`${g.name}: ${opt.label} (${inr(opt.price)})`);
  });
  if (addons.length > 0) {
    lines.push("");
    lines.push("Add-ons:");
    addons.forEach((id) => {
      const a = ADDONS.find((x) => x.id === id);
      if (a) lines.push(`  + ${a.name} (${inr(a.price)})`);
    });
  }
  lines.push("");
  lines.push(`TOTAL: ${inr(total)}`);
  lines.push("");
  lines.push("Prices indicative · INR · confirmed at quote · racesims.in");
  return lines.join("\n");
}

function OrderForm({
  selections,
  addons,
  total,
  onClose,
}: {
  selections: Record<string, string>;
  addons: string[];
  total: number;
  onClose: () => void;
}) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");
  const [state,   setState]   = useState<FormState>("idle");
  const [copied,  setCopied]  = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const specText = buildSpecText(selections, addons, total);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())  e.name  = "Required";
    if (!email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!phone.trim()) e.phone = "Required";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setState("sending");
    setTimeout(() => setState("sent"), 800);
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(specText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }, [specText]);

  if (state === "sent") {
    return (
      <div className="rounded-sm border border-signal/30 bg-signal/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="live-dot" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
            Build sheet received
          </h3>
        </div>
        <p className="text-sm text-fog leading-relaxed mb-6">
          We&apos;ll confirm pricing and lead time within 24 hours at <strong className="text-foreground">{email}</strong>.
        </p>

        {/* Spec readback */}
        <div className="rounded-sm border border-line bg-carbon p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="kicker">Your spec</span>
            <button
              onClick={handleCopy}
              className="btn btn-ghost !py-1.5 !px-3 !text-[0.65rem]"
            >
              {copied ? (
                <span className="text-signal">Copied</span>
              ) : (
                "Copy spec"
              )}
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {COMPONENTS.map((g) => {
              const opt = optionById(g.id, selections[g.id]);
              if (!opt) return null;
              return (
                <div key={g.id} className="flex items-start justify-between gap-4 text-xs">
                  <span className="text-fog">{g.name}</span>
                  <span className="text-foreground text-right">{opt.label}</span>
                </div>
              );
            })}
            {addons.length > 0 && (
              <>
                <div className="border-t border-line my-1" />
                {addons.map((id) => {
                  const a = ADDONS.find((x) => x.id === id);
                  if (!a) return null;
                  return (
                    <div key={id} className="flex items-start justify-between gap-4 text-xs">
                      <span className="text-fog">{a.name}</span>
                      <span className="tnum text-foreground">{inr(a.price)}</span>
                    </div>
                  );
                })}
              </>
            )}
            <div className="border-t border-line mt-2 pt-3 flex items-center justify-between">
              <span className="mono text-xs text-fog uppercase tracking-widest">Total</span>
              <span className="tnum mono text-base font-bold text-foreground">{inr(total)}</span>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="btn btn-ghost w-full">
          Close
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-sm border border-line bg-carbon px-3 py-2.5 text-sm text-foreground placeholder:text-fog-2 outline-none focus:border-flame transition-colors";
  const labelCls = "block mono text-[0.65rem] uppercase tracking-widest text-fog mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider">
          Request this build
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-line text-fog hover:text-foreground transition-colors"
          aria-label="Close form"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputCls}
            aria-required="true"
          />
          {errors.name && <p className="mt-1 text-xs text-flame">{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
            aria-required="true"
          />
          {errors.email && <p className="mt-1 text-xs text-flame">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelCls}>Phone *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className={inputCls}
          aria-required="true"
        />
        {errors.phone && <p className="mt-1 text-xs text-flame">{errors.phone}</p>}
      </div>

      <div>
        <label className={labelCls}>Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any questions, timeline, or special requirements…"
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-flame w-full disabled:opacity-60"
      >
        {state === "sending" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5"/>
              <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Sending…
          </span>
        ) : (
          "Request this build"
        )}
      </button>

      <p className="text-[0.65rem] text-fog text-center leading-relaxed">
        No payment now · we&apos;ll confirm availability, lead time, and final pricing within 24 h.
      </p>
    </form>
  );
}

// ─── Summary panel ────────────────────────────────────────────────────────────

function SummaryPanel({
  selections,
  addons,
  total,
}: {
  selections: Record<string, string>;
  addons: string[];
  total: number;
}) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-0">
      {/* Total */}
      <div className="border-b border-line pb-5 mb-5">
        <p className="kicker mb-2">Build total</p>
        <div className="flex items-baseline gap-1.5">
          <span className="mono text-lg text-fog">₹</span>
          <span className="tnum font-display text-3xl font-bold text-foreground">
            <AnimatedTotal value={total} />
          </span>
        </div>
        <p className="mt-1 mono text-[0.6rem] text-fog-2 uppercase tracking-widest">
          Indicative · INR · confirmed at quote
        </p>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-2 mb-5">
        {COMPONENTS.map((g) => {
          const opt = optionById(g.id, selections[g.id]);
          if (!opt) return null;
          return (
            <div key={g.id} className="flex items-start justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="text-fog uppercase tracking-wide mono text-[0.6rem]">{g.name}</div>
                <div className="text-foreground mt-0.5 leading-snug">{opt.label}</div>
              </div>
              <div className="tnum mono text-foreground shrink-0 pt-3.5">
                {inr(opt.price)}
              </div>
            </div>
          );
        })}

        {addons.length > 0 && (
          <>
            <div className="border-t border-line my-2" />
            {addons.map((id) => {
              const a = ADDONS.find((x) => x.id === id);
              if (!a) return null;
              return (
                <div key={id} className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="text-fog uppercase tracking-wide mono text-[0.6rem]">Add-on</div>
                    <div className="text-foreground mt-0.5">{a.name}</div>
                  </div>
                  <div className="tnum mono text-foreground shrink-0 pt-3.5">{inr(a.price)}</div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* CTA or form */}
      {formOpen ? (
        <OrderForm
          selections={selections}
          addons={addons}
          total={total}
          onClose={() => setFormOpen(false)}
        />
      ) : (
        <button
          onClick={() => setFormOpen(true)}
          className="btn btn-flame w-full"
        >
          Request this build
        </button>
      )}
    </div>
  );
}

// ─── Mobile sticky bar ────────────────────────────────────────────────────────

function MobileStickyBar({
  total,
  selections,
  addons,
}: {
  total: number;
  selections: Record<string, string>;
  addons: string[];
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-carbon/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSheetOpen(false)}
        />
      )}

      {/* Sheet */}
      <div
        className={[
          "fixed inset-x-0 z-50 rounded-t-[6px] border-t border-line bg-carbon-2 px-5 pt-5 pb-safe-or-6 transition-transform duration-300 lg:hidden",
          sheetOpen ? "bottom-0" : "bottom-0 translate-y-[calc(100%-72px)]",
        ].join(" ")}
        style={{ paddingBottom: sheetOpen ? "env(safe-area-inset-bottom, 24px)" : undefined }}
      >
        {/* Sheet handle + collapsed total */}
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setSheetOpen((o) => !o)}
        >
          <div>
            <p className="mono text-[0.6rem] text-fog uppercase tracking-widest">
              Build total
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="mono text-sm text-fog">₹</span>
              <span className="tnum font-display text-xl font-bold">
                <AnimatedTotal value={total} />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setSheetOpen(false); }}
              style={{ display: sheetOpen ? undefined : "none" }}
              className="mono text-[0.65rem] text-fog uppercase tracking-widest"
              aria-label="Close summary"
            >
              Close
            </button>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              className={`transition-transform duration-300 ${sheetOpen ? "rotate-180" : ""}`}
            >
              <path d="M1 9l7-7 7 7" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Expanded content */}
        {sheetOpen && (
          <div className="mt-5 max-h-[60vh] overflow-y-auto">
            <SummaryPanel selections={selections} addons={addons} total={total} />
          </div>
        )}
      </div>
    </>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export function Configurator() {
  const [selections, setSelections] = useState<Record<string, string>>(
    defaultSelections,
  );
  const [addons, setAddons] = useState<string[]>([]);

  const total = totalFor(selections, addons);
  const preset = activePreset(selections, addons);

  const applyPreset = (p: Preset) => {
    setSelections({ ...p.selections });
    setAddons([...p.addons]);
  };

  const selectOption = (groupId: string, optId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: optId }));
  };

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)] lg:gap-10 lg:items-start">
        {/* ── Left column: groups + addons ── */}
        <div className="lg:pb-24">
          {/* Preset switcher */}
          <div className="mb-8 pb-8 border-b border-line">
            <p className="kicker mb-4">Start from a preset</p>
            <PresetSwitcher active={preset} onSelect={applyPreset} />
            {preset && (
              <p className="mt-3 text-xs text-fog italic">
                {preset.profile}
              </p>
            )}
          </div>

          {/* Component groups */}
          <div>
            {COMPONENTS.map((group, i) => (
              <GroupSection
                key={group.id}
                group={group}
                index={i}
                total={COMPONENTS.length}
                selectedId={selections[group.id] ?? group.options[0].id}
                onSelect={(optId) => selectOption(group.id, optId)}
              />
            ))}
          </div>

          {/* Add-on packs */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="kicker mb-2">Add-on packs</p>
            <p className="text-xs text-fog mb-6 max-w-xl leading-relaxed">
              Bolt-on modules — toggle any you want included in the quote.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ADDONS.map((addon) => (
                <AddonCard
                  key={addon.id}
                  addon={addon}
                  selected={addons.includes(addon.id)}
                  onToggle={() => toggleAddon(addon.id)}
                />
              ))}
            </div>
          </div>

          {/* Bottom spacer for mobile sticky bar */}
          <div className="h-24 lg:hidden" />
        </div>

        {/* ── Right column: sticky summary (desktop only) ── */}
        <div className="hidden lg:block">
          <div className="sticky top-28 rounded-sm border border-line bg-carbon-2 p-6">
            <SummaryPanel
              selections={selections}
              addons={addons}
              total={total}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bar ── */}
      <MobileStickyBar
        total={total}
        selections={selections}
        addons={addons}
      />
    </>
  );
}
