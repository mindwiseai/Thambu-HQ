"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { href: "/configurator", label: "Configure" },
  { href: "/sim-centre", label: "Sim Centre" },
  { href: "/league", label: "League" },
  { href: "/products", label: "Hardware" },
  { href: "/about", label: "About" },
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[3px] border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-line bg-carbon/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2" aria-label="RaceSims home">
          <Wordmark className="transition-transform duration-200 group-hover:-translate-y-px" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative mono text-xs uppercase tracking-[0.16em] transition-colors ${
                  active ? "text-foreground" : "text-fog hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-flame"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/account"
            aria-label="Driver account"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              pathname.startsWith("/account") || pathname === "/login"
                ? "border-flame text-flame"
                : "border-line text-fog hover:border-fog-2 hover:text-foreground"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2.5 13.5c0-2.6 2.5-4 5.5-4s5.5 1.4 5.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </Link>
          <Link href="/configurator" className="btn btn-flame !py-2.5 !px-4 text-[0.7rem]">
            Build yours
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-[5px]">
            <span className={`block h-[1.5px] w-6 bg-foreground transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-foreground transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[3px] border border-line bg-carbon-2/95 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center justify-between border-b border-line px-5 py-4 mono text-sm uppercase tracking-wider ${
                    active ? "text-foreground" : "text-fog hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span className="text-flame">→</span>
                </Link>
              );
            })}
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
