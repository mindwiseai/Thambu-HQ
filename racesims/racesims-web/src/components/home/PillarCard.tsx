"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const MotionLink = motion.create(Link);

type Props = {
  index: string;
  heading: string;
  blurb: string;
  href: string;
  label: string;
};

export function PillarCard({ index, heading, blurb, href, label }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  // glow position follows cursor
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
      <MotionLink
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="clip-corner group relative flex min-h-[20rem] flex-col justify-between overflow-hidden border border-line bg-carbon-2 p-8 transition-colors duration-200 hover:border-fog-2 [transform-style:preserve-3d]"
      >
        {/* cursor-tracking glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x} ${y}, rgba(255,59,29,0.10), transparent 70%)`
            ),
          }}
        />

        <span className="mono text-[0.65rem] tracking-[0.25em] text-fog">{index}</span>

        <div className="mt-auto pt-12">
          <h3 className="headline text-3xl text-foreground sm:text-4xl">{heading}</h3>
          <p className="mt-4 text-sm leading-relaxed text-fog">{blurb}</p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <span className="mono text-xs uppercase tracking-[0.16em] text-flame transition-all duration-200 group-hover:tracking-[0.22em]">
            {label}
          </span>
          <span className="text-flame transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </MotionLink>
  );
}
