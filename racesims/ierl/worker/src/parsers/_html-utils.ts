// Tiny HTML table extractor — Workers don't ship with a DOM. Regex-based, but
// scoped narrowly enough that it survives most layouts. Each parser composes
// these helpers and adds source-specific column heuristics.

export type Row = { cells: string[]; raw: string };

// Strip tags, decode common entities, collapse whitespace.
export function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract every <table>...</table> block (greedy-safe variant).
export function extractTables(html: string): string[] {
  const out: string[] = [];
  const re = /<table\b[^>]*>([\s\S]*?)<\/table>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[1]!);
  return out;
}

// Extract rows. Skips <thead> rows when explicitly tagged.
export function extractRows(tableInner: string): Row[] {
  const rows: Row[] = [];
  const re = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tableInner)) !== null) {
    const inner = m[1]!;
    // Skip header rows: have <th> but no <td>.
    if (/<th\b/i.test(inner) && !/<td\b/i.test(inner)) continue;
    const cells = extractCells(inner);
    if (cells.length === 0) continue;
    rows.push({ cells, raw: m[0]! });
  }
  return rows;
}

export function extractCells(rowInner: string): string[] {
  const out: string[] = [];
  const re = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(rowInner)) !== null) {
    out.push(stripTags(m[1]!));
  }
  return out;
}

// Match a lap-time-shaped string anywhere inside a cell.
//   "1:31.234" / "1:31:234" / "91.234" / "1'31\"234"
const LAP_TIME_RE = /(\d{1,2})[:.'](\d{2})[:.\"](\d{1,3})|(\d{1,2})[:.](\d{1,3})/;
export function findLapTimeCell(cells: string[]): { index: number; raw: string } | null {
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]!;
    if (LAP_TIME_RE.test(c)) return { index: i, raw: c };
  }
  return null;
}

// Find the column that holds the driver name. Heuristic:
// it's the first cell with at least one alpha word that isn't a number/time/position.
export function findDriverCell(cells: string[], lapIndex: number): { index: number; raw: string } | null {
  for (let i = 0; i < cells.length; i++) {
    if (i === lapIndex) continue;
    const c = cells[i]!.trim();
    if (!c) continue;
    if (/^\d+$/.test(c)) continue;
    if (LAP_TIME_RE.test(c)) continue;
    if (/^[A-Za-z][A-Za-z .'-]+/.test(c)) return { index: i, raw: c };
  }
  return null;
}
