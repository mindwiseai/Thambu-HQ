"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

const MotionLink = motion.create(Link);

/* A button/link that subtly leans toward the cursor — premium tactile feel.
   Honours reduced-motion globally via MotionConfig (springs resolve to 0). */
export function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.4,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const external = href.startsWith("http") || href.startsWith("mailto");

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={className}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionLink>
  );
}
