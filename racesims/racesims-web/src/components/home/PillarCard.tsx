"use client";

import Link from "next/link";

type Props = {
  index: string;
  heading: string;
  blurb: string;
  href: string;
  label: string;
};

export function PillarCard({ index, heading, blurb, href, label }: Props) {
  return (
    <Link
      href={href}
      className="clip-corner group relative flex flex-col justify-between border border-line bg-carbon-2 p-8 transition-colors duration-200 hover:border-fog-2 cursor-pointer"
    >
      {/* index */}
      <span className="mono text-[0.65rem] tracking-[0.25em] text-fog">{index}</span>

      {/* heading */}
      <div className="mt-auto pt-12">
        <h3 className="headline text-3xl text-foreground sm:text-4xl">{heading}</h3>
        <p className="mt-4 text-sm leading-relaxed text-fog">{blurb}</p>
      </div>

      {/* CTA */}
      <div className="mt-8 flex items-center gap-2">
        <span className="mono text-xs uppercase tracking-[0.16em] text-flame transition-all duration-200 group-hover:tracking-[0.22em]">
          {label}
        </span>
        <span className="text-flame transition-transform duration-200 group-hover:translate-x-1">→</span>
      </div>

      {/* hover tint */}
      <div className="pointer-events-none absolute inset-0 bg-flame opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]" />
    </Link>
  );
}
