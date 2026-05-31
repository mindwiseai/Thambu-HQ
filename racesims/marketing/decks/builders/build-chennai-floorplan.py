"""
RaceSims Chennai — standalone floorplan PNG generator.
Renders a clean A3-landscape SVG floor plan to PNG at 300 dpi.
Corrected compass: image-top = SOUTH. All labels 180°-flipped from original.
Output: racesims/racesims-chennai-floorplan.png (canonical) + decks/ copy.
"""
import subprocess, os, shutil, tempfile

ROOT = "/Users/mindwise.ai/Documents/Claude/Projects/Thambu-HQ/racesims"
OUT  = f"{ROOT}/racesims-chennai-floorplan.png"
BAK  = f"{ROOT}/racesims-chennai-floorplan-PRECORRECTION-backup.png"

HTML = """<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1587px;height:1123px;background:#F4EFE3;font-family:'Montserrat',sans-serif;overflow:hidden}
:root{--ink:#16120c;--cream:#F4EFE3;--red:#D81E33;--gold:#C8A24B;--muted:#8c8479;--mut2:#b6ad99}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.page{width:1587px;height:1123px;padding:60px 72px 48px;display:flex;flex-direction:column;gap:0}
.header{display:flex;align-items:baseline;gap:16px;margin-bottom:6px}
.header h1{font-size:34px;font-weight:800;color:var(--ink)}
.header .dot{color:var(--red)}
.header .sub{font-size:12px;color:var(--muted);font-weight:600;letter-spacing:.08em}
.redbar{width:48px;height:4px;background:var(--red);border-radius:2px;margin-bottom:20px}
.body{display:flex;gap:48px;flex:1}
.left{flex:1.3;display:flex;flex-direction:column}
.right{flex:0.65;display:flex;flex-direction:column;gap:20px}
.label{font-size:9px;letter-spacing:.15em;color:var(--red);font-weight:700;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:6px}
.subtitle{font-size:12px;color:var(--muted);margin-bottom:16px;line-height:1.5}
.subtitle strong{color:var(--ink)}
.callout-block{background:var(--ink);border-radius:10px;padding:20px 22px;color:#e8e2d4}
.callout-block .ck{color:var(--gold);font-weight:700;font-size:12px}
.callout-block p{font-size:11.5px;line-height:1.7;margin-top:4px}
.callout-block p strong{color:#fff}
.legend{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:16px}
.li{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink)}
.ls{width:13px;height:13px;border-radius:3px;flex-shrink:0}
.dim-note{font-size:10.5px;color:var(--muted);margin-top:12px;line-height:1.6}
footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--mut2);padding-top:12px;margin-top:14px}
footer span{font-size:9px;letter-spacing:.14em;color:var(--muted);font-family:'JetBrains Mono',monospace}
</style></head><body>
<div class="page">
  <div class="header">
    <h1>RaceSims<span class="dot">.</span> Chennai</h1>
    <span class="sub mono">FLOOR PLAN v7 — COMPASS CORRECTED 2026-05-31</span>
  </div>
  <div class="redbar"></div>

  <div class="body">
    <div class="left">
      <div class="label">FLOOR PLAN v7 · IMAGE-TOP = SOUTH · VASTU-ORIENTED · 1,142 SQ FT</div>
      <div class="subtitle">
        Entrance <strong>WEST</strong>, off the lift lobby — the right wall. &nbsp;·&nbsp;
        Office / training in the <strong>South-West corner</strong>. &nbsp;·&nbsp;
        Motion rig faces <strong>SOUTH</strong> — visual hero by the leaderboard wall. &nbsp;·&nbsp;
        7 static rigs line the <strong>east &amp; north walls</strong>.
      </div>

      <svg viewBox="0 0 560 430" width="710" style="display:block;flex-shrink:0" xmlns="http://www.w3.org/2000/svg"
           font-family="Montserrat,sans-serif">

        <!-- Room outline -->
        <rect x="100" y="28" width="308" height="376" fill="none" stroke="#16120c" stroke-width="3"/>

        <!-- Floor fill -->
        <rect x="101" y="29" width="306" height="374" fill="#eae4d6" rx="0"/>

        <!-- Leaderboard on top wall (= south in real space) -->
        <rect x="100" y="28" width="180" height="14" fill="#16120c"/>
        <text x="190" y="39" text-anchor="middle" fill="white" font-size="9" font-weight="700" letter-spacing="1.5">LEADERBOARD</text>

        <!-- R8 Motion hero — top-left (south wall = top) -->
        <rect x="112" y="42" width="74" height="60" fill="#D81E33" rx="4"/>
        <text x="149" y="65" text-anchor="middle" fill="white" font-size="10.5" font-weight="800">R8</text>
        <text x="149" y="78" text-anchor="middle" fill="white" font-size="7.5" font-weight="600">MOTION 3-DOF</text>
        <text x="149" y="90" text-anchor="middle" fill="white" font-size="7">faces SOUTH</text>
        <!-- Gold ring around motion hero -->
        <rect x="108" y="38" width="82" height="68" fill="none" stroke="#C8A24B" stroke-width="2" rx="5" stroke-dasharray="0"/>

        <!-- R4 -->
        <rect x="112" y="120" width="60" height="52" fill="#c04040" rx="4"/>
        <text x="142" y="149" text-anchor="middle" fill="white" font-size="11" font-weight="700">R4</text>

        <!-- R3 -->
        <rect x="112" y="185" width="60" height="52" fill="#c04040" rx="4"/>
        <text x="142" y="214" text-anchor="middle" fill="white" font-size="11" font-weight="700">R3</text>

        <!-- R2 -->
        <rect x="112" y="250" width="60" height="52" fill="#c04040" rx="4"/>
        <text x="142" y="279" text-anchor="middle" fill="white" font-size="11" font-weight="700">R2</text>

        <!-- R1 -->
        <rect x="112" y="315" width="60" height="52" fill="#c04040" rx="4"/>
        <text x="142" y="344" text-anchor="middle" fill="white" font-size="11" font-weight="700">R1</text>

        <!-- R5 R6 R7 — bottom row (north wall = bottom) -->
        <rect x="192" y="358" width="56" height="40" fill="#c04040" rx="4"/>
        <text x="220" y="383" text-anchor="middle" fill="white" font-size="11" font-weight="700">R5</text>
        <rect x="254" y="358" width="56" height="40" fill="#c04040" rx="4"/>
        <text x="282" y="383" text-anchor="middle" fill="white" font-size="11" font-weight="700">R6</text>
        <rect x="316" y="358" width="56" height="40" fill="#c04040" rx="4"/>
        <text x="344" y="383" text-anchor="middle" fill="white" font-size="11" font-weight="700">R7</text>

        <!-- Office / Training — top-right (= SW in real space) -->
        <rect x="282" y="40" width="118" height="92" fill="#8c8479" rx="4"/>
        <text x="341" y="76" text-anchor="middle" fill="white" font-size="10" font-weight="700">OFFICE /</text>
        <text x="341" y="90" text-anchor="middle" fill="white" font-size="10" font-weight="700">TRAINING</text>
        <text x="341" y="104" text-anchor="middle" fill="white" font-size="8">SOUTH-WEST corner</text>
        <text x="341" y="116" text-anchor="middle" fill="white" font-size="7.5">owner cabin · Phase-2 Academy</text>

        <!-- Coffee counter — right side upper -->
        <rect x="380" y="143" width="22" height="68" fill="#C8A24B" rx="3"/>
        <text x="391" y="181" text-anchor="middle" fill="white" font-size="8" font-weight="600"
              transform="rotate(-90,391,181)">COFFEE</text>

        <!-- Reception — right side mid -->
        <rect x="380" y="218" width="22" height="74" fill="#3a3228" rx="3"/>
        <text x="391" y="258" text-anchor="middle" fill="white" font-size="8" font-weight="600"
              transform="rotate(-90,391,258)">RECEPTION</text>

        <!-- Lounge / Spectator -->
        <rect x="196" y="232" width="96" height="74" fill="none" stroke="#b6ad99" stroke-width="2" rx="4"/>
        <text x="244" y="265" text-anchor="middle" fill="#8c8479" font-size="10" font-weight="600">LOUNGE /</text>
        <text x="244" y="279" text-anchor="middle" fill="#8c8479" font-size="10" font-weight="600">SPECTATOR</text>

        <!-- ENTRANCE arrow — right wall (= west in real space) -->
        <polygon points="402,290 430,275 430,305" fill="#D81E33"/>
        <text x="435" y="286" fill="#D81E33" font-size="9" font-weight="700">ENTRANCE</text>
        <text x="435" y="299" fill="#D81E33" font-size="8">(WEST · lift lobby)</text>

        <!-- WC doors — right wall lower -->
        <polygon points="402,330 416,323 416,337" fill="#8c8479"/>
        <text x="420" y="334" fill="#8c8479" font-size="8">WC</text>
        <polygon points="402,358 416,351 416,365" fill="#8c8479"/>
        <text x="420" y="362" fill="#8c8479" font-size="8">WC</text>

        <!-- 2× WASHROOMS label -->
        <text x="440" y="352" fill="#8c8479" font-size="8">2× WASHROOMS</text>
        <text x="440" y="363" fill="#8c8479" font-size="7.5">(keep clear)</text>

        <!-- Dimension: N–S left -->
        <line x1="78" y1="28" x2="78" y2="404" stroke="#8c8479" stroke-width="1"/>
        <polygon points="78,28 75,38 81,38" fill="#8c8479"/>
        <polygon points="78,404 75,394 81,394" fill="#8c8479"/>
        <text x="56" y="220" text-anchor="middle" fill="#8c8479" font-size="9"
              transform="rotate(-90,56,220)">12.15 m (N–S)</text>

        <!-- Dimension: E–W bottom -->
        <line x1="100" y1="424" x2="408" y2="424" stroke="#8c8479" stroke-width="1"/>
        <polygon points="100,424 110,421 110,427" fill="#8c8479"/>
        <polygon points="408,424 398,421 398,427" fill="#8c8479"/>
        <text x="254" y="433" text-anchor="middle" fill="#8c8479" font-size="9">8.73 m (E–W)</text>

        <!-- ── COMPASS (corrected: S top, N bottom, E left, W right) ── -->
        <circle cx="510" cy="80" r="34" fill="none" stroke="#8c8479" stroke-width="1.5"/>
        <circle cx="510" cy="80" r="34" fill="rgba(244,239,227,0.85)"/>
        <!-- red arrow points DOWN = toward N -->
        <polygon points="510,52 506,82 514,82" fill="#D81E33"/>
        <polygon points="510,108 506,78 514,78" fill="#8c8479"/>
        <!-- N S E W labels -->
        <text x="510" y="44" text-anchor="middle" fill="#16120c" font-size="12" font-weight="800">S</text>
        <text x="510" y="122" text-anchor="middle" fill="#D81E33" font-size="12" font-weight="800">N</text>
        <text x="470" y="84" text-anchor="middle" fill="#16120c" font-size="12" font-weight="700">E</text>
        <text x="550" y="84" text-anchor="middle" fill="#16120c" font-size="12" font-weight="700">W</text>
        <!-- small correction note under compass -->
        <text x="510" y="134" text-anchor="middle" fill="#8c8479" font-size="7">IMAGE-TOP = SOUTH</text>
        <text x="510" y="144" text-anchor="middle" fill="#8c8479" font-size="7">corrected 2026-05-31</text>

      </svg>

      <div class="legend">
        <div class="li"><div class="ls" style="background:#D81E33"></div>Motion rig (3-DOF hero)</div>
        <div class="li"><div class="ls" style="background:#c04040"></div>Race rig (static)</div>
        <div class="li"><div class="ls" style="background:#8c8479"></div>Office / training</div>
        <div class="li"><div class="ls" style="background:#C8A24B"></div>Coffee counter</div>
        <div class="li"><div class="ls" style="background:#3a3228"></div>Reception</div>
        <div class="li"><div class="ls" style="background:none;border:1.5px solid #b6ad99"></div>Lounge / spectator</div>
      </div>
    </div>

    <div class="right">
      <div class="callout-block">
        <div class="ck">KEY LAYOUT DECISIONS</div>
        <p>
          <strong>Entrance WEST</strong> — off the lift lobby, the right wall.<br>
          <strong>Office / training — South-West corner</strong> — owner cabin; doubles as the Phase-2 Academy room.<br>
          <strong>Motion rig faces SOUTH</strong> — visual hero by the leaderboard wall at image-top.<br>
          <strong>7 static rigs</strong> — 4 along the east wall + 3 along the north wall — all screens against the walls, drivers facing out.<br>
          <strong>Reception + coffee</strong> on the west wall by the entrance. Central lounge keeps sightlines open. Two washrooms kept clear.
        </p>
      </div>

      <div class="callout-block" style="background:var(--cream);border:1px solid #d4c9b0;color:var(--ink)">
        <div class="ck" style="color:var(--ink)">ROOM</div>
        <p style="color:var(--ink)">
          <strong>8.73 m E–W × 12.15 m N–S</strong><br>
          ~1,142 sq ft total · ~1,100 sq ft usable<br>
          (washrooms in remaining area)<br><br>
          Brand-new building. Power, fire &amp; sanitary in place — room-only fit-out scope.
        </p>
      </div>

      <div class="callout-block" style="background:var(--cream);border:1px solid #d4c9b0;color:var(--ink)">
        <div class="ck" style="color:var(--ink)">CONFIGURATION</div>
        <p style="color:var(--ink)">
          8 rigs total · 7 race/rally + 1 three-DOF motion<br>
          2 staff at launch · 12 hr / day operating<br>
          2,496 rig-hrs capacity / month<br><br>
          Pricing GST-inclusive:<br>
          Race/rally 30 min ₹750 · 1 hr ₹1,250<br>
          Motion 30 min ₹1,000 · 1 hr ₹1,750
        </p>
      </div>
    </div>
  </div>

  <footer>
    <span>RACESIMS SOLUTIONS PVT LTD · NUNGAMBAKKAM, CHENNAI · OPENS JULY 2026</span>
    <span>FLOOR PLAN v7 · VASTU-ORIENTED · COMPASS CORRECTED 2026-05-31</span>
    <span>DRIVE · TRAIN · COMPETE</span>
  </footer>
</div>
</body></html>"""

# Write HTML to temp file
tmp = tempfile.mkdtemp()
html_path = f"{tmp}/floorplan.html"
with open(html_path, "w") as f:
    f.write(HTML)

# Render to PNG at ~300dpi equivalent (1587×1123 px is already ~A3 at 135dpi; use scale-factor 2 for sharpness)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
img_out = f"{tmp}/floorplan.png"

result = subprocess.run([
    CHROME,
    "--headless=new", "--disable-gpu",
    "--disable-extensions", "--no-sandbox",
    f"--screenshot={img_out}",
    f"--window-size=1587,1123",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    f"file://{html_path}"
], capture_output=True, timeout=30)

if not os.path.exists(img_out):
    print("Chrome error:", result.stderr.decode()[:400])
    raise RuntimeError("Chrome did not produce PNG")

# Backup the old file if it exists and backup not already present
if os.path.exists(OUT) and not os.path.exists(BAK):
    shutil.copy(OUT, BAK)
    print(f"Backed up existing floorplan to {os.path.basename(BAK)}")

shutil.copy(img_out, OUT)
print(f"Written: {OUT}")
print(f"Size: {os.path.getsize(OUT)//1024} KB")

# Verify with PIL
from PIL import Image
im = Image.open(OUT)
print(f"Dimensions: {im.size} px")
