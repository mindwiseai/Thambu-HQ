"use client";

import { createClient } from "@/lib/supabase/client";

export type EnrolPayload = {
  programme: string;       // slug
  programme_name: string;
  sessions_total: number;
  centre?: string;
};

export type EnrolResult =
  | { ok: true; where: "account" }
  | { ok: true; where: "local" }
  | { ok: false; reason: "signed-out"; where: "local" }
  | { ok: false; reason: "error"; message: string };

const LS_KEY = "racesims:enrolments";

export function localEnrolments(): (EnrolPayload & {
  id: string; status: string; sessions_done: number; created_at: string;
})[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(p: EnrolPayload) {
  const list = localEnrolments();
  // avoid duplicate enquiries for the same programme
  if (list.some((e) => e.programme === p.programme)) return;
  list.unshift({
    ...p,
    id: "local-" + Date.now().toString(36),
    status: "enquiry",
    sessions_done: 0,
    created_at: new Date().toISOString(),
  });
  localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 20)));
}

/** Enrol (enquire) in an Academy programme. Account when signed in, else local. */
export async function enrol(p: EnrolPayload): Promise<EnrolResult> {
  const supabase = createClient();
  if (!supabase) {
    saveLocal(p);
    return { ok: true, where: "local" };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    saveLocal(p);
    return { ok: false, reason: "signed-out", where: "local" };
  }

  const { error } = await supabase.from("enrolments").insert({
    user_id: user.id,
    programme: p.programme,
    programme_name: p.programme_name,
    sessions_total: p.sessions_total,
    sessions_done: 0,
    status: "enquiry",
    centre: p.centre ?? "chennai",
  });
  if (error) return { ok: false, reason: "error", message: error.message };

  await supabase.from("journey_events").insert({
    user_id: user.id,
    kind: "milestone",
    title: `Enrolled — ${p.programme_name}`,
    detail: "Enquiry sent. The Academy team will confirm your start date.",
    points: 0,
  });

  return { ok: true, where: "account" };
}
