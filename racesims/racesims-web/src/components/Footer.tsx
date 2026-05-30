import Link from "next/link";
import { Wordmark } from "./Nav";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark className="!text-2xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            Sim racing, engineered in India. Cockpits built by a race engineer,
            a sim centre in Chennai, and the league that ties it together.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="live-dot" />
            <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-fog">
              Chennai Sim Centre — opening July 2026
            </span>
          </div>
        </div>

        <FooterCol title="Explore" links={[
          { href: "/configurator", label: "Configurator" },
          { href: "/sim-centre", label: "Sim Centre" },
          { href: "/league", label: "The League" },
          { href: "/products", label: "Hardware" },
        ]} />

        <FooterCol title="Company" links={[
          { href: "mailto:thambu@racesims.in", label: "Contact" },
          { href: "https://www.racesims.in", label: "Shop (racesims.in)" },
          { href: "https://instagram.com/race.sims", label: "Instagram" },
          { href: "https://indianesportsracingleague.com", label: "IERL site" },
        ]} />

        <div>
          <h4 className="kicker mb-4">Visit</h4>
          <p className="text-sm leading-relaxed text-fog">
            Nungambakkam<br />Chennai, Tamil Nadu<br />India
          </p>
          <a href="mailto:thambu@racesims.in" className="ulink mt-4 inline-block text-sm text-foreground">
            thambu@racesims.in
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 sm:flex-row sm:items-center sm:px-8">
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-fog-2">
            © {new Date().getFullYear()} RaceSims Solutions Pvt Ltd
          </p>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-fog-2">
            Prices indicative · INR · confirmed at quote
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="kicker mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="ulink text-sm text-fog transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
