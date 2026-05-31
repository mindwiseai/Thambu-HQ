"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LineReveal, EASE } from "@/components/motion/primitives";
import { HeroStats } from "./HeroStats";

const EASE_ARR = EASE;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rigY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rigScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-carbon"
    >
      {/* ── Full-bleed rig photograph, treated ───────────────────────── */}
      <motion.div
        style={{ y: rigY, scale: rigScale }}
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE_ARR }}
        aria-hidden
      >
        {/* flame wash behind the rig's screens */}
        <div
          className="absolute right-[6%] top-1/4 h-[55vh] w-[55vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,59,29,0.20) 0%, rgba(255,59,29,0.05) 42%, transparent 70%)",
          }}
        />
        {/* the studio cutout — anchored right on desktop, centred + dimmed on mobile */}
        <div className="absolute inset-y-0 right-0 w-full sm:w-[62%] opacity-30 sm:opacity-100">
          <Image
            src="/hero/rig-studio.png"
            alt="RaceSims full-motion simulator — triple curved screens, bucket seat, VNM 3DOF motion"
            fill
            priority
            sizes="(max-width:640px) 100vw, 62vw"
            className="object-contain object-center sm:object-right"
          />
        </div>
        {/* feather the cutout's left edge into the carbon page */}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/70 to-transparent sm:via-carbon/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
      </motion.div>

      {/* faint speed grid over everything for cohesion */}
      <div className="grid-lines grid-lines-fade pointer-events-none absolute inset-0 z-[1] opacity-30" aria-hidden />

      {/* corner accents */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 h-px bg-gradient-to-l from-flame/60 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "20rem" }}
        transition={{ duration: 1.1, ease: EASE_ARR, delay: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 z-10 w-px bg-gradient-to-t from-flame/40 to-transparent"
        initial={{ height: 0 }}
        animate={{ height: "12rem" }}
        transition={{ duration: 1.1, ease: EASE_ARR, delay: 0.6 }}
      />

      {/* ── Copy ─────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-36 sm:px-8 md:pt-44"
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="live-dot-red live-dot" />
          <span className="kicker tracking-[0.25em]">Sim Racing · Engineered in India</span>
        </motion.div>

        <h1 className="headline mt-8 text-[clamp(3.25rem,11vw,8.5rem)] leading-[0.84] drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)]">
          <LineReveal
            delay={0.45}
            lines={[
              <span key="1" className="text-foreground">FEEL EVERY</span>,
              <span key="2" className="text-flame">APEX</span>,
            ]}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-lg text-base leading-relaxed text-fog sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ARR, delay: 1.0 }}
        >
          Built by a race engineer with championship-winning pedigree. Spec a simulator from
          first principles, book a rig at the Chennai Sim Centre, race the Indian Esports
          Racing League.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ARR, delay: 1.15 }}
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
        className="relative z-20 w-full bg-carbon/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_ARR, delay: 1.3 }}
      >
        <HeroStats />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
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
