import type { Parser, ParsedLap } from '../types';

// Sim Racing Limited VMS — api.simracing.co.uk
// Used by Sim Racing Adda (sra.racecenters.com) and other venues running the
// Race Centres / SRL "Venue Management System".
//
// Endpoint: https://api.simracing.co.uk/v0.1/hotlap_events/{id}
// Auth:     Authorization: SRL <api-key>   (token comes from env.SRA_VMS_TOKEN)
//
// Response shape (abbreviated):
//   { hotlap_events: [
//       { hotlap_event: { id, name, start_date, end_date, venues: [...] } },
//       { sub_event: { sub_event_id, name, circuit_name, circuit_length,
//                       results: [
//                         { result: {
//                             date, customer_id, customer_name, lap_id,
//                             lap_time_ms, lap_time_str, vehicle_name,
//                             venue_id, venue_name, invalid (0|1), verified (0|1),
//                             ... }}
//                       ] }},
//       { sub_event: ... },
//     ] }

type SraResult = {
  date?: string;
  customer_name: string;
  customer_id?: number;
  lap_id: number;
  lap_time_ms: number;
  invalid?: number;
  verified?: number;
  vehicle_name?: string;
  venue_name?: string;
  venue_id?: number;
};

export const sraVmsParser: Parser = {
  kind: 'sra-vms',
  parse(text: string, _sourceUrl: string): ParsedLap[] {
    let payload: any;
    try {
      payload = JSON.parse(text);
    } catch {
      return [];
    }
    const items = payload?.hotlap_events;
    if (!Array.isArray(items)) return [];

    const out: ParsedLap[] = [];
    for (const item of items) {
      const sub = item?.sub_event;
      if (!sub || !Array.isArray(sub.results)) continue;
      for (const r of sub.results) {
        const res: SraResult | undefined = r?.result;
        if (!res) continue;
        if (typeof res.lap_time_ms !== 'number' || res.lap_time_ms <= 0) continue;
        if (!res.customer_name) continue;

        out.push({
          driver_name: res.customer_name.trim(),
          partner_hint: res.venue_name,
          lap_time_ms: res.lap_time_ms,
          recorded_at: res.date ? res.date.replace(' ', 'T') + 'Z' : undefined,
          is_valid: res.invalid !== 1,
          raw_row: `lap_id=${res.lap_id} venue=${res.venue_id} ${res.lap_time_ms}ms`,
        });
      }
    }
    return out;
  },
};
