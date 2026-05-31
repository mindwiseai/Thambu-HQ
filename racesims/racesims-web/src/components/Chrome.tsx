"use client";

import { MotionConfig } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/motion/primitives";
import type { ReactNode } from "react";

/* Site chrome rendered ONCE in the root layout: scroll bar, fixed nav,
   page content, footer. MotionConfig globally honours reduced-motion. */
export function Chrome({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionConfig>
  );
}
