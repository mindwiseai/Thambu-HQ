// Shared site helpers — JSON fetch, lap-time formatting, page-level boot.

const API_BASE = (() => {
  // Dev: Pages on :8788 fetches the Worker on :8787 via CORS (worker returns
  // `access-control-allow-origin: *`). Production: same-origin via the
  // Cloudflare zone routing — the Pages domain has /api/* mapped to the worker.
  if (typeof location !== 'undefined' && location.hostname === 'localhost' && location.port === '8788') {
    return 'http://localhost:8787';
  }
  return '';
})();

export async function api(path) {
  const res = await fetch(API_BASE + path, { headers: { 'accept': 'application/json' } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 120)}`);
  }
  return await res.json();
}

export function fmtLapTime(ms) {
  if (ms == null || !Number.isFinite(ms)) return '—';
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  const rem = ms % 1000;
  const secStr = sec.toString().padStart(2, '0');
  const remStr = rem.toString().padStart(3, '0');
  return min > 0
    ? `${min}:${secStr}<span class="ms">.${remStr}</span>`
    : `${sec}<span class="ms">.${remStr}</span>`;
}

export function fmtGap(ms) {
  if (ms == null) return '';
  if (ms === 0) return '—';
  const sec = Math.floor(ms / 1000);
  const rem = ms % 1000;
  return `+${sec}.${rem.toString().padStart(3, '0')}`;
}

export function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'className') e.className = v;
    else if (k.startsWith('data-')) e.setAttribute(k, v);
    else if (k === 'html') e.innerHTML = v;
    else e[k] = v;
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    e.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return e;
}

export function qs(name, fallback = '') {
  const params = new URLSearchParams(location.search);
  return params.get(name) ?? fallback;
}

export function relTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}
