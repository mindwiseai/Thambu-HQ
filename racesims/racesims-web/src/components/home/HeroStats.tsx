"use client";

import { CountUp } from "@/components/Reveal";

const STATS = [
  { value: 8,    suffix: "",    label: "Rigs in Chennai" },
  { value: 32,   suffix: " Nm", label: "Max direct-drive torque" },
  { value: 7,    suffix: "",    label: "Sim racing titles" },
  { value: 8,    suffix: "",    label: "League rounds" },
];

export function HeroStats() {
  return (
    <div className="relative z-10 border-t border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-6 pr-6 ${i < STATS.length - 1 ? "border-r border-line" : ""} ${i > 0 ? "pl-6 pr-0" : ""}`}
          >
            <p className="headline text-3xl text-amber sm:text-4xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="kicker mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
