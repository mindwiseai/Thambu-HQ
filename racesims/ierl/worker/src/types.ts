export type SourceKind = 'rsr' | 'ac-server-manager' | 'acti' | 'generic' | 'sra-vms';

export type ParsedLap = {
  driver_name: string;
  partner_hint?: string;
  lap_time_ms: number;
  sector1_ms?: number;
  sector2_ms?: number;
  sector3_ms?: number;
  recorded_at?: string;
  is_valid?: boolean;
  raw_row?: string;
};

export type Parser = {
  kind: SourceKind;
  parse(html: string, sourceUrl: string): ParsedLap[];
};

export type Env = {
  DB: D1Database;
  CACHE: KVNamespace;
  ADMIN_TOKEN: string;
  SCRAPE_USER_AGENT: string;
  ENVIRONMENT: string;
  // SRA / Sim Racing Limited VMS API token. Public key from the venue's env-config.js.
  // Sent as `Authorization: SRL <token>`.
  SRA_VMS_TOKEN?: string;
};

export type EventRow = {
  id: number;
  slug: string;
  season_id: number;
  round_number: number;
  name: string;
  track: string;
  track_layout: string | null;
  car: string;
  car_class: string | null;
  starts_at: string;
  ends_at: string;
  status: 'upcoming' | 'live' | 'finished';
  hero_image: string | null;
  notes: string | null;
};

export type LeaderboardRow = {
  position: number;
  driver_slug: string;
  display_name: string;
  partner_slug: string | null;
  partner_name: string | null;
  best_lap_ms: number;
  laps_recorded: number;
  gap_ms: number;
};

export type ChampionshipRow = {
  position: number;
  driver_slug: string;
  display_name: string;
  partner_name: string | null;
  total_points: number;
  points_per_round: number[];
  rounds_counted: number;
  rounds_dropped: number;
  wins: number;
  podiums: number;
};

export type SeasonRow = {
  id: number;
  year: number;
  name: string;
  starts_on: string;
  ends_on: string;
  point_system: string;
  drop_lowest_n: number;
  tiebreaker: string;
  is_current: number;
};
