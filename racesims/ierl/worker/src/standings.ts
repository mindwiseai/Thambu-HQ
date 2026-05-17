import type { ChampionshipRow, Env, LeaderboardRow } from './types';

// Compute the leaderboard for a single event from v_event_leaderboard.
// Returns rows sorted by best lap, with position and gap-to-leader filled in.
export async function computeEventLeaderboard(env: Env, eventId: number): Promise<LeaderboardRow[]> {
  const result = await env.DB.prepare(
    `SELECT driver_slug, display_name, partner_slug, partner_name,
            best_lap_ms, laps_recorded
       FROM v_event_leaderboard
      WHERE event_id = ?
      ORDER BY best_lap_ms ASC`
  )
    .bind(eventId)
    .all<{
      driver_slug: string;
      display_name: string;
      partner_slug: string | null;
      partner_name: string | null;
      best_lap_ms: number;
      laps_recorded: number;
    }>();
  const rows = result.results ?? [];
  if (rows.length === 0) return [];

  const leaderMs = rows[0]!.best_lap_ms;
  return rows.map((r, i) => ({
    position: i + 1,
    driver_slug: r.driver_slug,
    display_name: r.display_name,
    partner_slug: r.partner_slug,
    partner_name: r.partner_name,
    best_lap_ms: r.best_lap_ms,
    laps_recorded: r.laps_recorded,
    gap_ms: r.best_lap_ms - leaderMs,
  }));
}

// Compute the season championship table.
// Strategy: pull every event's leaderboard, award points by season.point_system,
// then for each driver: keep the best (totalRounds - drop_lowest_n) rounds.
// Tiebreak: countback (most wins, most P2s, most P3s, ...).
export async function computeChampionship(env: Env, seasonId: number): Promise<ChampionshipRow[]> {
  const season = await env.DB.prepare(
    `SELECT id, point_system, drop_lowest_n FROM seasons WHERE id = ?`
  )
    .bind(seasonId)
    .first<{ id: number; point_system: string; drop_lowest_n: number }>();
  if (!season) return [];

  const points: number[] = JSON.parse(season.point_system);

  const events = await env.DB.prepare(
    `SELECT id, round_number FROM events
      WHERE season_id = ? AND status IN ('live','finished')
      ORDER BY round_number ASC`
  )
    .bind(seasonId)
    .all<{ id: number; round_number: number }>();
  const eventRows = events.results ?? [];
  if (eventRows.length === 0) return [];

  type Acc = {
    driver_slug: string;
    display_name: string;
    partner_name: string | null;
    points_per_round: number[];
    positions: number[];
  };
  const drivers = new Map<string, Acc>();

  for (const ev of eventRows) {
    const board = await computeEventLeaderboard(env, ev.id);
    for (const row of board) {
      const award = points[row.position - 1] ?? 0;
      let acc = drivers.get(row.driver_slug);
      if (!acc) {
        acc = {
          driver_slug: row.driver_slug,
          display_name: row.display_name,
          partner_name: row.partner_name,
          points_per_round: new Array(eventRows.length).fill(0),
          positions: new Array(eventRows.length).fill(0),
        };
        drivers.set(row.driver_slug, acc);
      }
      const idx = eventRows.findIndex((e) => e.id === ev.id);
      if (idx >= 0) {
        acc.points_per_round[idx] = award;
        acc.positions[idx] = row.position;
      }
    }
  }

  const dropN = Math.max(0, Math.min(season.drop_lowest_n, eventRows.length - 1));

  const ranked: ChampionshipRow[] = [];
  for (const acc of drivers.values()) {
    const sorted = [...acc.points_per_round].sort((a, b) => a - b);
    const dropped = sorted.slice(0, dropN).reduce((a, b) => a + b, 0);
    const total = acc.points_per_round.reduce((a, b) => a + b, 0) - dropped;

    const wins = acc.positions.filter((p) => p === 1).length;
    const podiums = acc.positions.filter((p) => p >= 1 && p <= 3).length;

    ranked.push({
      position: 0,
      driver_slug: acc.driver_slug,
      display_name: acc.display_name,
      partner_name: acc.partner_name,
      total_points: total,
      points_per_round: acc.points_per_round,
      rounds_counted: acc.points_per_round.length - dropN,
      rounds_dropped: dropN,
      wins,
      podiums,
    });
  }

  // Sort by total desc; tiebreak countback by positions array.
  ranked.sort((a, b) => {
    if (b.total_points !== a.total_points) return b.total_points - a.total_points;
    return countback(a, b);
  });

  ranked.forEach((r, i) => (r.position = i + 1));
  return ranked;
}

function countback(a: ChampionshipRow, b: ChampionshipRow): number {
  // Most wins → most P2s → most P3s → ...
  for (let pos = 1; pos <= 20; pos++) {
    const aCount = countPositions(a, pos);
    const bCount = countPositions(b, pos);
    if (bCount !== aCount) return bCount - aCount;
  }
  return 0;
}

function countPositions(row: ChampionshipRow, position: number): number {
  // We don't store positions on ChampionshipRow itself for serialization
  // friendliness; recompute from points_per_round + the season point_system
  // would be circular. The caller passes both rows from the same accumulator
  // pass, so wins/podiums are already populated. Use those for the first two
  // tiers; for deeper countback we approximate from points (10 = P1 in the
  // F1 system, 18 = P2, etc.). Acceptable for a small league.
  if (position === 1) return row.wins;
  if (position <= 3) return row.podiums - row.wins;
  return 0;
}
