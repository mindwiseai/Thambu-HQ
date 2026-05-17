import { fmtLapTime, fmtGap, el } from './app.js';

// Render a leaderboard table from an array of LeaderboardRow.
// rows: [{ position, driver_slug, display_name, partner_name, partner_slug, best_lap_ms, gap_ms, laps_recorded }]
export function renderLeaderboard(target, rows, opts = {}) {
  if (typeof target === 'string') target = document.querySelector(target);
  if (!target) return;

  if (!rows || rows.length === 0) {
    target.innerHTML = '<div class="empty">No times recorded yet. Once partners post results, the standings will appear here.</div>';
    return;
  }

  const limit = opts.limit ?? rows.length;
  const data = rows.slice(0, limit);

  const table = el('table', { className: 'leaderboard' },
    el('thead', {},
      el('tr', {},
        el('th', {}, ''),
        el('th', {}, 'Driver'),
        el('th', { style: 'text-align:right' }, 'Best lap'),
        el('th', { style: 'text-align:right' }, 'Gap'),
        opts.showLaps !== false ? el('th', { style: 'text-align:right' }, 'Laps') : null
      )
    ),
    el('tbody', {},
      data.map((r) => el('tr', {},
        el('td', { className: `lb-pos p-${r.position}` }, r.position),
        el('td', { className: 'lb-driver', html: `${escapeHtml(r.display_name)}${r.partner_name ? `<span class="partner">${escapeHtml(r.partner_name)}</span>` : ''}` }),
        el('td', { className: 'lb-time', html: fmtLapTime(r.best_lap_ms) }),
        el('td', { className: 'lb-gap' }, fmtGap(r.gap_ms)),
        opts.showLaps !== false ? el('td', { className: 'lb-laps' }, r.laps_recorded ?? '') : null
      ))
    )
  );

  target.replaceChildren(table);
}

export function renderChampionship(target, rows, events) {
  if (typeof target === 'string') target = document.querySelector(target);
  if (!target) return;

  if (!rows || rows.length === 0) {
    target.innerHTML = '<div class="empty">The season hasn’t scored its first round yet. Check back after Round 1 closes.</div>';
    return;
  }

  const head = el('thead', {},
    el('tr', {},
      el('th', {}, ''),
      el('th', {}, 'Driver'),
      ...events.map((e) => el('th', { style: 'text-align:right' }, `R${e.round_number}`)),
      el('th', { style: 'text-align:right' }, 'Total')
    )
  );

  const body = el('tbody', {},
    rows.map((r) => el('tr', {},
      el('td', { className: `lb-pos p-${r.position}` }, r.position),
      el('td', { className: 'lb-driver', html: `${escapeHtml(r.display_name)}${r.partner_name ? `<span class="partner">${escapeHtml(r.partner_name)}</span>` : ''}` }),
      ...r.points_per_round.map((p) => el('td', { className: 'lb-gap' }, p || '—')),
      el('td', { className: 'lb-time', html: `<strong>${r.total_points}</strong>` })
    ))
  );

  target.replaceChildren(el('table', { className: 'leaderboard' }, head, body));
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
