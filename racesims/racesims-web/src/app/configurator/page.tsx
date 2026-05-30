import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Configurator | RaceSims",
  description:
    "Build your sim racing setup component by component. Race-engineer curated options, INR pricing, instant totals.",
};

export default function ConfiguratorPage() {
  return (
    <div className="min-h-screen bg-carbon">
      {/* Page header */}
      <div className="relative border-b border-line bg-carbon-2 pt-28 pb-10 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="kicker mb-4">Build configurator</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            Engineer your rig
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog sm:text-base">
            Every option is curated by a race engineer who has built championship-winning
            setups. Pick your components — the total updates live.
          </p>
        </div>
      </div>

      <Configurator />
    </div>
  );
}
