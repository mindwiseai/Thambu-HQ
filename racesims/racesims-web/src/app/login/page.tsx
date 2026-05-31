"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured, SITE_URL } from "@/lib/supabase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      setState("error");
      setMsg("Driver accounts go live once the centre opens. Check back soon.");
      return;
    }
    setState("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
    });
    if (error) {
      setState("error");
      setMsg(error.message);
    } else {
      setState("sent");
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-carbon px-5 pt-28 pb-16">
      {/* backdrop */}
      <div className="grid-lines grid-lines-fade pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[55vh] w-[55vh] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,59,29,0.14) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="clip-corner relative z-10 w-full max-w-md border border-line bg-carbon-2 p-8 sm:p-10"
      >
        <p className="kicker">Driver Account</p>
        <h1 className="headline mt-3 text-3xl text-foreground sm:text-4xl">
          SIGN IN TO<br />THE PADDOCK
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-fog">
          Track your training journey, save builds, manage centre bookings, and climb
          the tiers. No password — we email you a one-click sign-in link.
        </p>

        {!isSupabaseConfigured && (
          <div className="mt-6 rounded-sm border border-amber/30 bg-amber/5 p-3">
            <p className="mono text-[0.65rem] uppercase tracking-[0.15em] text-amber">
              Preview mode
            </p>
            <p className="mt-1 text-xs leading-relaxed text-fog">
              Accounts aren&apos;t live yet. Explore the{" "}
              <Link href="/account" className="ulink text-foreground">dashboard preview</Link>{" "}
              to see what&apos;s coming.
            </p>
          </div>
        )}

        {state === "sent" ? (
          <div className="mt-8 rounded-sm border border-signal/30 bg-signal/5 p-4">
            <p className="mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
              Check your inbox
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fog">
              We sent a sign-in link to <span className="text-foreground">{email}</span>. Click
              it on this device to enter your account.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="kicker mb-2 block">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-sm border border-line bg-carbon px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-fog-2 focus:border-flame"
              />
            </div>
            <button
              type="submit"
              disabled={state === "sending"}
              className="btn btn-flame w-full justify-center disabled:opacity-60"
            >
              {state === "sending" ? "Sending link…" : "Email me a sign-in link →"}
            </button>
            {state === "error" && (
              <p className="text-xs leading-relaxed text-flame">{msg}</p>
            )}
          </form>
        )}

        <p className="mt-6 text-center mono text-[0.65rem] uppercase tracking-[0.15em] text-fog-2">
          New here? The same link creates your account.
        </p>
      </motion.div>
    </section>
  );
}
