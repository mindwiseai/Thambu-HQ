-- Kiosk sign-ins: private map from public leaderboard handle -> real person.
-- Phone is PII and is never exposed by any public API. Only the handle is public.

CREATE TABLE IF NOT EXISTS kiosk_signins (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  centre_slug  TEXT,
  rig          TEXT,
  handle       TEXT NOT NULL,
  driver_name  TEXT NOT NULL,
  phone        TEXT,
  class        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kiosk_signins_handle  ON kiosk_signins(handle);
CREATE INDEX IF NOT EXISTS idx_kiosk_signins_created ON kiosk_signins(created_at);
