import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/primitives";
import { PRESETS, totalFor, inr } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Shop — Sim Racing Hardware",
  description:
    "Own the machine. Spec a complete simulator in the configurator, browse Conspit & VNM hardware, or start from a pre-specced bundle. Built and serviced in Chennai.",
};

const ROUTES = [
  {
    href: "/configurator", label: "The Configurator", img: "/products/ares-plat-20.jpg",
    blurb: "Spec a complete sim from first principles — wheelbase to haptics. Live pricing, a race-engineer's defaults, save it to your account.",
    cta: "Build your sim",
  },
  {
    href: "/products", label: "Browse Hardware", img: "/products/c300gt.jpg",
    blurb: "The full line — wheelbases, wheels, pedals, cockpits, displays, PCs. Every part chosen for outcomes, not spec-sheet bragging.",
    cta: "See the hardware",
  },
  {
    href: "/products#bundles", label: "Ready-Made Bundles", img: "/products/cpp-evo-3.jpg",
    blurb: "Pre-specced builds at every level — Apex, GT, Formula, Rally. The fast path for buyers who'd rather not assemble decisions.",
    cta: "Browse bundles",
  },
];

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-carbon pt-36 pb-16 sm:pt-44">
        <div className="grid-lines grid-lines-fade pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <FadeUp><p className="kicker">Shop · Own the machine</p></FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="headline mt-5 text-[clamp(2.75rem,8vw,6rem)] leading-[0.88] text-foreground">
              SPEC IT.<br /><span className="text-flame">OWN IT.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              Three ways in: configure a sim component by component, browse the full hardware
              line, or start from a pre-specced bundle. All built, serviced and customised in
              Chennai — by a race engineer.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-carbon">
        <Stagger className="mx-auto grid max-w-7xl gap-px px-5 py-16 sm:px-8 md:grid-cols-3 md:py-20">
          {ROUTES.map((r) => (
            <StaggerItem key={r.href}>
              <Link href={r.href} className="clip-corner group flex h-full flex-col overflow-hidden border border-line bg-carbon-2 transition-colors hover:border-fog-2">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-carbon-3">
                  <Image src={r.img} alt={r.label} fill sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="headline text-2xl text-foreground">{r.label}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{r.blurb}</p>
                  <span className="mt-6 flex items-center gap-2 mono text-xs uppercase tracking-[0.16em] text-flame transition-all group-hover:tracking-[0.2em]">
                    {r.cta} <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* preset quick-pick */}
      <section className="border-t border-line bg-carbon-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <FadeUp>
            <p className="kicker">Not sure where to start?</p>
            <h2 className="headline mt-4 text-3xl text-foreground sm:text-4xl">START FROM A PRESET</h2>
          </FadeUp>
          <Stagger className="mt-10 grid gap-px md:grid-cols-3">
            {PRESETS.map((p) => {
              const total = totalFor(p.selections, p.addons);
              const featured = p.id === "sim";
              return (
                <StaggerItem key={p.id}>
                  <Link href={`/configurator?preset=${p.id}`}
                    className={`clip-corner flex h-full flex-col border p-7 transition-all hover:-translate-y-1 ${
                      featured ? "border-flame/40 bg-carbon-3" : "border-line bg-carbon hover:border-fog-2"}`}>
                    {featured && <span className="mb-4 inline-flex w-fit bg-flame px-3 py-1 mono text-[0.6rem] uppercase tracking-[0.2em] text-white">Most should buy</span>}
                    <p className="kicker">{p.name}</p>
                    <h3 className="headline mt-2 text-2xl text-foreground">{p.tagline.toUpperCase()}</h3>
                    <p className="mt-3 flex-1 text-sm text-fog">{p.profile}</p>
                    <p className="mt-6 headline text-2xl text-amber">{inr(total)}</p>
                    <span className="mt-1 mono text-[0.6rem] uppercase tracking-widest text-fog-2">from · indicative</span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
