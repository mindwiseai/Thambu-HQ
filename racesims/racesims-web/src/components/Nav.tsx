"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/configurator", label: "Configure" },
  { href: "/sim-centre", label: "Sim Centre" },
  { href: "/league", label: "League" },
  { href: "/products", label: "Hardware" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[3px] border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-line bg-carbon/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="RaceSims home">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="ulink mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
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

      {open && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[3px] border border-line bg-carbon-2/95 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line px-5 py-4 mono text-sm uppercase tracking-wider text-fog hover:text-foreground"
            >
              {l.label}<span className="text-flame">→</span>
            </Link>
          ))}
          <Link href="/configurator" onClick={() => setOpen(false)} className="block px-5 py-4 mono text-sm uppercase tracking-wider text-flame">
            Build yours →
          </Link>
        </div>
      )}
    </header>
  );
}
