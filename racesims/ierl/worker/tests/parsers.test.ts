import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { rsrLiveTimingParser } from '../src/parsers/rsr-live-timing';
import { genericHtmlTableParser } from '../src/parsers/generic-html-table';
import { sraVmsParser } from '../src/parsers/sra-vms';
import { parseLapTimeMs, formatLapTime, slugify } from '../src/slugify';

const fixturePath = (name: string) => resolve(__dirname, '../../fixtures', name);

describe('slugify', () => {
  it('lowercases and dashes', () => {
    expect(slugify('Rahul Sharma')).toBe('rahul-sharma');
  });
  it('strips parens / partner labels', () => {
    expect(slugify('Karthik (RaceSims Chennai)')).toBe('karthik');
  });
  it('keeps abbreviations distinct', () => {
    expect(slugify('Rahul S.')).toBe('rahul-s');
  });
});

describe('parseLapTimeMs', () => {
  it('parses 1:31.234', () => {
    expect(parseLapTimeMs('1:31.234')).toBe(91234);
  });
  it('parses 1:31:234 (colon variant)', () => {
    expect(parseLapTimeMs('1:31:234')).toBe(91234);
  });
  it('parses sectors without minutes', () => {
    expect(parseLapTimeMs('27.115')).toBe(27115);
  });
  it('rejects garbage', () => {
    expect(parseLapTimeMs('abc')).toBeNull();
    expect(parseLapTimeMs('')).toBeNull();
  });
});

describe('formatLapTime', () => {
  it('formats with minutes', () => {
    expect(formatLapTime(91234)).toBe('1:31.234');
  });
  it('formats sub-minute with no leading zero', () => {
    expect(formatLapTime(27115)).toBe('27.115');
  });
});

describe('rsrLiveTimingParser', () => {
  const html = readFileSync(fixturePath('rsr-monza-bmw-m3-e30-sample.html'), 'utf8');
  const laps = rsrLiveTimingParser.parse(html, 'https://radiators-champ.com/test');

  it('extracts every row', () => {
    expect(laps).toHaveLength(6);
  });

  it('parses the fastest lap correctly', () => {
    expect(laps[0]).toMatchObject({
      driver_name: 'Arjun Rao',
      lap_time_ms: 108342,
      sector1_ms: 27115,
      sector2_ms: 43881,
      sector3_ms: 37346,
      is_valid: true,
    });
  });

  it('keeps the leaderboard order from the source', () => {
    const times = laps.map((l) => l.lap_time_ms);
    for (let i = 1; i < times.length; i++) {
      expect(times[i]!).toBeGreaterThan(times[i - 1]!);
    }
  });
});

describe('genericHtmlTableParser', () => {
  it('extracts laps from the same fixture (fallback works)', () => {
    const html = readFileSync(fixturePath('rsr-monza-bmw-m3-e30-sample.html'), 'utf8');
    const laps = genericHtmlTableParser.parse(html, 'https://example.com/results');
    expect(laps.length).toBe(6);
    expect(laps[0]?.driver_name).toBe('Arjun Rao');
    expect(laps[0]?.lap_time_ms).toBe(108342);
  });
});

describe('sraVmsParser', () => {
  const json = readFileSync(fixturePath('sra-vms-141-monza-formula-hybrid-x.json'), 'utf8');
  const laps = sraVmsParser.parse(json, 'https://api.simracing.co.uk/v0.1/hotlap_events/141');

  it('extracts every result from sub_events', () => {
    expect(laps.length).toBeGreaterThan(50);
  });

  it('parses the fastest lap correctly', () => {
    const fastest = [...laps].sort((a, b) => a.lap_time_ms - b.lap_time_ms)[0]!;
    expect(fastest.driver_name).toBeTruthy();
    expect(fastest.lap_time_ms).toBeGreaterThan(70000);
    expect(fastest.lap_time_ms).toBeLessThan(120000);
  });

  it('flags invalid laps', () => {
    const invalids = laps.filter((l) => l.is_valid === false);
    expect(invalids.length).toBeGreaterThanOrEqual(1);
  });

  it('captures partner_hint from venue_name', () => {
    const withHint = laps.find((l) => l.partner_hint);
    expect(withHint?.partner_hint).toBeTruthy();
  });
});
