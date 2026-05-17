// Slugify a driver's display name into a stable URL/dedup key.
// "Rahul Sharma" -> "rahul-sharma"
// "Rahul S." -> "rahul-s" (NOT collapsed to "rahul-sharma" — name canonicalization is a v2 concern)
// "Karthik (RaceSims Chennai)" -> "karthik" (parens stripped — they usually carry partner labels)

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

// Lap-time strings come in many shapes. Normalize to integer milliseconds.
//   "1:31.234"      -> 91234
//   "1:31:234"      -> 91234   (some sources use ":" everywhere)
//   "91.234"        -> 91234   (no minutes)
//   "0:91.234"      -> 91234
//   "1'31\"234"     -> 91234   (apostrophe / double-quote variant)
// Returns null if it can't make sense of the input.
export function parseLapTimeMs(input: string): number | null {
  if (!input) return null;
  const cleaned = input.trim().replace(/['"`]/g, ':').replace(/\s+/g, '');

  const patterns: RegExp[] = [
    /^(\d+):(\d{1,2})[:.](\d{1,3})$/,
    /^(\d{1,2})[:.](\d{1,3})$/,
  ];

  for (const re of patterns) {
    const m = cleaned.match(re);
    if (!m) continue;
    if (m.length === 4) {
      const min = parseInt(m[1]!, 10);
      const sec = parseInt(m[2]!, 10);
      const ms = parseInt(m[3]!.padEnd(3, '0').slice(0, 3), 10);
      if (sec >= 60) return null;
      return min * 60_000 + sec * 1_000 + ms;
    }
    if (m.length === 3) {
      const sec = parseInt(m[1]!, 10);
      const ms = parseInt(m[2]!.padEnd(3, '0').slice(0, 3), 10);
      return sec * 1_000 + ms;
    }
  }
  return null;
}

// Format ms back to "1:31.234" — used by the API layer when sending text.
// The site itself prefers raw ms and formats client-side, but tests and
// the /status page benefit from a canonical formatter.
export function formatLapTime(ms: number): string {
  if (ms < 0) return '—';
  const min = Math.floor(ms / 60_000);
  const sec = Math.floor((ms % 60_000) / 1_000);
  const rem = ms % 1_000;
  const secStr = sec.toString().padStart(2, '0');
  const remStr = rem.toString().padStart(3, '0');
  return min > 0 ? `${min}:${secStr}.${remStr}` : `${sec}.${remStr}`;
}

// SHA-1 hex digest using SubtleCrypto (Workers has it natively).
export async function sha1Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-1', buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
