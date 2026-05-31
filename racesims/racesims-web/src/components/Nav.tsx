"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── The three pillars + their sub-routes (the Shop · Train · Compete spine) ──
type SubLink = { href: string; label: string; blurb: string };
type Pillar = { key: string; label: string; href: string; tagline: string; links: SubLink[] };

const PILLARS: Pillar[] = [
  {
    key: "shop", label: "Shop", href: "/shop", tagline: "Own the machine",
    links: [
      { href: "/configurator", label: "Configurator", blurb: "Spec your sim, component by component" },
      { href: "/products", label: "Hardware", blurb: "Wheelbases, wheels, pedals, cockpits, PCs" },
      { href: "/products#bundles", label: "Bundles", blurb: "Pre-specced builds, ready to order" },
    ],
  },
  {
    key: "train", label: "Train", href: "/train", tagline: "Earn the skill",
    links: [
      { href: "/train", label: "The Academy", blurb: "Structured programmes, real coaching" },
      { href: "/sim-centre", label: "Sim Centre", blurb: "Book a rig at the Chennai centre" },
      { href: "/train#ladder", label: "The Ladder", blurb: "Sim-to-reality — earn a real seat" },
    ],
  },
  {
    key: "compete", label: "Compete", href: "/league", tagline: "Win the season",
    links: [
      { href: "/league", label: "The League", blurb: "IERL — monthly hot-lap championship" },
      { href: "/league#standings", label: "Standings", blurb: "Round leaderboards + the season table" },
      { href: "/league#format", label: "How it works", blurb: "Weekly → quarterly → grand final" },
    ],
  },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl leading-none tracking-tight ${className}`}>
      RACE<span className="text-flame">SIMS</span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null); // mobile accordion
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const pillarActive = (p: Pillar) =>
    p.links.some((l) => pathname === l.href.split("#")[0]) ||
    pathname === p.href;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <nav
        onMouseLeave={() => setHover(null)}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[3px] border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled || hover ? "border-line bg-carbon/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2" aria-label="RaceSims home">
          <Wordmark className="transition-transform duration-200 group-hover:-translate-y-px" />
        </Link>

        {/* desktop pillars */}
        <div className="hidden items-center gap-1 md:flex">
          {PILLARS.map((p) => (
            <div key={p.key} onMouseEnter={() => setHover(p.key)} className="relative">
              <Link
                href={p.href}
                className={`relative flex items-center gap-1.5 px-4 py-2 mono text-xs uppercase tracking-[0.16em] transition-colors ${
                  pillarActive(p) || hover === p.key ? "text-foreground" : "text-fog hover:text-foreground"
                }`}
              >
                {p.label}
                <svg width="8" height="8" viewBox="0 0 8 8" className={`transition-transform duration-200 ${hover === p.key ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M1.5 3l2.5 2.5L6.5 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </svg>
                {pillarActive(p) && (
                  <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-4 right-4 h-px bg-flame"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </Link>
            </div>
          ))}

          <Link href="/about" className={`px-4 py-2 mono text-xs uppercase tracking-[0.16em] transition-colors ${
            pathname === "/about" ? "text-foreground" : "text-fog hover:text-foreground"}`}>
            About
          </Link>

          <Link href="/account" aria-label="Driver account"
            className={`ml-2 flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              pathname.startsWith("/account") || pathname === "/login"
                ? "border-flame text-flame" : "border-line text-fog hover:border-fog-2 hover:text-foreground"}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2.5 13.5c0-2.6 2.5-4 5.5-4s5.5 1.4 5.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </Link>
          <Link href="/configurator" className="btn btn-flame !py-2.5 !px-4 text-[0.7rem]">Build yours</Link>
        </div>

        {/* mobile toggle */}
        <button onClick={() => setOpen((o) => !o)} className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Toggle menu" aria-expanded={open}>
          <div className="space-y-[5px]">
            <span className={`block h-[1.5px] w-6 bg-foreground transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-foreground transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* desktop mega-dropdown */}
      <AnimatePresence>
        {hover && (
          <motion.div
            onMouseEnter={() => setHover(hover)}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 hidden w-full max-w-2xl -translate-x-1/2 px-5 md:block"
          >
            {(() => {
              const p = PILLARS.find((x) => x.key === hover)!;
              return (
                <div className="mt-2 overflow-hidden rounded-[3px] border border-line bg-carbon-2/95 p-2 backdrop-blur-xl">
                  <p className="px-3 pb-2 pt-1 kicker">{p.tagline}</p>
                  <div className="grid gap-1 sm:grid-cols-3">
                    {p.links.map((l) => (
                      <Link key={l.href} href={l.href}
                        className="group flex flex-col gap-1 rounded-sm border border-transparent p-3 transition-colors hover:border-line hover:bg-carbon-3">
                        <span className="flex items-center justify-between font-display text-sm text-foreground">
                          {l.label}
                          <span className="text-flame opacity-0 transition-opacity group-hover:opacity-100">→</span>
                        </span>
                        <span className="text-xs leading-snug text-fog">{l.blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[3px] border border-line bg-carbon-2/95 backdrop-blur-xl md:hidden"
          >
            {PILLARS.map((p) => (
              <div key={p.key} className="border-b border-line">
                <button onClick={() => setAcc(acc === p.key ? null : p.key)}
                  className="flex w-full items-center justify-between px-5 py-4 mono text-sm uppercase tracking-wider text-foreground">
                  {p.label}
                  <span className={`text-flame transition-transform ${acc === p.key ? "rotate-90" : ""}`}>→</span>
                </button>
                <AnimatePresence>
                  {acc === p.key && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden bg-carbon">
                      {p.links.map((l) => (
                        <Link key={l.href} href={l.href}
                          className="block border-t border-line px-8 py-3 text-sm text-fog hover:text-foreground">
                          {l.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link href="/about" className="flex items-center justify-between border-b border-line px-5 py-4 mono text-sm uppercase tracking-wider text-fog hover:text-foreground">
              About<span className="text-flame">→</span>
            </Link>
            <Link href="/account" className="flex items-center justify-between border-b border-line px-5 py-4 mono text-sm uppercase tracking-wider text-fog hover:text-foreground">
              Driver Account<span className="text-flame">→</span>
            </Link>
            <Link href="/configurator" className="block px-5 py-4 mono text-sm uppercase tracking-wider text-flame">
              Build yours →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
