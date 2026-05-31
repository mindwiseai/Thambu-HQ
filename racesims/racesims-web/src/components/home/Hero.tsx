"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LineReveal, EASE } from "@/components/motion/primitives";
import { HeroStats } from "./HeroStats";

const EASE_ARR = EASE;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Parallax: content drifts up & fades as you scroll past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-carbon pt-36 md:pt-44"
    >
      {/* ── Animated speed-grid backdrop ─────────────────────────────── */}
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div className="grid-lines grid-lines-fade absolute inset-0 opacity-70" />
        {/* sweeping speed lines */}
        <SpeedLines />
        {/* radial flame glow, breathing */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,29,0.16) 0%, rgba(255,59,29,0.04) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* corner accents draw in */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 h-px bg-gradient-to-l from-flame/50 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "18rem" }}
        transition={{ duration: 1.1, ease: EASE_ARR, delay: 0.3 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 w-px bg-gradient-to-b from-flame/50 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: "16rem" }}
        transition={{ duration: 1.1, ease: EASE_ARR, delay: 0.45 }}
      />

      {/* ── Hero body ────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        {/* kicker */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="live-dot-red live-dot" />
          <span className="kicker tracking-[0.25em]">
            Sim Racing · Engineered in India
          </span>
        </motion.div>

        {/* headline — kinetic line reveal */}
        <h1 className="headline mt-8 text-[clamp(3.5rem,12vw,9rem)] leading-[0.86]">
          <LineReveal
            delay={0.35}
            lines={[
              <span key="1" className="text-foreground">FEEL EVERY</span>,
              <span key="2" className="text-flame">APEX</span>,
            ]}
          />
        </h1>

        {/* subcopy */}
        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.9 }}
        >
          Built by a race engineer with championship-winning pedigree. Spec a
          simulator from first principles, book a rig at the Chennai Sim Centre,
          race the Indian Esports Racing League.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ARR, delay: 1.05 }}
        >
          <Link href="/configurator" className="btn btn-flame group">
            Build your sim
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link href="/sim-centre" className="btn btn-ghost">
            Book the Chennai centre
          </Link>
        </motion.div>
      </motion.div>

      {/* telemetry stats strip */}
      <motion.div
        className="relative z-20 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_ARR, delay: 1.2 }}
      >
        <HeroStats />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-fog/0 via-fog to-fog/0"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* Diagonal speed lines that sweep across the hero, evoking motion blur. */
function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.18]">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-[40vw] bg-gradient-to-r from-transparent via-flame to-transparent"
          style={{ top: `${12 + i * 12}%`, left: 0 }}
          initial={{ x: "-45vw" }}
          animate={{ x: "145vw" }}
          transition={{
            duration: 3.5 + (i % 3),
            repeat: Infinity,
            ease: "easeIn",
            delay: i * 0.9,
            repeatDelay: 2.5,
          }}
        />
      ))}
    </div>
  );
}
