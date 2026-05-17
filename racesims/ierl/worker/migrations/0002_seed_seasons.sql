-- Seed: 2026 season + RaceSims partner directory.
-- Events and lap data come from sync-config + scrape (real sources).

INSERT INTO seasons (year, name, starts_on, ends_on, point_system, drop_lowest_n, tiebreaker, is_current)
VALUES (
  2026,
  'IERL 2026 Season',
  '2026-03-01',
  '2026-12-31',
  '[25,18,15,12,10,8,6,4,2,1]',
  2,
  'countback',
  1
);

INSERT INTO partners (slug, name, city, state, is_active) VALUES
  ('racesims-chennai',  'RaceSims Chennai',  'Chennai',  'Tamil Nadu', 1),
  ('racesims-bengaluru','RaceSims Bengaluru','Bengaluru','Karnataka',  1),
  ('racesims-mumbai',   'RaceSims Mumbai',   'Mumbai',   'Maharashtra',1),
  ('racesims-delhi',    'RaceSims Delhi',    'New Delhi','Delhi',      1),
  ('racesims-hyderabad','RaceSims Hyderabad','Hyderabad','Telangana',  1),
  ('sim-racing-adda',   'Sim Racing Adda',   'Faridabad','Haryana',    1);
