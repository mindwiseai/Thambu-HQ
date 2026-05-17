import type { Parser, ParsedLap } from '../types';
import { parseLapTimeMs } from '../slugify';
import { extractTables, extractRows, findLapTimeCell, findDriverCell } from './_html-utils';

// RSR Live Timing — radiators-champ.com
// Public ranking pages render a single primary <table> with rows like:
//   [position] [driver] [country flag] [time] [sec1] [sec2] [sec3] [date] [car]
// Column order varies by version. We look for a lap-time-shaped cell, then
// pull the driver from the first non-numeric cell to its left.
//
// When a real fixture is captured, tighten the column heuristics — keep this
// parser pure (no network) so tests stay deterministic.

export const rsrLiveTimingParser: Parser = {
  kind: 'rsr',
  parse(html: string, _sourceUrl: string): ParsedLap[] {
    const out: ParsedLap[] = [];
    const tables = extractTables(html);
    if (tables.length === 0) return out;

    // The RSR ranking table is usually the largest. Pick the table with the
    // most lap-time-shaped rows.
    let best: { table: string; hits: number } = { table: tables[0]!, hits: 0 };
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

      // Optional sector cells: the 3 cells immediately after the lap time.
      const sec1 = parseLapTimeMs(row.cells[lap.index + 1] ?? '');
      const sec2 = parseLapTimeMs(row.cells[lap.index + 2] ?? '');
      const sec3 = parseLapTimeMs(row.cells[lap.index + 3] ?? '');

      out.push({
        driver_name: driver.raw,
        lap_time_ms: lapMs,
        sector1_ms: sec1 ?? undefined,
        sector2_ms: sec2 ?? undefined,
        sector3_ms: sec3 ?? undefined,
        is_valid: true,
        raw_row: row.raw.slice(0, 500),
      });
    }
    return out;
  },
};
