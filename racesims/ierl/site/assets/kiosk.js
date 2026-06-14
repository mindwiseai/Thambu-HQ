// IERL kiosk — shared-rig driver sign-in.
// Builds a Content Manager deeplink (acmanager://race/online?...&name=HANDLE)
// so the customer's name lands on the leaderboard, then logs the sign-in to the
// Worker. Config comes from /api/kiosk/config (central) or a local Setup override.

const API_BASE = (() => {
  if (typeof location !== 'undefined' && location.hostname === 'localhost' && location.port === '8788') {
    return 'http://localhost:8787';
  }
  return '';
})();

const OVERRIDE_KEY = 'ierl_kiosk_cfg';

const FALLBACK = {
  leaderboard_url: 'https://indianesportsracingleague.com',
  return_seconds: 12,
  classes: {
    Amateur: { label: 'Amateur — Mazda MX-5', car: 'ks_mazda_mx5_cup', ip: '0.0.0.0', port: 9600, httpPort: 8081 },
    Pro: { label: 'Pro — Ferrari 488 GT3', car: 'ks_ferrari_488_gt3', ip: '0.0.0.0', port: 9610, httpPort: 8082 },
  },
};

const $ = (id) => document.getElementById(id);
const qs = (name, fb = '') => new URLSearchParams(location.search).get(name) ?? fb;

const centre = qs('centre');
const rig = qs('rig');

let config = FALLBACK;
let selectedClass = null;
let returnTimer = null;

// ── helpers ──────────────────────────────────────────────────────────────
function cleanName(raw) {
  const first = (raw || '').trim().split(/\s+/)[0] || '';
  return first.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);
}
function last4(phone) {
  const d = (phone || '').replace(/\D/g, '');
  return d.length >= 4 ? d.slice(-4) : d;
}
function buildHandle(name, phone) {
  const base = cleanName(name) || 'DRIVER';
  const tail = last4(phone);
  return tail ? `${base}-${tail}` : base;
}
function deeplink(cls, handle) {
  const c = config.classes[cls];
  const p = new URLSearchParams({
    ip: String(c.ip), port: String(c.port), httpPort: String(c.httpPort),
    car: String(c.car), name: handle,
  });
  return 'acmanager://race/online?' + p.toString();
}
function classConfigured(cls) {
  const c = config.classes[cls];
  return !!(c && c.ip && c.ip !== '0.0.0.0' && c.port && c.httpPort && c.car);
}

// ── config load ──────────────────────────────────────────────────────────
async function loadConfig() {
  const override = localStorage.getItem(OVERRIDE_KEY);
  if (override) {
    try { return JSON.parse(override); } catch { /* fall through */ }
  }
  try {
    const r = await fetch(API_BASE + '/api/kiosk/config', { headers: { accept: 'application/json' } });
    if (r.ok) return await r.json();
  } catch { /* offline / not deployed */ }
  return FALLBACK;
}

// ── screens ──────────────────────────────────────────────────────────────
function show(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('is-active'));
  $(id).classList.add('is-active');
  if (id === 's-welcome') reset();
}
function reset() {
  if (returnTimer) clearInterval(returnTimer);
  selectedClass = null;
  $('in-name').value = '';
  $('in-phone').value = '';
  document.querySelectorAll('.class-btn').forEach((x) => x.classList.remove('sel'));
  $('preview').textContent = '—';
  $('err').textContent = '';
  $('btn-go').disabled = true;
}
function validate() {
  const name = $('in-name').value;
  const phone = $('in-phone').value;
  const base = cleanName(name) || 'DRIVER';
  const t = last4(phone);
  $('preview').textContent = t ? `${base}-${t}` : base;
  $('btn-go').disabled = !(cleanName(name) && selectedClass);
}

function renderClasses() {
  const wrap = $('classes');
  wrap.innerHTML = '';
  const anyUnconfigured = Object.keys(config.classes).some((k) => !classConfigured(k));
  $('cfg-warning').hidden = !anyUnconfigured;
  Object.entries(config.classes).forEach(([key, c]) => {
    const b = document.createElement('button');
    b.className = 'class-btn';
    b.type = 'button';
    b.innerHTML = `<div class="ck">Class</div><div class="cl">${c.label || key}</div>`;
    b.addEventListener('click', () => {
      selectedClass = key;
      document.querySelectorAll('.class-btn').forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel');
      validate();
    });
    wrap.appendChild(b);
  });
}

async function start() {
  const name = $('in-name').value.trim();
  const phone = $('in-phone').value.trim();
  $('err').textContent = '';
  if (!cleanName(name) || !selectedClass) return;
  if (!classConfigured(selectedClass)) {
    $('err').textContent = 'This rig isn’t configured yet — open Setup ⚙.';
    return;
  }
  const handle = buildHandle(name, phone);
  const link = deeplink(selectedClass, handle);

  // Log the sign-in (best-effort — never blocks the launch).
  fetch(API_BASE + '/api/kiosk/signin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ centre, rig, class: selectedClass, handle, name, phone }),
  }).catch(() => {});

  // Confirmation screen, then launch Content Manager.
  $('out-handle').textContent = handle;
  $('out-class').textContent = 'Launching ' + (config.classes[selectedClass].label || selectedClass);
  $('out-lb').textContent = config.leaderboard_url
    ? 'LIVE LEADERBOARD · ' + config.leaderboard_url.replace(/^https?:\/\//, '')
    : '';
  $('relaunch').href = link;
  show('s-go');

  // Fire the protocol handler (does not unload the page).
  window.location.href = link;

  let secs = Number(config.return_seconds) || 12;
  $('cd').textContent = `Returns in ${secs}s`;
  returnTimer = setInterval(() => {
    secs -= 1;
    $('cd').textContent = `Returns in ${secs}s`;
    if (secs <= 0) { clearInterval(returnTimer); show('s-welcome'); }
  }, 1000);
}

// ── setup panel ──────────────────────────────────────────────────────────
function openSetup() {
  const c = config;
  $('su-lb').value = c.leaderboard_url || '';
  $('su-ret').value = c.return_seconds || '';
  const a = c.classes.Amateur || {}, p = c.classes.Pro || {};
  $('su-a-car').value = a.car || ''; $('su-a-ip').value = (a.ip && a.ip !== '0.0.0.0') ? a.ip : '';
  $('su-a-port').value = a.port || ''; $('su-a-http').value = a.httpPort || '';
  $('su-p-car').value = p.car || ''; $('su-p-ip').value = (p.ip && p.ip !== '0.0.0.0') ? p.ip : '';
  $('su-p-port').value = p.port || ''; $('su-p-http').value = p.httpPort || '';
  $('su-centre').value = centre || '';
  $('su-rig').value = rig || '';
  updateSetupPreview();
  $('setup-overlay').hidden = false;
}
function collectSetup() {
  return {
    leaderboard_url: $('su-lb').value.trim() || FALLBACK.leaderboard_url,
    return_seconds: Number($('su-ret').value) || 12,
    classes: {
      Amateur: {
        label: 'Amateur — Mazda MX-5',
        car: $('su-a-car').value.trim() || 'ks_mazda_mx5_cup',
        ip: $('su-a-ip').value.trim() || '0.0.0.0',
        port: Number($('su-a-port').value) || 9600,
        httpPort: Number($('su-a-http').value) || 8081,
      },
      Pro: {
        label: 'Pro — Ferrari 488 GT3',
        car: $('su-p-car').value.trim() || 'ks_ferrari_488_gt3',
        ip: $('su-p-ip').value.trim() || '0.0.0.0',
        port: Number($('su-p-port').value) || 9610,
        httpPort: Number($('su-p-http').value) || 8082,
      },
    },
  };
}
function updateSetupPreview() {
  const tmp = collectSetup();
  const c = tmp.classes.Amateur;
  const p = new URLSearchParams({
    ip: String(c.ip), port: String(c.port), httpPort: String(c.httpPort), car: String(c.car), name: 'TEST-0001',
  });
  const link = 'acmanager://race/online?' + p.toString();
  const el = $('su-test'); el.textContent = link; el.href = link;
}

// ── boot ─────────────────────────────────────────────────────────────────
async function boot() {
  config = await loadConfig();
  $('rig-tag').textContent = [centre, rig ? 'RIG ' + rig : ''].filter(Boolean).join(' · ') || 'IERL';
  renderClasses();

  $('btn-start').addEventListener('click', () => { show('s-entry'); $('in-name').focus(); });
  $('btn-back').addEventListener('click', () => show('s-welcome'));
  $('btn-go').addEventListener('click', start);
  $('in-name').addEventListener('input', validate);
  $('in-phone').addEventListener('input', validate);
  $('relaunch').addEventListener('click', (e) => {
    // let the anchor's acmanager href fire; just stop page navigation
    e.preventDefault(); window.location.href = $('relaunch').href;
  });

  // Setup
  $('setup-btn').addEventListener('click', openSetup);
  $('su-cancel').addEventListener('click', () => { $('setup-overlay').hidden = true; });
  $('su-save').addEventListener('click', () => {
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(collectSetup()));
    config = collectSetup();
    renderClasses();
    $('setup-overlay').hidden = true;
  });
  $('su-clear').addEventListener('click', async () => {
    localStorage.removeItem(OVERRIDE_KEY);
    config = await loadConfig();
    renderClasses();
    $('setup-overlay').hidden = true;
  });
  ['su-a-car','su-a-ip','su-a-port','su-a-http'].forEach((id) => $(id).addEventListener('input', updateSetupPreview));

  if (qs('setup') === '1') openSetup();
}

boot();
