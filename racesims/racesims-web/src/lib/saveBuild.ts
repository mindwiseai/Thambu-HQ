"use client";

import { createClient } from "@/lib/supabase/client";

export type BuildPayload = {
  name: string;
  preset: string | null;
  selections: Record<string, string>;
  addons: string[];
  total: number;
};

export type SaveResult =
  | { ok: true; where: "account" }
  | { ok: true; where: "local" }
  | { ok: false; reason: "signed-out"; where: "local" }
  | { ok: false; reason: "error"; message: string };

const LS_KEY = "racesims:saved-builds";

// Read local builds (preview mode / signed-out fallback).
export function localBuilds(): (BuildPayload & { id: string; created_at: string })[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(build: BuildPayload) {
  const list = localBuilds();
  // stable, render-safe id without Math.random/Date in module scope
  const id = "local-" + Date.now().toString(36);
  list.unshift({ ...build, id, created_at: new Date().toISOString() });
  localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 20)));
}

/**
 * Save a build. If signed in to Supabase -> persists to the account.
 * Otherwise -> localStorage, and signals the caller to nudge toward login.
 */
export async function saveBuild(build: BuildPayload): Promise<SaveResult> {
  const supabase = createClient();

  // preview mode (no Supabase) — local only
  if (!supabase) {
    saveLocal(build);
    return { ok: true, where: "local" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    saveLocal(build); // don't lose their work
    return { ok: false, reason: "signed-out", where: "local" };
  }

  const { error } = await supabase.from("saved_builds").insert({
    user_id: user.id,
    name: build.name,
    preset: build.preset,
    selections: build.selections,
    addons: build.addons,
    total: build.total,
  });
  if (error) return { ok: false, reason: "error", message: error.message };

  // log a journey event so the dashboard timeline reflects it
  await supabase.from("journey_events").insert({
    user_id: user.id,
    kind: "milestone",
    title: `Saved a build — ${build.name}`,
    detail: `${build.preset ?? "Custom"} · ₹${build.total.toLocaleString("en-IN")}`,
    points: 0,
  });

  return { ok: true, where: "account" };
}
