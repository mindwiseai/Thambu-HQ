import type { Parser, ParsedLap } from '../types';
import { parseLapTimeMs } from '../slugify';
import { extractTables, extractRows, findLapTimeCell, findDriverCell } from './_html-utils';

// AC Server Manager (acsm) — emery-pl/server-manager and JustaPenguin/assetto-server-manager
// Results pages render a championship/event view with a leaderboard table.
// Common columns: [pos] [driver] [team] [car] [time] [gap] [laps].
// Some skins put GUID inside a data attribute on the row.

export const acServerManagerParser: Parser = {
  kind: 'ac-server-manager',
  parse(html: string, _sourceUrl: string): ParsedLap[] {
    const out: ParsedLap[] = [];
    const tables = extractTables(html);

    for (const t of tables) {
      const rows = extractRows(t);
      let matched = 0;
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
        matched++;
      }
      if (matched > 0) break;
    }

    return out;
  },
};
