-- IERL initial schema. SQLite / Cloudflare D1.
-- One season has many events. Each event has many source URLs scraped on cron.
-- Parsed laps are deduped by sha1(url + slug(driver) + lap_ms). Best lap is a view.

CREATE TABLE seasons (
  id            INTEGER PRIMARY KEY,
  year          INTEGER NOT NULL,
  name          TEXT NOT NULL,
  starts_on     TEXT NOT NULL,
  ends_on       TEXT NOT NULL,
  point_system  TEXT NOT NULL,
  drop_lowest_n INTEGER NOT NULL DEFAULT 0,
  tiebreaker    TEXT NOT NULL DEFAULT 'countback',
  is_current    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX idx_seasons_year ON seasons(year);

CREATE TABLE partners (
  id            INTEGER PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  city          TEXT NOT NULL,
  state         TEXT,
  source_url    TEXT,
  logo_url      TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE events (
  id            INTEGER PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  season_id     INTEGER NOT NULL REFERENCES seasons(id),
  round_number  INTEGER NOT NULL,
  name          TEXT NOT NULL,
  track         TEXT NOT NULL,
  track_layout  TEXT,
  car           TEXT NOT NULL,
  car_class     TEXT,
  starts_at     TEXT NOT NULL,
  ends_at       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'upcoming',
  hero_image    TEXT,
  notes         TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_events_season_round ON events(season_id, round_number);
CREATE INDEX idx_events_status ON events(status);

CREATE TABLE event_sources (
  id              INTEGER PRIMARY KEY,
  event_id        INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  partner_id      INTEGER REFERENCES partners(id),
  source_kind     TEXT NOT NULL,
  url             TEXT NOT NULL,
  is_active       INTEGER NOT NULL DEFAULT 1,
  scrape_interval_minutes INTEGER NOT NULL DEFAULT 60,
  last_scraped_at TEXT,
  last_status     TEXT,
  UNIQUE(event_id, url)
);

CREATE TABLE drivers (
  id                INTEGER PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  display_name      TEXT NOT NULL,
  primary_partner_id INTEGER REFERENCES partners(id),
  country           TEXT NOT NULL DEFAULT 'IN',
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE lap_times (
  id              INTEGER PRIMARY KEY,
  event_id        INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  driver_id       INTEGER NOT NULL REFERENCES drivers(id),
  partner_id      INTEGER REFERENCES partners(id),
  lap_time_ms     INTEGER NOT NULL,
  sector1_ms      INTEGER,
  sector2_ms      INTEGER,
  sector3_ms      INTEGER,
  recorded_at     TEXT,
  source_url      TEXT NOT NULL,
  source_row_hash TEXT NOT NULL UNIQUE,
  is_valid        INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_lap_times_event_driver ON lap_times(event_id, driver_id, lap_time_ms);
CREATE INDEX idx_lap_times_event_best   ON lap_times(event_id, lap_time_ms);

CREATE VIEW v_event_leaderboard AS
SELECT
  lt.event_id,
  lt.driver_id,
  d.display_name,
  d.slug AS driver_slug,
  lt.partner_id,
  p.name AS partner_name,
  p.slug AS partner_slug,
  MIN(lt.lap_time_ms) AS best_lap_ms,
  COUNT(*) AS laps_recorded
FROM lap_times lt
JOIN drivers d ON d.id = lt.driver_id
LEFT JOIN partners p ON p.id = lt.partner_id
WHERE lt.is_valid = 1
GROUP BY lt.event_id, lt.driver_id;

CREATE TABLE scrape_errors (
  id                INTEGER PRIMARY KEY,
  event_source_id   INTEGER REFERENCES event_sources(id),
  occurred_at       TEXT NOT NULL DEFAULT (datetime('now')),
  kind              TEXT NOT NULL,
  http_status       INTEGER,
  message           TEXT NOT NULL,
  sample            TEXT
);

CREATE INDEX idx_scrape_errors_recent ON scrape_errors(occurred_at DESC);

CREATE TABLE scrape_runs (
  id                INTEGER PRIMARY KEY,
  started_at        TEXT NOT NULL,
  finished_at       TEXT,
  sources_attempted INTEGER NOT NULL DEFAULT 0,
  sources_ok        INTEGER NOT NULL DEFAULT 0,
  laps_inserted     INTEGER NOT NULL DEFAULT 0,
  laps_deduped      INTEGER NOT NULL DEFAULT 0,
  notes             TEXT
);
