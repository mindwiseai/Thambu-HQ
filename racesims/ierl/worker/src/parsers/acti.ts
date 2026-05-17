import type { Parser, ParsedLap } from '../types';
import { parseLapTimeMs } from '../slugify';
import { extractTables, extractRows, findLapTimeCell, findDriverCell } from './_html-utils';

// ACTI — Assetto Corsa Time Trial / generic time-trial leaderboards.
// Many community AC time-trial sites use a similar table layout. We share the
// same default heuristic as rsr/ac-server-manager — when a real ACTI fixture
// arrives, branch this file with site-specific selectors.

export const actiParser: Parser = {
  kind: 'acti',
  parse(html: string, _sourceUrl: string): ParsedLap[] {
    const out: ParsedLap[] = [];
    const tables = extractTables(html);

    let best: { table: string; hits: number } = { table: '', hits: 0 };
    for (const t of tables) {
      const rows = extractRows(t);
      let hits = 0;
      for (const r of rows) if (findLapTimeCell(r.cells)) hits++;
      if (hits > best.hits) best = { table: t, hits };
    }
    if (best.hits === 0) return out;

    const rows = extractRows(best.table);
    for (const row of rows) {
      const lap = findLapTimeCell(row.cells);
      if (!lap) continue;
      const driver = findDriverCell(row.cells, lap.index);
      if (!driver) continue;

      const lapMs = parseLapTimeMs(lap.raw);
      if (lapMs === null) continue;

      out.push({
        driver_name: driver.raw,
        lap_time_ms: lapMs,
        is_valid: true,
        raw_row: row.raw.slice(0, 500),
      });
    }
    return out;
  },
};
