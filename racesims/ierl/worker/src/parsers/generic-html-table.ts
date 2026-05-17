import type { Parser, ParsedLap } from '../types';
import { parseLapTimeMs } from '../slugify';
import { extractTables, extractRows, findLapTimeCell, findDriverCell } from './_html-utils';

// Generic fallback parser — for partner-hosted ad-hoc results pages.
// Walks every <table>, picks the one with the most lap-time-shaped cells,
// then extracts (driver, lap_time) pairs. No assumptions about column order.

export const genericHtmlTableParser: Parser = {
  kind: 'generic',
  parse(html: string, _sourceUrl: string): ParsedLap[] {
    const out: ParsedLap[] = [];
    const tables = extractTables(html);
    if (tables.length === 0) return out;

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
