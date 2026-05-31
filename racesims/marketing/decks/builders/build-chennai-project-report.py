#!/usr/bin/env python3
"""
Build script: RaceSims Chennai Project Report (11-page A4-landscape PDF)
Renders HTML → PDF via headless Chrome.

NOTE: Fonts are loaded via Google Fonts @import — rendering requires network access.
      System fallbacks (system-ui / ui-monospace) are included for offline use.

Output (production):
    OUT = /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/marketing/decks/racesims-chennai-project-report.pdf

Repo-root mirror is written automatically after render:
    /Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-chennai-project-report.pdf

Compass correction baked in (pages 4 & 5):
    Original had INVERTED compass. All cardinal labels are 180°-flipped.
    Physical layout/geometry unchanged — only labels corrected.
"""

import os
import shutil
import subprocess
import sys
import tempfile

# ── Output paths ──────────────────────────────────────────────────────────────
OUT = "/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/marketing/decks/racesims-chennai-project-report.pdf"
OUT_ROOT_MIRROR = "/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims/racesims-chennai-project-report.pdf"

# ── Chrome finder ─────────────────────────────────────────────────────────────
def find_chrome():
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "google-chrome",
        "chromium",
        "chromium-browser",
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
        try:
            subprocess.run(["which", c], check=True, capture_output=True)
            return c
        except Exception:
            pass
    raise RuntimeError("Chrome not found. Install Google Chrome or pass CHROME env var.")

# ── HTML ──────────────────────────────────────────────────────────────────────
# Fonts are loaded via Google Fonts @import — rendering requires network access.
# System fallbacks are included in font-family stacks for offline resilience.

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
/* NOTE: Rendering requires network access for Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
/* ── Reset & page geometry ─────────────────────────────────────── */
*{margin:0;padding:0;box-sizing:border-box}
@page{size:297mm 210mm;margin:0}
body{font-family:'Montserrat',system-ui,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}

/* ── Tokens ────────────────────────────────────────────────────── */
:root{
  --ink:#16120c;
  --cream:#F4EFE3;
  --red:#D81E33;
  --gold:#C8A24B;
  --gold-dark:#a07d2e;
  --muted:#8c8479;
  --muted2:#b6ad99;
  --total-tint:#e8dcc0;
  --bar-track:#e6ddcb;
  --white:#fff;
}

/* ── Page shell ────────────────────────────────────────────────── */
section.page{
  width:297mm;height:210mm;
  overflow:hidden;
  position:relative;
  page-break-after:always;
  page-break-inside:avoid;
}
section.page:last-child{page-break-after:auto}

/* ── Mono utility ──────────────────────────────────────────────── */
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}
.tabnum{font-variant-numeric:tabular-nums}

/* ── Shared content-page styles ────────────────────────────────── */
.content-page{background:var(--cream);display:flex;flex-direction:column;padding:28pt 32pt 0 32pt}

/* eyebrow */
.eyebrow{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:7pt;letter-spacing:0.18em;text-transform:uppercase;color:var(--red);margin-bottom:4pt}

/* H1 with red underbar */
.page-h1{font-size:28pt;font-weight:800;color:var(--ink);line-height:1.05;margin-bottom:0}
.red-bar{width:36pt;height:3.5pt;background:var(--red);margin-top:7pt;margin-bottom:14pt}

/* footer */
.page-footer{
  position:absolute;bottom:0;left:0;right:0;
  height:20pt;
  display:flex;align-items:center;
  border-top:0.75pt solid var(--muted2);
  padding:0 32pt;
}
.page-footer span{
  font-family:'JetBrains Mono',ui-monospace,monospace;
  font-size:6.5pt;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);
}
.page-footer .pf-center{flex:1;text-align:center}
.page-footer .pf-right{text-align:right}

/* ── Two-col layout helper ──────────────────────────────────────── */
.two-col{display:flex;gap:20pt;flex:1}
.col{flex:1;display:flex;flex-direction:column}
.col-wide{flex:1.4}
.col-narrow{flex:0.8}

/* ── White card ─────────────────────────────────────────────────── */
.card{background:var(--white);border-radius:6pt;padding:14pt 16pt}

/* ── Dark stat card ─────────────────────────────────────────────── */
.dark-card{background:var(--ink);border-radius:6pt;padding:12pt 16pt;color:var(--white)}
.dark-card .big-val{font-size:26pt;font-weight:800;font-variant-numeric:tabular-nums}
.dark-card .big-val.gold{color:var(--gold)}
.dark-card .big-val.red{color:var(--red)}
.dark-card .stat-label{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:6pt;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted2);margin-top:2pt}

/* ── Generic table ──────────────────────────────────────────────── */
.rs-table{width:100%;border-collapse:collapse;font-size:8.5pt}
.rs-table thead tr{border-bottom:1pt solid var(--muted2)}
.rs-table thead th{
  font-family:'JetBrains Mono',ui-monospace,monospace;font-size:6.5pt;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--muted);
  padding:4pt 6pt;text-align:right
}
.rs-table thead th:first-child{text-align:left}
.rs-table tbody tr{border-bottom:0.5pt solid var(--bar-track)}
.rs-table tbody td{padding:5pt 6pt;color:var(--ink);text-align:right;font-variant-numeric:tabular-nums}
.rs-table tbody td:first-child{text-align:left}
.rs-table tbody tr.bold td{font-weight:700}
.rs-table tbody tr.total-row td{background:var(--total-tint);font-weight:700}
.rs-table tbody tr.total-row td.red-val{color:var(--red)}
.rs-table tbody tr.section-header td{font-weight:700;padding-top:8pt}
.rs-table tbody tr.muted td{color:var(--muted)}
.rs-table tbody tr.indent td:first-child{padding-left:14pt;color:var(--muted)}

/* ── BOM card table ─────────────────────────────────────────────── */
.bom-card{background:var(--white);border-radius:6pt;padding:12pt 14pt}
.bom-card .bom-header{
  font-family:'JetBrains Mono',ui-monospace,monospace;font-size:6.5pt;letter-spacing:0.14em;
  text-transform:uppercase;color:var(--red);margin-bottom:8pt;
  display:flex;justify-content:space-between;align-items:baseline
}
.bom-card .bom-qty{color:var(--muted);font-size:7pt}
.bom-row{display:flex;justify-content:space-between;align-items:baseline;padding:3.5pt 0;border-bottom:0.5pt solid var(--bar-track);font-size:8pt}
.bom-row:last-child{border-bottom:none}
.bom-row.total{border-top:1pt solid var(--muted2);font-weight:700;margin-top:2pt;padding-top:4pt}
.bom-row.total .bom-price{color:var(--red)}

/* ── Horizontal bar chart ───────────────────────────────────────── */
.bar-chart{display:flex;flex-direction:column;gap:7pt}
.bar-row{display:flex;align-items:center;gap:8pt}
.bar-label{font-size:7.5pt;color:var(--ink);width:120pt;flex-shrink:0;line-height:1.2}
.bar-track-outer{flex:1;background:var(--bar-track);border-radius:3pt;height:16pt;position:relative;overflow:hidden}
.bar-fill{height:100%;border-radius:3pt;display:flex;align-items:center;padding-left:6pt}
.bar-fill span{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:7.5pt;font-weight:500;color:var(--white)}
.bar-fill.gold-bar{background:var(--gold)}
.bar-fill.red-bar-fill{background:var(--red)}
.bar-fill.ink-bar{background:var(--ink)}

/* ── Timeline item ──────────────────────────────────────────────── */
.timeline{display:flex;flex-direction:column;gap:0}
.tl-row{display:flex;gap:12pt;align-items:flex-start;padding:8pt 0;border-bottom:0.5pt solid var(--bar-track)}
.tl-row:last-child{border-bottom:none}
.tl-num{width:20pt;height:20pt;border-radius:50%;background:var(--red);color:var(--white);
        font-weight:700;font-size:9pt;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1pt}
.tl-date{width:58pt;flex-shrink:0;font-size:8pt;color:var(--ink);font-weight:600;padding-top:2pt}
.tl-title{font-weight:700;font-size:9pt;color:var(--ink);margin-bottom:2pt}
.tl-body{font-size:7.5pt;color:var(--muted);line-height:1.4}

</style>
</head>
<body>

<!-- ═══════════════════════════════════════════════════════════════════ PAGE 1 — COVER -->
<section class="page" style="background:#16120c;display:flex;flex-direction:column;justify-content:space-between">

  <!-- top area -->
  <div style="padding:32pt 40pt 0 40pt;flex:1;display:flex;flex-direction:column;justify-content:flex-start">

    <!-- eyebrow -->
    <div class="mono" style="font-size:7pt;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:28pt">
      P R O J E C T &nbsp; R E P O R T &nbsp; · &nbsp; L A N D E D - C O S T &nbsp; C A P I T A L
    </div>

    <!-- giant title -->
    <div style="font-size:80pt;font-weight:800;color:var(--cream);line-height:0.9;letter-spacing:-1pt">
      RaceSims<span style="color:var(--red)">.</span><br/>Chennai
    </div>

    <!-- subtitle -->
    <div style="font-size:11pt;font-weight:600;color:var(--muted2);margin-top:16pt">
      An 8-rig motorsport-grade centre — costed at actual landed prices.
    </div>

    <!-- stat row -->
    <div style="display:flex;margin-top:28pt;border-top:0.75pt solid #3a3228;border-bottom:0.75pt solid #3a3228;padding:14pt 0">

      <div style="flex:1;padding-right:16pt">
        <div style="font-size:46pt;font-weight:800;color:var(--cream);line-height:1;font-variant-numeric:tabular-nums">8</div>
        <div class="mono" style="font-size:6pt;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted2);margin-top:4pt">RIGS · 7 RACE + 1 MOTION</div>
      </div>

      <div style="width:0.75pt;background:#3a3228;margin:0 0"></div>

      <div style="flex:1;padding:0 16pt">
        <div style="font-size:46pt;font-weight:800;color:var(--red);line-height:1;font-variant-numeric:tabular-nums">₹68.5L</div>
        <div class="mono" style="font-size:6pt;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted2);margin-top:4pt">NET CAPITAL DEPLOYED</div>
      </div>

      <div style="width:0.75pt;background:#3a3228;margin:0 0"></div>

      <div style="flex:1;padding:0 16pt">
        <div style="font-size:46pt;font-weight:800;color:var(--red);line-height:1;font-variant-numeric:tabular-nums">₹3.57<span style="font-size:28pt">cr</span></div>
        <div class="mono" style="font-size:6pt;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted2);margin-top:4pt">5-YEAR EBITDA</div>
      </div>

      <div style="width:0.75pt;background:#3a3228;margin:0 0"></div>

      <div style="flex:1;padding-left:16pt">
        <div style="font-size:46pt;font-weight:800;color:var(--cream);line-height:1;font-variant-numeric:tabular-nums">~2.0<span style="font-size:28pt">yrs</span></div>
        <div class="mono" style="font-size:6pt;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted2);margin-top:4pt">PAYBACK</div>
      </div>

    </div>
  </div>

  <!-- footer bar -->
  <div style="background:var(--red);padding:10pt 40pt 8pt 40pt">
    <div style="font-weight:700;font-size:9pt;color:var(--cream)">
      Racesims Solutions Pvt Ltd · Nungambakkam, Chennai · opens July 2026
    </div>
    <div class="mono" style="font-size:6pt;letter-spacing:0.2em;color:var(--cream);opacity:0.75;margin-top:3pt">
      DRIVE · TRAIN · COMPETE
    </div>
  </div>

</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 2 — EXEC SUMMARY -->
<section class="page content-page">

  <div class="eyebrow">T H E &nbsp; O P P O R T U N I T Y , &nbsp; I N &nbsp; O N E &nbsp; P A G E</div>
  <h1 class="page-h1">Executive Summary</h1>
  <div class="red-bar"></div>

  <!-- 4-stat dark row -->
  <div style="display:flex;gap:10pt;margin-bottom:16pt">
    <div class="dark-card" style="flex:1">
      <div class="big-val gold">10.0%</div>
      <div class="stat-label">OPERATING BREAK-EVEN</div>
    </div>
    <div class="dark-card" style="flex:1">
      <div class="big-val" style="color:var(--white)">₹8.6–29.3L</div>
      <div class="stat-label">YEAR-1 EBITDA RANGE</div>
    </div>
    <div class="dark-card" style="flex:1">
      <div class="big-val" style="color:var(--white)">₹2.11 cr</div>
      <div class="stat-label">5-YEAR PROFIT AFTER TAX</div>
    </div>
    <div class="dark-card" style="flex:1">
      <div class="big-val" style="color:var(--white)">~3.1×</div>
      <div class="stat-label">CAPITAL MULTIPLE · 5-YR</div>
    </div>
  </div>

  <!-- body text -->
  <p style="font-size:9pt;color:var(--ink);line-height:1.5;margin-bottom:10pt">
    <strong>RaceSims · Chennai is an 8-rig premium sim-racing centre</strong> (7 race/rally + 1 three-DOF motion) opening July 2026 under Racesims
    Solutions Pvt Ltd. This report costs every station <strong>bottom-up from actual landed prices (incl. tax)</strong>: <strong>₹44.6L</strong> for the full fleet — sim
    hardware, gaming PCs and triple 32″ screens. The building is brand-new with power and fire systems already in place, so the fit-out
    is room-only.
  </p>
  <p style="font-size:9pt;color:var(--ink);line-height:1.5;margin-bottom:16pt">
    Operating costs are covered at just <strong>10% occupancy</strong> — <strong>barely an hour of bookings per rig a day</strong> (11.5%, ~1.2 hr/rig/day, including the
    8% cost of capital); a comparable operating dealer already runs at <strong>~20% by month 6</strong>. The five-year base case is deliberately
    conservative — sim sessions only, with café and academy excluded as pure upside, occupancy ramping 18→35%, full corporate tax,
    and the cost of capital carried throughout.
  </p>

  <!-- section chips -->
  <div style="display:flex;flex-wrap:wrap;gap:7pt">
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">1 · Concept &amp; configuration</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">2 · Floor plan</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">3 · 3D layout</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">4 · Equipment BOM</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">5 · Capital &amp; fit-out</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">6 · Operating costs</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">7 · Five-year forecast</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">8 · Year-1 &amp; payback</div>
    <div style="border:1pt solid var(--muted2);border-radius:50pt;padding:4pt 11pt;font-size:7.5pt;color:var(--ink)">9 · Timeline &amp; risks</div>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">E X E C U T I V E &nbsp; S U M M A R Y</span>
    <span class="pf-right">0 2 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 3 — CONCEPT -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 1</div>
  <h1 class="page-h1">Concept &amp; Configuration</h1>
  <div class="red-bar"></div>

  <p style="font-size:9pt;color:var(--ink);line-height:1.5;margin-bottom:16pt">
    A professional motorsport-development venue — <strong>not a gaming café</strong> — positioned through <strong>Drive · Train · Compete</strong>. Phase 1 is sim
    sessions only; the café and academy layer on as the base proves out.
  </p>

  <div class="two-col" style="flex:none">
    <!-- Configuration table -->
    <div class="card" style="flex:1">
      <div class="mono" style="font-size:6.5pt;letter-spacing:0.15em;color:var(--red);margin-bottom:10pt">C O N F I G U R A T I O N</div>
      <table class="rs-table">
        <tbody>
          <tr><td>Rigs</td><td style="font-weight:600">7 race + 1 motion (3-DOF)</td></tr>
          <tr><td>Staff at launch</td><td style="font-weight:600">2 &nbsp;(3rd from Y2)</td></tr>
          <tr><td>Floor area</td><td style="font-weight:600">1,142 sq ft · 8.73×12.15 m</td></tr>
          <tr><td>Operating hours</td><td style="font-weight:600">12 / day</td></tr>
          <tr style="border-bottom:none"><td>Capacity</td><td style="font-weight:600">2,496 rig-hrs / month</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Pricing table -->
    <div class="card" style="flex:1;background:#1a1612;border-radius:6pt;padding:14pt 16pt">
      <div class="mono" style="font-size:6.5pt;letter-spacing:0.15em;color:var(--muted2);margin-bottom:10pt">P R I C I N G &nbsp; · &nbsp; G S T - I N C L U S I V E</div>
      <table class="rs-table" style="color:var(--white)">
        <tbody>
          <tr style="border-bottom:0.5pt solid #3a3228"><td style="color:#d4cfc7">Race / rally · 30 min</td><td style="color:var(--white)">₹750</td></tr>
          <tr style="border-bottom:0.5pt solid #3a3228"><td style="color:#d4cfc7">Race / rally · 1 hr</td><td style="color:var(--white)">₹1,250</td></tr>
          <tr style="border-bottom:0.5pt solid #3a3228"><td style="color:#d4cfc7">Motion · 30 min</td><td style="color:var(--white)">₹1,000</td></tr>
          <tr style="border-bottom:0.5pt solid #3a3228"><td style="color:#d4cfc7">Motion · 1 hr</td><td style="color:var(--white)">₹1,750</td></tr>
          <tr style="border-bottom:none"><td style="color:#d4cfc7;font-weight:700">Blended net rate</td><td style="color:var(--gold);font-weight:700">₹1,218 / hr</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">C O N C E P T &nbsp; &amp; &nbsp; C O N F I G U R A T I O N</span>
    <span class="pf-right">0 3 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 4 — FLOOR PLAN -->
<!--
  COMPASS CORRECTION (baked in):
  Original had inverted compass. 180° flip applied to all cardinal labels.
  Physical geometry/positions UNCHANGED — only compass labels corrected.
  image-top = SOUTH (not North)
  Entrance: WEST (was EAST)
  Office/training: SOUTH-WEST corner (was North-East)
  Motion rig: faces SOUTH (was NORTH)
  7 static rigs: east & north walls (was west & south)
  Reception+coffee: west wall (was east)
-->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 2</div>
  <h1 class="page-h1">Floor Plan</h1>
  <div class="red-bar" style="margin-bottom:8pt"></div>

  <div class="two-col" style="flex:1;align-items:flex-start;gap:24pt">

    <!-- SVG floor plan (left col) -->
    <div style="flex:1.1;display:flex;flex-direction:column;align-items:flex-start">
      <div style="font-weight:700;font-size:9.5pt;color:var(--ink);margin-bottom:4pt">RaceSims · Chennai</div>
      <div class="mono" style="font-size:6pt;letter-spacing:0.14em;color:var(--red);margin-bottom:3pt">FLOOR PLAN v7 — Image-top = SOUTH · all rigs face the walls</div>
      <div style="font-size:7pt;color:var(--muted);margin-bottom:8pt">
        Entrance <strong>WEST</strong> · Office = SOUTH-WEST · Motion faces SOUTH · screens against walls
      </div>

      <svg viewBox="0 0 420 320" width="310" style="display:block" xmlns="http://www.w3.org/2000/svg"
           font-family="Montserrat,sans-serif" font-size="9">

        <!-- Room outline -->
        <rect x="70" y="20" width="230" height="280" fill="none" stroke="#16120c" stroke-width="2.5"/>

        <!-- ── RIGS ── -->
        <!-- R8 Motion rig — top-left (in plan: faces south, hero) -->
        <rect x="80" y="30" width="55" height="45" fill="#D81E33" rx="3"/>
        <text x="107" y="50" text-anchor="middle" fill="white" font-size="8" font-weight="700">R8</text>
        <text x="107" y="62" text-anchor="middle" fill="white" font-size="6">MOTION 3-DOF</text>
        <text x="107" y="72" text-anchor="middle" fill="white" font-size="5.5">faces SOUTH</text>

        <!-- R4 — top-left area below motion -->
        <rect x="80" y="90" width="45" height="38" fill="#a84040" rx="3"/>
        <text x="103" y="113" text-anchor="middle" fill="white" font-size="8" font-weight="700">R4</text>

        <!-- R3 -->
        <rect x="80" y="143" width="45" height="38" fill="#a84040" rx="3"/>
        <text x="103" y="166" text-anchor="middle" fill="white" font-size="8" font-weight="700">R3</text>

        <!-- R2 -->
        <rect x="80" y="196" width="45" height="38" fill="#a84040" rx="3"/>
        <text x="103" y="219" text-anchor="middle" fill="white" font-size="8" font-weight="700">R2</text>

        <!-- R1 -->
        <rect x="80" y="249" width="45" height="38" fill="#a84040" rx="3"/>
        <text x="103" y="272" text-anchor="middle" fill="white" font-size="8" font-weight="700">R1</text>

        <!-- R5 R6 R7 — bottom row (south side = top in image) -->
        <rect x="145" y="267" width="42" height="30" fill="#a84040" rx="3"/>
        <text x="166" y="286" text-anchor="middle" fill="white" font-size="8" font-weight="700">R5</text>
        <rect x="192" y="267" width="42" height="30" fill="#a84040" rx="3"/>
        <text x="213" y="286" text-anchor="middle" fill="white" font-size="8" font-weight="700">R6</text>
        <rect x="239" y="267" width="42" height="30" fill="#a84040" rx="3"/>
        <text x="260" y="286" text-anchor="middle" fill="white" font-size="8" font-weight="700">R7</text>

        <!-- Office / Training — top-right (SOUTH-WEST corner in real space; image top-right = south-west corrected) -->
        <rect x="210" y="28" width="82" height="68" fill="#8c8479" rx="3"/>
        <text x="251" y="58" text-anchor="middle" fill="white" font-size="8" font-weight="700">OFFICE /</text>
        <text x="251" y="70" text-anchor="middle" fill="white" font-size="8" font-weight="700">TRAINING</text>
        <text x="251" y="84" text-anchor="middle" fill="white" font-size="6">SOUTH-WEST</text>
        <text x="251" y="92" text-anchor="middle" fill="white" font-size="6">owner cabin</text>

        <!-- Coffee counter — right side, mid-upper -->
        <rect x="284" y="105" width="16" height="50" fill="#C8A24B" rx="2"/>
        <text x="292" y="134" text-anchor="middle" fill="white" font-size="6" font-weight="600"
              transform="rotate(-90,292,134)">COFFEE</text>

        <!-- Reception — right side -->
        <rect x="284" y="162" width="16" height="55" fill="#3a3228" rx="2"/>
        <text x="292" y="193" text-anchor="middle" fill="white" font-size="6" font-weight="600"
              transform="rotate(-90,292,193)">RECEPTION</text>

        <!-- Lounge -->
        <rect x="148" y="175" width="70" height="55" fill="none" stroke="#b6ad99" stroke-width="1.5" rx="3"/>
        <text x="183" y="200" text-anchor="middle" fill="#8c8479" font-size="8" font-weight="600">LOUNGE /</text>
        <text x="183" y="212" text-anchor="middle" fill="#8c8479" font-size="8" font-weight="600">SPECTATOR</text>

        <!-- Leaderboard label on top wall (which is south in real space) -->
        <rect x="70" y="20" width="135" height="10" fill="#16120c"/>
        <text x="137" y="29" text-anchor="middle" fill="white" font-size="6.5" font-weight="600" letter-spacing="1">LEADERBOARD</text>

        <!-- ENTRANCE arrow — right wall (west in real space) -->
        <polygon points="300,222 320,210 320,234" fill="#D81E33"/>
        <text x="325" y="217" fill="#D81E33" font-size="6.5" font-weight="700">ENTRANCE</text>
        <text x="325" y="227" fill="#D81E33" font-size="6">(WEST · lift lobby)</text>

        <!-- WC arrows — right side lower -->
        <polygon points="300,248 314,241 314,255" fill="#8c8479"/>
        <text x="317" y="252" fill="#8c8479" font-size="6">WC</text>
        <polygon points="300,268 314,261 314,275" fill="#8c8479"/>
        <text x="317" y="272" fill="#8c8479" font-size="6">WC</text>

        <!-- Dimension labels -->
        <!-- N-S (height) on left -->
        <line x1="55" y1="20" x2="55" y2="300" stroke="#8c8479" stroke-width="0.8"/>
        <polygon points="55,20 52,28 58,28" fill="#8c8479"/>
        <polygon points="55,300 52,292 58,292" fill="#8c8479"/>
        <text x="48" y="165" text-anchor="middle" fill="#8c8479" font-size="7"
              transform="rotate(-90,48,165)">12.15 m (N–S)</text>

        <!-- E-W (width) on bottom -->
        <line x1="70" y1="315" x2="300" y2="315" stroke="#8c8479" stroke-width="0.8"/>
        <polygon points="70,315 78,312 78,318" fill="#8c8479"/>
        <polygon points="300,315 292,312 292,318" fill="#8c8479"/>
        <text x="185" y="323" text-anchor="middle" fill="#8c8479" font-size="7">8.73 m (E–W)</text>

        <!-- ── COMPASS (corrected: S top, N bottom, E left, W right) ── -->
        <!-- Compass circle -->
        <circle cx="30" cy="65" r="18" fill="none" stroke="#8c8479" stroke-width="1"/>
        <!-- Arrow: red tip points DOWN toward N at bottom -->
        <polygon points="30,50 27,68 33,68" fill="#D81E33"/>
        <polygon points="30,80 27,62 33,62" fill="#8c8479"/>
        <!-- Labels: S top, N bottom, E left, W right -->
        <text x="30" y="44" text-anchor="middle" fill="#16120c" font-size="7.5" font-weight="700">S</text>
        <text x="30" y="92" text-anchor="middle" fill="#16120c" font-size="7.5" font-weight="700">N</text>
        <text x="6" y="68" text-anchor="middle" fill="#16120c" font-size="7.5" font-weight="700">E</text>
        <text x="54" y="68" text-anchor="middle" fill="#16120c" font-size="7.5" font-weight="700">W</text>

      </svg>

      <!-- legend -->
      <div style="display:flex;flex-wrap:wrap;gap:8pt;margin-top:8pt">
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;background:#D81E33;border-radius:2pt"></div><span style="font-size:7pt">Race rig</span></div>
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;background:#a84040;border-radius:2pt"></div><span style="font-size:7pt">Motion</span></div>
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;background:#8c8479;border-radius:2pt"></div><span style="font-size:7pt">Office</span></div>
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;background:#C8A24B;border-radius:2pt"></div><span style="font-size:7pt">Coffee</span></div>
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;border:1pt solid #b6ad99;border-radius:2pt"></div><span style="font-size:7pt">Lounge</span></div>
        <div style="display:flex;align-items:center;gap:4pt"><div style="width:10pt;height:10pt;background:#3a3228;border-radius:2pt"></div><span style="font-size:7pt">Entry/WC</span></div>
      </div>
    </div>

    <!-- right col: text callouts -->
    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-start;gap:10pt;padding-top:4pt">
      <div class="mono" style="font-size:6.5pt;letter-spacing:0.14em;color:var(--red)">IMAGE-TOP = SOUTH · VASTU-ORIENTED · 1,142 SQ FT</div>

      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>Entrance WEST</strong>, off the lift lobby — the right wall.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>Office / training in the South-West corner</strong> — owner cabin, doubles as the Phase-2 academy room.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>Motion rig faces SOUTH</strong>, the visual hero by the leaderboard wall.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>7 static rigs line the east &amp; north walls</strong> — triple screens against the wall, drivers facing out with the room open behind them for spectating.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>Reception + coffee counter</strong> on the west wall by the entrance; central lounge keeps sightlines open; two washrooms kept clear.
      </p>
    </div>

  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">F L O O R &nbsp; P L A N</span>
    <span class="pf-right">0 4 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 5 — 3D LAYOUT -->
<!--
  COMPASS CORRECTION baked in:
  "NORTH-UP VIEW" → "IMAGE-TOP = SOUTH"
  "Looking from the south — North is away, East to the right"
  → "Looking from the north — South is away, West to the right"
-->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 3</div>
  <h1 class="page-h1">3D Layout &amp; Design</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <div class="two-col" style="flex:1;align-items:flex-start">

    <!-- 3D model placeholder (cream card with annotation overlay) -->
    <div style="flex:1.3;display:flex;flex-direction:column">
      <!-- Mock 3D viewer card mimicking screenshot -->
      <div style="background:#1a1612;border-radius:6pt;overflow:hidden;position:relative;width:100%;aspect-ratio:1.55">

        <!-- Top bar like a web app -->
        <div style="background:#0f0d0b;padding:5pt 10pt;display:flex;align-items:center;gap:6pt;justify-content:space-between">
          <div>
            <span style="font-weight:700;font-size:7pt;color:var(--cream)">RaceSims · </span>
            <span style="font-weight:700;font-size:7pt;color:var(--red)">Chennai</span>
            <div style="font-size:5.5pt;color:var(--muted2);margin-top:1pt;font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:0.08em">3D LAYOUT — IMAGE-TOP = SOUTH · ALL RIGS FACE THEIR WALLS</div>
          </div>
          <div style="display:flex;gap:4pt">
            <div style="background:#2a2520;border-radius:3pt;padding:3pt 7pt;font-size:6pt;color:var(--muted2)">Isometric</div>
            <div style="background:#2a2520;border-radius:3pt;padding:3pt 7pt;font-size:6pt;color:var(--muted2)">Top (plan)</div>
            <div style="background:#2a2520;border-radius:3pt;padding:3pt 7pt;font-size:6pt;color:var(--muted2)">From entry (W)</div>
            <div style="background:#D81E33;border-radius:3pt;padding:3pt 7pt;font-size:6pt;color:var(--white)">Office (SW)</div>
            <div style="background:#2a2520;border-radius:3pt;padding:3pt 7pt;font-size:6pt;color:var(--muted2)">Motion rig</div>
          </div>
        </div>

        <!-- Isometric diagram -->
        <div style="padding:8pt 10pt 6pt 10pt">
          <svg viewBox="0 0 360 170" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="Montserrat,sans-serif">
            <!-- Room floor isometric -->
            <!-- Floor polygon -->
            <polygon points="180,20 340,90 260,160 100,90" fill="#e8e0d0" stroke="#d0c8b8" stroke-width="0.8"/>
            <!-- Left wall -->
            <polygon points="100,90 100,155 180,185 180,120" fill="#c8c0b0" stroke="#b0a898" stroke-width="0.8"/>
            <!-- Right wall -->
            <polygon points="260,160 340,90 340,155 260,225" fill="#d8d0c0" stroke="#c0b8a8" stroke-width="0.8"/>

            <!-- Race rigs (red boxes on left wall) -->
            <g fill="#D81E33" stroke="#b01020" stroke-width="0.5">
              <rect x="110" y="98" width="24" height="16" rx="1.5"/>
              <rect x="110" y="118" width="24" height="16" rx="1.5"/>
              <rect x="110" y="138" width="24" height="16" rx="1.5"/>
              <rect x="110" y="158" width="24" height="16" rx="1.5"/>
            </g>

            <!-- Bottom rigs (south wall) -->
            <g fill="#D81E33" stroke="#b01020" stroke-width="0.5">
              <rect x="168" y="148" width="22" height="14" rx="1.5"/>
              <rect x="195" y="148" width="22" height="14" rx="1.5"/>
              <rect x="222" y="148" width="22" height="14" rx="1.5"/>
            </g>

            <!-- Motion rig (dark red, prominent, south-facing hero) -->
            <rect x="108" y="62" width="36" height="28" fill="#a0101e" rx="2" stroke="#800818" stroke-width="0.8"/>
            <text x="126" y="78" text-anchor="middle" fill="white" font-size="6" font-weight="700">MOTION</text>

            <!-- Office (SW corner box) -->
            <rect x="246" y="30" width="50" height="38" fill="#6a6058" rx="2" stroke="#4a4038" stroke-width="0.8"/>
            <text x="271" y="53" text-anchor="middle" fill="white" font-size="6" font-weight="600">OFFICE</text>

            <!-- Lounge central -->
            <rect x="168" y="95" width="48" height="42" fill="none" stroke="#b6ad99" stroke-width="1.2" rx="2"/>
            <text x="192" y="120" text-anchor="middle" fill="#8c8479" font-size="6">LOUNGE</text>

            <!-- Reception right -->
            <rect x="290" y="85" width="14" height="38" fill="#3a3228" rx="1.5"/>
            <text x="297" y="108" text-anchor="middle" fill="white" font-size="5.5" transform="rotate(-90,297,108)">RECEP</text>

            <!-- Leaderboard on south (top) wall -->
            <rect x="135" y="22" width="80" height="8" fill="#16120c"/>
            <text x="175" y="29" text-anchor="middle" fill="white" font-size="5" letter-spacing="0.5">LEADERBOARD</text>

            <!-- Compass (corrected) small inset bottom right -->
            <circle cx="332" cy="148" r="13" fill="#1a1612" stroke="#3a3228" stroke-width="0.8"/>
            <polygon points="332,137 330,150 334,150" fill="#D81E33"/>
            <polygon points="332,159 330,146 334,146" fill="#5a5248"/>
            <text x="332" y="134" text-anchor="middle" fill="white" font-size="5" font-weight="700">S</text>
            <text x="332" y="167" text-anchor="middle" fill="white" font-size="5" font-weight="700">N</text>
            <text x="318" y="151" text-anchor="middle" fill="white" font-size="5" font-weight="700">E</text>
            <text x="346" y="151" text-anchor="middle" fill="white" font-size="5" font-weight="700">W</text>
          </svg>
        </div>

        <!-- Legend inside viewer -->
        <div style="display:flex;gap:8pt;padding:4pt 10pt 6pt 10pt">
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;background:#D81E33;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Race rig</span></div>
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;background:#a0101e;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Motion</span></div>
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;background:#C8A24B;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Coffee</span></div>
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;background:#6a6058;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Office</span></div>
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;background:#d8d0c0;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Pendant</span></div>
          <div style="display:flex;align-items:center;gap:3pt"><div style="width:8pt;height:8pt;border:0.75pt solid #b6ad99;border-radius:1.5pt"></div><span style="font-size:5.5pt;color:var(--muted2)">Window</span></div>
        </div>
      </div>
    </div>

    <!-- right col text -->
    <div style="flex:1;display:flex;flex-direction:column;gap:11pt;padding-top:4pt">
      <div class="mono" style="font-size:6.5pt;letter-spacing:0.14em;color:var(--red)">INTERACTIVE MODEL · IMAGE-TOP = SOUTH</div>

      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        Looking from the north — South is away, West to the right — matching the floor plan.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        <strong>Exposed black-painted ceiling</strong> for an industrial look (no false ceiling), track + warm pendant lighting, brushed-steel reception, gaming carpet and acoustic panels.
      </p>
      <p style="font-size:8.5pt;color:var(--ink);line-height:1.5">
        The property's large perimeter windows get solar film + blinds. The <strong>3-DOF motion rig is the hero</strong>; the central lounge keeps the room open for spectating.
      </p>
    </div>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">3 D &nbsp; L A Y O U T &nbsp; &amp; &nbsp; D E S I G N</span>
    <span class="pf-right">0 5 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 6 — BOM -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 4 &nbsp; · &nbsp; L A N D E D &nbsp; C O S T &nbsp; · &nbsp; I N C L . &nbsp; T A X</div>
  <h1 class="page-h1">Equipment — Bill of Materials</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <!-- BOM top two cols -->
  <div style="display:flex;gap:12pt;margin-bottom:10pt">

    <!-- Formula rig -->
    <div class="bom-card" style="flex:1">
      <div class="bom-header">
        <span>F O R M U L A &nbsp; / &nbsp; G T &nbsp; R I G</span>
        <span class="bom-qty">× 4</span>
      </div>
      <div class="bom-row"><span>Conspit Ares 12 Nm wheelbase</span><span>₹41,500</span></div>
      <div class="bom-row"><span>300GT steering wheel</span><span>₹32,750</span></div>
      <div class="bom-row"><span>Quick release (QR)</span><span>₹4,500</span></div>
      <div class="bom-row"><span>Apex 2 pedals (no clutch)</span><span>₹25,000</span></div>
      <div class="bom-row"><span>Seat</span><span>₹20,000</span></div>
      <div class="bom-row"><span>Rig frame</span><span>₹22,000</span></div>
      <div class="bom-row" style="border-bottom:none"><span>Triple monitor stand</span><span>₹15,000</span></div>
      <div class="bom-row total"><span>Sim hardware / rig</span><span class="bom-price">₹1,60,750</span></div>
    </div>

    <!-- Rally rig -->
    <div class="bom-card" style="flex:1">
      <div class="bom-header">
        <span>R A L L Y &nbsp; / &nbsp; G T &nbsp; R I G</span>
        <span class="bom-qty">× 4</span>
      </div>
      <div class="bom-row"><span>Conspit Ares 12 Nm wheelbase</span><span>₹41,500</span></div>
      <div class="bom-row"><span>300GT steering wheel</span><span>₹32,750</span></div>
      <div class="bom-row"><span>Quick release (QR)</span><span>₹4,500</span></div>
      <div class="bom-row"><span>VNM 3-pedal (w/ clutch)</span><span>₹35,500</span></div>
      <div class="bom-row"><span>Sequential / H shifter</span><span>₹22,000</span></div>
      <div class="bom-row"><span>Handbrake</span><span>₹21,500</span></div>
      <div class="bom-row"><span>Seat</span><span>₹20,000</span></div>
      <div class="bom-row"><span>Rig frame</span><span>₹22,000</span></div>
      <div class="bom-row" style="border-bottom:none"><span>Triple monitor stand</span><span>₹15,000</span></div>
      <div class="bom-row total"><span>Sim hardware / rig</span><span class="bom-price">₹2,14,750</span></div>
    </div>
  </div>

  <!-- "Every station then adds" bar -->
  <div style="background:var(--ink);border-radius:5pt;padding:8pt 14pt;margin-bottom:10pt;display:flex;justify-content:space-between;align-items:center">
    <div style="font-size:7.5pt;color:var(--white)">
      <strong style="color:var(--gold)">Every station then adds</strong>
      &nbsp; Gaming PC · Ryzen 7 9700X + RTX 5070 Ti <strong>₹2,51,995</strong> &nbsp;·&nbsp;
      3 × Samsung Odyssey G5 32″ <strong>₹72,000</strong>
    </div>
    <div style="font-size:7.5pt;color:var(--white);white-space:nowrap">
      Formula <strong style="color:var(--gold)">₹4,84,745</strong>&nbsp;&nbsp;Rally <strong style="color:var(--gold)">₹5,38,745</strong> / rig
    </div>
  </div>

  <!-- Fleet summary table -->
  <div style="display:flex;gap:14pt">
    <div style="flex:1">
      <table class="rs-table">
        <thead>
          <tr>
            <th style="text-align:left">BUILD</th>
            <th>QTY</th>
            <th>PER RIG</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Formula / GT rig</td><td>×4</td><td>₹4,84,745</td><td>₹19,38,980</td></tr>
          <tr><td>Rally / GT rig (static)</td><td>×3</td><td>₹5,38,745</td><td>₹16,16,235</td></tr>
          <tr><td>Rally / GT rig · 3-DOF motion</td><td>×1</td><td>₹9,08,745</td><td>₹9,08,745</td></tr>
          <tr class="total-row"><td><strong>Total fleet equipment · landed</strong></td><td></td><td></td><td class="red-val"><strong>₹44,63,960</strong></td></tr>
        </tbody>
      </table>
    </div>
    <div style="flex:0.8;font-size:7.5pt;color:var(--ink);line-height:1.5;padding-top:4pt">
      <p style="margin-bottom:6pt"><strong>Motion platform ₹3,70,000</strong> (supplier-quoted) sits on one rally rig, taking it to ₹9,08,745.</p>
      <p>4 formula + 4 rally builds; one rally rig carries the 3-DOF motion platform (7 static + 1 motion).</p>
    </div>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">E Q U I P M E N T &nbsp; — &nbsp; B I L L &nbsp; O F &nbsp; M A T E R I A L S</span>
    <span class="pf-right">0 6 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 7 — CAPITAL & FIT-OUT -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 5</div>
  <h1 class="page-h1">Capital, Fit-out &amp; Cost of Capital</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <div class="two-col" style="flex:1;align-items:flex-start;gap:20pt">

    <!-- Left: Capital table -->
    <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
      <table class="rs-table">
        <thead>
          <tr>
            <th style="text-align:left">CAPITAL · LANDED BASIS</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bold"><td>8 rigs (landed · incl. tax · from BOM)</td><td>₹44,63,960</td></tr>
          <tr><td>Security deposit (6 mo · refundable)</td><td>₹9,31,500</td></tr>
          <tr><td>Fit-out (room-only · itemised right)</td><td>₹14,20,000</td></tr>
          <tr><td>Working capital (2 months)</td><td>₹6,11,000</td></tr>
          <tr><td>Contingency (5% of equip + fit-out)</td><td>₹2,94,198</td></tr>
          <tr class="total-row"><td><strong>Gross investment</strong></td><td class="red-val"><strong>₹77,20,658</strong></td></tr>
          <tr class="muted"><td style="padding-left:14pt">less GST input credit</td><td>(₹8,74,915)</td></tr>
          <tr class="total-row"><td><strong>Net cash deployed</strong></td><td class="red-val"><strong>₹68,45,743</strong></td></tr>
          <tr class="muted"><td style="padding-left:14pt">of which deposit (refundable)</td><td>(₹9,31,500)</td></tr>
          <tr class="total-row"><td><strong>Capital truly at risk</strong></td><td class="red-val"><strong>₹59,14,243</strong></td></tr>
        </tbody>
      </table>

      <!-- Cost of capital card -->
      <div style="background:var(--ink);border-radius:5pt;padding:10pt 12pt;border-left:3pt solid var(--gold);font-size:7.5pt;color:var(--cream);line-height:1.5">
        <strong style="color:var(--gold)">Cost of capital · 8% p.a. blended</strong> (part loan / part own) = <strong>₹5.48L / yr</strong>.<br/>
        Equipment is costed from <strong>actual landed prices</strong>; the same fleet at retail runs <strong>₹70–85L</strong> — a resaleable asset that de-risks the financing.
      </div>
    </div>

    <!-- Right: Fit-out breakdown -->
    <div style="flex:0.85;display:flex;flex-direction:column">
      <div style="background:var(--white);border-radius:6pt;padding:12pt 14pt">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10pt">
          <div class="mono" style="font-size:6.5pt;letter-spacing:0.14em;color:var(--muted)">F I T - O U T &nbsp; · &nbsp; R O O M - O N L Y</div>
          <div style="font-size:11pt;font-weight:800;color:var(--red)">₹14,20,000</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4pt 10pt">
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Air conditioning — 8 T · 4×2 T 5-star<span style="float:right;font-weight:600">₹2,60,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Ceiling + wall paint<span style="float:right;font-weight:600">₹75,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Electrical + UPS (PC) + sub-DB<span style="float:right;font-weight:600">₹2,25,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Leaderboard TV — 65″ QLED<span style="float:right;font-weight:600">₹55,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Lighting — magnetic track + accent<span style="float:right;font-weight:600">₹1,90,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Networking — switch + router + WiFi 6<span style="float:right;font-weight:600">₹55,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Branding — exterior lit fascia<span style="float:right;font-weight:600">₹1,10,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Reception counter<span style="float:right;font-weight:600">₹52,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Flooring — commercial carpet tiles<span style="float:right;font-weight:600">₹1,00,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Glass partition — black-framed<span style="float:right;font-weight:600">₹50,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Furniture — ledge + premium chairs<span style="float:right;font-weight:600">₹1,00,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">CCTV — 4 cam + NVR<span style="float:right;font-weight:600">₹36,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Solar film + blinds<span style="float:right;font-weight:600">₹80,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;border-bottom:0.5pt solid var(--bar-track)">Access — biometric attendance<span style="float:right;font-weight:600">₹12,000</span></div>
          <div style="font-size:7pt;color:var(--ink);padding:3pt 0;grid-column:1/-1">Tablet billing + misc<span style="float:right;font-weight:600">₹20,000</span></div>
        </div>
        <p style="font-size:6.5pt;color:var(--muted);line-height:1.4;margin-top:8pt">
          Brand-new building — power &amp; fire already in place; in-room scope only. AC is 4×2 T high-wall splits (no false ceiling, exposed look). Acoustic panels &amp; ambient audio are deferred to Phase 2.
        </p>
      </div>
    </div>

  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">C A P I T A L &nbsp; &amp; &nbsp; F I T - O U T</span>
    <span class="pf-right">0 7 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 8 — OPERATING COSTS -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 6</div>
  <h1 class="page-h1">Operating Costs &amp; Break-even</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <div class="two-col" style="flex:1;align-items:flex-start;gap:20pt">

    <!-- Left col -->
    <div style="flex:1;display:flex;flex-direction:column;gap:12pt">

      <!-- Monthly cost table -->
      <table class="rs-table">
        <thead>
          <tr>
            <th style="text-align:left">MONTHLY COST · YEAR 1</th>
            <th>₹</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bold"><td>Rent</td><td>₹1,55,250</td></tr>
          <tr class="bold"><td>Electricity</td><td>₹45,000</td></tr>
          <tr class="bold"><td>Staff (2)</td><td>₹50,000</td></tr>
          <tr class="bold"><td>Rig upkeep + reserve</td><td>₹24,000</td></tr>
          <tr class="bold"><td>Building maintenance</td><td>₹17,250</td></tr>
          <tr class="bold"><td>Office supplies</td><td>₹10,000</td></tr>
          <tr class="bold" style="border-bottom:none"><td>Internet</td><td>₹4,000</td></tr>
          <tr class="total-row"><td><strong>Total monthly (Y1)</strong></td><td class="red-val"><strong>₹3,05,500</strong></td></tr>
        </tbody>
      </table>

      <p style="font-size:7.5pt;color:var(--muted);line-height:1.4">
        Pricing GST-inclusive; blended ₹1,218/hr net. Capacity 2,496 rig-hrs/mo.<br/>
        Cost grows ~6%/yr; 3rd staffer from Y2.
      </p>

      <!-- Break-even box -->
      <div style="background:var(--ink);border-radius:5pt;padding:10pt 12pt">
        <div style="font-size:7.5pt;font-weight:700;color:var(--gold);margin-bottom:8pt">Break-even — in rig-hours you can picture</div>
        <div style="display:flex;gap:8pt;margin-bottom:8pt">
          <div style="flex:1;text-align:center;padding:8pt;background:#2a2520;border-radius:4pt">
            <div style="font-size:22pt;font-weight:800;color:var(--white);line-height:1">~1 <span style="font-size:12pt">hr</span></div>
            <div class="mono" style="font-size:5.5pt;letter-spacing:0.12em;color:var(--muted2);margin-top:3pt">PER RIG / DAY</div>
          </div>
          <div style="flex:1;text-align:center;padding:8pt;background:#2a2520;border-radius:4pt">
            <div style="font-size:22pt;font-weight:800;color:var(--white);line-height:1">~8</div>
            <div class="mono" style="font-size:5.5pt;letter-spacing:0.12em;color:var(--muted2);margin-top:3pt">RIG-HRS / DAY · ALL 8</div>
          </div>
          <div style="flex:1;text-align:center;padding:8pt;background:#2a2520;border-radius:4pt">
            <div style="font-size:22pt;font-weight:800;color:var(--white);line-height:1">~250</div>
            <div class="mono" style="font-size:5.5pt;letter-spacing:0.12em;color:var(--muted2);margin-top:3pt">RIG-HRS / MO OF 2,496</div>
          </div>
        </div>
        <p style="font-size:7pt;color:var(--muted2);line-height:1.4">
          Each rig only needs to be booked <strong style="color:var(--white)">just over an hour a day</strong> — out of ~10 hours open — to cover <strong style="color:var(--white)">every</strong> operating cost. Including the 8% cost of capital, ~1.2 hr/rig/day. The rest of the day is margin.
        </p>
      </div>
    </div>

    <!-- Right col -->
    <div style="flex:1;display:flex;flex-direction:column;gap:12pt">

      <!-- Bar chart -->
      <div style="background:var(--white);border-radius:6pt;padding:12pt 14pt">
        <div class="mono" style="font-size:6.5pt;letter-spacing:0.14em;color:var(--muted);margin-bottom:10pt">OCCUPANCY NEEDED TO COVER COSTS</div>
        <div class="bar-chart">
          <div class="bar-row">
            <div class="bar-label">Operating break-even</div>
            <div class="bar-track-outer">
              <div class="bar-fill gold-bar" style="width:50%"><span>10.0%</span></div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Incl. 8% cost of capital</div>
            <div class="bar-track-outer">
              <div class="bar-fill gold-bar" style="width:57.5%"><span>11.5%</span></div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Year-1 plan · at open</div>
            <div class="bar-track-outer">
              <div class="bar-fill red-bar-fill" style="width:72%"><span>18%</span></div>
            </div>
          </div>
          <div class="bar-row">
            <div class="bar-label">Dealer benchmark · month 6</div>
            <div class="bar-track-outer">
              <div class="bar-fill ink-bar" style="width:80%"><span>~20%</span></div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6pt">
          <div class="mono" style="font-size:5.5pt;color:var(--muted)">0%</div>
          <div class="mono" style="font-size:5.5pt;color:var(--muted)">scale: 0–25% of 2,496 rig-hrs / mo</div>
        </div>
      </div>

      <!-- Two stat cards -->
      <div style="display:flex;gap:10pt">
        <div class="dark-card" style="flex:1">
          <div class="big-val gold">10.0%</div>
          <div class="stat-label">OPERATING BREAK-EVEN</div>
        </div>
        <div class="dark-card" style="flex:1">
          <div class="big-val" style="color:var(--white)">11.5%</div>
          <div class="stat-label">INCL. 8% COST OF CAPITAL</div>
        </div>
      </div>

      <p style="font-size:8pt;color:var(--ink);line-height:1.5">
        The plan opens at 18% and a real network dealer already clears ~20% by month six — so the centre breaks even with a <strong>wide cushion below proven demand</strong>.
      </p>
    </div>

  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">O P E R A T I N G &nbsp; C O S T S &nbsp; &amp; &nbsp; B R E A K - E V E N</span>
    <span class="pf-right">0 8 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 9 — FIVE-YEAR FORECAST -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 7 &nbsp; · &nbsp; B A S E &nbsp; C A S E &nbsp; · &nbsp; C O N S E R V A T I V E</div>
  <h1 class="page-h1">Five-Year Financial Forecast</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <!-- Forecast table -->
  <table class="rs-table" style="margin-bottom:14pt">
    <thead>
      <tr>
        <th style="text-align:left">₹ LAKH</th>
        <th>Y1 · JUL-26</th>
        <th>Y2</th>
        <th>Y3</th>
        <th>Y4</th>
        <th>Y5</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bold"><td>Occupancy</td><td>18%</td><td>25%</td><td>30%</td><td>33%</td><td>35%</td></tr>
      <tr class="bold"><td>Net revenue</td><td>65.7</td><td>95.8</td><td>120.7</td><td>139.4</td><td>155.2</td></tr>
      <tr><td style="color:var(--muted)">Operating cost</td><td style="color:var(--muted)">36.7</td><td style="color:var(--muted)">41.9</td><td style="color:var(--muted)">44.4</td><td style="color:var(--muted)">47.0</td><td style="color:var(--muted)">49.9</td></tr>
      <tr style="border-bottom:1.5pt solid var(--muted2)">
        <td style="font-weight:700;color:var(--red)">EBITDA</td>
        <td style="font-weight:700;color:var(--red)">29.0</td>
        <td style="font-weight:700;color:var(--red)">53.9</td>
        <td style="font-weight:700;color:var(--red)">76.3</td>
        <td style="font-weight:700;color:var(--red)">92.4</td>
        <td style="font-weight:700;color:var(--red)">105.3</td>
      </tr>
      <tr class="bold"><td>EBITDA margin</td><td>44%</td><td>56%</td><td>63%</td><td>66%</td><td>68%</td></tr>
      <tr><td style="color:var(--muted)">less Depreciation</td><td style="color:var(--muted)">15.2</td><td style="color:var(--muted)">11.4</td><td style="color:var(--muted)">8.5</td><td style="color:var(--muted)">6.4</td><td style="color:var(--muted)">4.8</td></tr>
      <tr><td style="color:var(--muted)">less Cost of capital</td><td style="color:var(--muted)">5.6</td><td style="color:var(--muted)">5.6</td><td style="color:var(--muted)">5.6</td><td style="color:var(--muted)">5.6</td><td style="color:var(--muted)">5.6</td></tr>
      <tr class="bold"><td>Profit before tax</td><td>8.2</td><td>36.9</td><td>62.2</td><td>80.4</td><td>94.9</td></tr>
      <tr><td style="color:var(--muted)">less Tax (25.17%)</td><td style="color:var(--muted)">2.1</td><td style="color:var(--muted)">9.3</td><td style="color:var(--muted)">15.7</td><td style="color:var(--muted)">20.2</td><td style="color:var(--muted)">23.9</td></tr>
      <tr style="border-bottom:none">
        <td style="font-weight:700">Profit after tax</td>
        <td style="font-weight:700;color:var(--red)">6.1</td>
        <td style="font-weight:700;color:var(--red)">27.6</td>
        <td style="font-weight:700;color:var(--red)">46.5</td>
        <td style="font-weight:700;color:var(--red)">60.2</td>
        <td style="font-weight:700;color:var(--red)">71.0</td>
      </tr>
    </tbody>
  </table>

  <!-- 4 stat cards -->
  <div style="display:flex;gap:10pt">
    <div class="dark-card" style="flex:1">
      <div class="big-val gold">₹3.57 cr</div>
      <div class="stat-label">CUMULATIVE EBITDA</div>
    </div>
    <div class="dark-card" style="flex:1">
      <div class="big-val" style="color:var(--white)">₹2.11 cr</div>
      <div class="stat-label">CUMULATIVE PAT</div>
    </div>
    <div class="dark-card" style="flex:1">
      <div class="big-val" style="color:var(--white)">~3.1×</div>
      <div class="stat-label">CAPITAL MULTIPLE ON ₹68.5L</div>
    </div>
    <div class="dark-card" style="flex:1;border:1.5pt solid var(--gold)">
      <div class="big-val" style="color:var(--gold)">Upside</div>
      <div class="stat-label">CAFÉ &amp; ACADEMY EXCLUDED</div>
    </div>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">F I V E - Y E A R &nbsp; F O R E C A S T</span>
    <span class="pf-right">0 9 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 10 — YEAR-1 & TIMELINE -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 8</div>
  <h1 class="page-h1">Year-1 Detail, Payback &amp; Timeline</h1>
  <div class="red-bar" style="margin-bottom:10pt"></div>

  <div class="two-col" style="flex:1;align-items:flex-start;gap:24pt">

    <!-- Left: Year-1 P&L -->
    <div style="flex:0.7;display:flex;flex-direction:column;gap:10pt">
      <table class="rs-table">
        <thead>
          <tr>
            <th style="text-align:left">YEAR-1 P&amp;L · ₹L</th>
            <th>GOOD</th>
            <th>SLOW</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bold"><td>Net revenue</td><td>66.0</td><td>45.3</td></tr>
          <tr><td style="color:var(--muted)">Operating cost</td><td style="color:var(--muted)">(36.7)</td><td style="color:var(--muted)">(36.7)</td></tr>
          <tr>
            <td style="font-weight:700;color:var(--red)">EBITDA</td>
            <td style="font-weight:700;color:var(--red)">29.3</td>
            <td style="font-weight:700;color:var(--red)">8.6</td>
          </tr>
          <tr><td style="color:var(--muted)">Depreciation</td><td style="color:var(--muted)">(15.2)</td><td style="color:var(--muted)">(15.2)</td></tr>
          <tr><td style="color:var(--muted)">Cost of capital</td><td style="color:var(--muted)">(5.6)</td><td style="color:var(--muted)">(5.6)</td></tr>
          <tr class="bold"><td>Profit before tax</td><td>8.5</td><td>(12.2)</td></tr>
          <tr><td style="color:var(--muted)">Tax @ 25.17%</td><td style="color:var(--muted)">(2.1)</td><td style="color:var(--muted)">–</td></tr>
          <tr style="border-bottom:none" class="total-row">
            <td><strong>Profit after tax</strong></td>
            <td class="red-val"><strong>6.4</strong></td>
            <td><strong>c/f</strong></td>
          </tr>
        </tbody>
      </table>

      <p style="font-size:7pt;color:var(--muted);line-height:1.5">
        Full-year depreciation (July start &gt;180 days in FY27). <strong style="color:var(--ink)">80-IAC exemption</strong>, if claimed, zeroes Y1–Y2 tax (~₹12L). Y3 carries a ~₹12L PC/GPU refresh from the maintenance reserve.
      </p>
    </div>

    <!-- Right: Timeline -->
    <div style="flex:1.1;display:flex;flex-direction:column">
      <div class="mono" style="font-size:6.5pt;letter-spacing:0.16em;color:var(--muted);margin-bottom:8pt">
        EXECUTION TIMELINE · DECISION TO OPEN IN ~16 WEEKS
      </div>
      <div class="timeline">
        <div class="tl-row">
          <div class="tl-num">0</div>
          <div class="tl-date">Mar 2026</div>
          <div>
            <div class="tl-title">Validate</div>
            <div class="tl-body">Call Uday · CA brief (SAC / 80-IAC) · venue lock · rig pro-forma · go / no-go</div>
          </div>
        </div>
        <div class="tl-row">
          <div class="tl-num">1</div>
          <div class="tl-date">Apr 2026</div>
          <div>
            <div class="tl-title">Lease &amp; legal</div>
            <div class="tl-body">Registered lease · S&amp;E + trade licence · order rigs (8-wk lead) · VMS kickoff · hire lead</div>
          </div>
        </div>
        <div class="tl-row">
          <div class="tl-num">2</div>
          <div class="tl-date">May–Jun 26</div>
          <div>
            <div class="tl-title">Fit-out &amp; build</div>
            <div class="tl-body">AC + electrical · flooring / ceiling / branding · networking · rigs cleared &amp; installed</div>
          </div>
        </div>
        <div class="tl-row">
          <div class="tl-num">3</div>
          <div class="tl-date">late Jun 26</div>
          <div>
            <div class="tl-title">Commission</div>
            <div class="tl-body">Systems test · staff training · 30-guest soft launch</div>
          </div>
        </div>
        <div class="tl-row">
          <div class="tl-num">4</div>
          <div class="tl-date">Jul 2026</div>
          <div>
            <div class="tl-title">Launch &amp; ramp</div>
            <div class="tl-body">Public open · ARKA media · Hot Lap #1 · month-4 checkpoint</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">Y E A R - 1 &nbsp; D E T A I L &nbsp; &amp; &nbsp; T I M E L I N E</span>
    <span class="pf-right">1 0 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>


<!-- ═══════════════════════════════════════════════════════════════════ PAGE 11 — RISKS & ASSUMPTIONS -->
<section class="page content-page">

  <div class="eyebrow">S E C T I O N &nbsp; 9</div>
  <h1 class="page-h1">Risks &amp; Key Assumptions</h1>
  <div class="red-bar" style="margin-bottom:14pt"></div>

  <!-- Risks table -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:18pt">
    <tbody>
      <tr style="border-bottom:1pt solid var(--bar-track);padding:10pt 0">
        <td style="padding:10pt 12pt 10pt 0;width:38%;font-size:9pt;font-weight:700;color:var(--ink);vertical-align:top">Demand below ~20% dealer benchmark</td>
        <td style="padding:10pt 0;font-size:8.5pt;color:var(--ink);line-height:1.5;vertical-align:top">Break-even 10–11.7% leaves a wide cushion; pre-sell <strong>corporate &amp; experiences</strong>.</td>
      </tr>
      <tr style="border-bottom:1pt solid var(--bar-track)">
        <td style="padding:10pt 12pt 10pt 0;font-size:9pt;font-weight:700;color:var(--ink);vertical-align:top">Premium-price resistance</td>
        <td style="padding:10pt 0;font-size:8.5pt;color:var(--ink);line-height:1.5;vertical-align:top">Protect the headline rate; deliver value via <strong>memberships, Hot Lap, off-peak</strong>.</td>
      </tr>
      <tr style="border-bottom:1pt solid var(--bar-track)">
        <td style="padding:10pt 12pt 10pt 0;font-size:9pt;font-weight:700;color:var(--ink);vertical-align:top">Equipment failure (motion rig)</td>
        <td style="padding:10pt 0;font-size:8.5pt;color:var(--ink);line-height:1.5;vertical-align:top">Maintenance reserve + in-house servicing; <strong>rigs resaleable at retail</strong>.</td>
      </tr>
      <tr>
        <td style="padding:10pt 12pt 10pt 0;font-size:9pt;font-weight:700;color:var(--ink);vertical-align:top">Slow first 4–5 months</td>
        <td style="padding:10pt 0;font-size:8.5pt;color:var(--ink);line-height:1.5;vertical-align:top">Hold a <strong>~₹17L runway buffer</strong> separate from capital.</td>
      </tr>
    </tbody>
  </table>

  <!-- Assumptions fine print -->
  <p style="font-size:7pt;color:var(--muted);line-height:1.5;margin-bottom:18pt">
    <strong style="color:var(--ink)">Assumptions.</strong> <strong style="color:var(--ink)">Landed-cost basis</strong> — equipment costed from actual component prices (incl. tax); motion platform ₹3.7L (supplier-quoted). Pricing GST-inclusive (master rate card); revenue
    net of 18% GST. Occupancy 18→35% base case. Blended rate +5%/yr; operating cost +6%/yr (3rd staffer Y2). Cost of capital 8% p.a. on ₹68.5L. Full corporate tax (25.17%); no startup exemption
    banked. Depreciation blended WDV on the ₹58.8L equipment + fit-out base. Brand-new building (power + fire in place) — fit-out is room-only; AC high-wall splits (no false ceiling). Café &amp;
    academy revenue excluded (upside). Management estimates for planning.
  </p>

  <!-- Closing statement -->
  <div style="padding:16pt 0 8pt 0;border-top:1.5pt solid var(--muted2)">
    <p style="font-size:14pt;font-weight:700;color:var(--ink);line-height:1.4">
      An asset base costed to the rupee, break-even far below proven demand, and a five-year line that <span style="color:var(--red)">compounds to ~3.1× capital.</span><br/>
      This is built to profit.
    </p>
  </div>

  <div style="flex:1"></div>
  <div class="page-footer">
    <span>RACESIMS · CHENNAI</span>
    <span class="pf-center">R I S K S &nbsp; &amp; &nbsp; A S S U M P T I O N S</span>
    <span class="pf-right">1 1 &nbsp; / &nbsp; 1 1</span>
  </div>
</section>

</body>
</html>
"""

HTML = HTML_TEMPLATE

# ── Render ────────────────────────────────────────────────────────────────────
def render(html_str: str, out_path: str):
    chrome = os.environ.get("CHROME") or find_chrome()
    print(f"Using Chrome: {chrome}")

    with tempfile.NamedTemporaryFile(suffix=".html", mode="w", encoding="utf-8", delete=False) as f:
        f.write(html_str)
        tmp_html = f.name

    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)

    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        f"--print-to-pdf={os.path.abspath(out_path)}",
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        f"file://{tmp_html}",
    ]

    print(f"Rendering to: {out_path}")
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)

    if result.returncode != 0:
        print("STDERR:", result.stderr[:2000])
        raise RuntimeError(f"Chrome exited with code {result.returncode}")

    os.unlink(tmp_html)
    print(f"PDF written: {out_path}")
    return out_path


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else OUT
    render(HTML, out)
    # Copy to repo-root mirror (only when writing to the default production path)
    if out == OUT:
        os.makedirs(os.path.dirname(os.path.abspath(OUT_ROOT_MIRROR)), exist_ok=True)
        shutil.copy2(out, OUT_ROOT_MIRROR)
        print(f"Mirror written: {OUT_ROOT_MIRROR}")
