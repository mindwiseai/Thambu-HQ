# RS-CUP-03 — Cup Holder V3 (front-badge design, RaceSims original)

Clean-sheet RaceSims design. **Form factor inspired by** a community
sim-rig cup holder (compact slot-on mount + ring cradle) but
**engineered from scratch** — every dimension, every feature is ours,
and the geometry is a single parametric build123d script.

The defining move: a **flat front badge plate** where the RaceSims
wordmark lives. No curve-wrapping, no cylinder projection — the logo is
a crisp, proud emboss on a rectangle that faces the driver.

## Files

| File | What it is |
|---|---|
| `cup_holder_v3.py` | Parametric build123d source. Edit the PARAMETERS block, re-run, get a new STL. |
| `cup-holder-v3.step` / `.stl` / `.glb` | Exported geometry. Slice the STL. |
| `render-front.png` | Driver's-view render showing the badge + logo face-on. |
| `render-side.png` | Side profile — plate / neck / ring / badge stack. |
| `render-iso.png` | 3/4 overview. |
| `render-logo.png` | Dedicated angle highlighting the logo on the badge. |

## Final dimensions

| | mm |
|---|---|
| Overall bounding (X × Y × Z) | 100 × 134 × 100 |
| Ring OD / ID / height | 100 / 82 / 80 |
| Base floor thickness | 10 |
| Bottle centring recess | 65 mm dia × 5 mm deep |
| Drain hole | 20 mm dia |
| Mount plate | 100 H × 40 W × 6 T (2× M6 on 60 mm centres) |
| Neck (mount → ring) | 20 long × 24 wide × 30 tall |
| Badge plate | 64 W × 30 H × 8 T, 3 mm chamfer on top/bottom long edges |
| RaceSims wordmark | 12 mm em-height, Arial Bold, 1.5 mm proud of badge |

## Feature list

1. **Shared RaceSims mount geometry** — 2× M6 on 60 mm vertical centres, counterbored M6 socket-head cap recesses on the front face. Fits 2020 / 2040 / 4040 / 4080 aluminium extrusion. Same pattern as [RS-PH-01](../rs-ph-01-phone-holder/) and [RS-CUP-01](../rs-cup-01-cup-holder/).
2. **Short integrated neck** — 20 mm rigid connection between mount and ring, no long arm. Cup sits closer to the rig than RS-CUP-01 (~125 mm from rig vs 180 mm).
3. **Closed ring cradle** with a 10 mm base floor, 65 mm centring recess (so standard 500 ml bottles seat and stop rattling), and a 20 mm drain hole so condensation gets out.
4. **Flat front badge plate** with 3 mm chamfered top and bottom edges. Subtle motorsport silhouette, not a plain rectangle. 2 mm of the badge embeds into the ring for a solid fuse; 6 mm stands proud of the ring's outer surface.
5. **Proud-embossed RaceSims wordmark** — 1.5 mm raised, Arial Bold, sized to sit comfortably in the 64 × 30 badge face with ~10 mm side margins.

## Why this improves on both the community reference and RS-CUP-01

Compared to the **community reference** (rs-cup-02-cup-holder-sim-rig):
- Adds a drain hole (community base had none).
- Adds a bottle centring recess.
- Gives the logo a purpose-built flat surface instead of a curved cylinder — far better legibility and no risk of letters "floating" off the curve.
- 100% RaceSims IP — no licensing footnote required.
- Parametric source — edit one number to regenerate the STL.

Compared to **RS-CUP-01** (our first design):
- Compact form factor (134 mm Y vs 176 mm Y).
- Ring closer to rig, less leverage/wobble when the bottle is heavy.
- Logo is on a clean flat panel at eye-height, not a small pocket on the mount plate.

## Print settings (Bambu Lab X1 Carbon reference profile)

| Setting | Value |
|---|---|
| Material | **PETG**, matte black primary + RaceSims red on the wordmark |
| Layer height | 0.2 mm |
| Infill | 40 % gyroid |
| Walls | 3 (1.26 mm shell) |
| Supports | **None** — prints plate-flat with ring axis vertical, badge sticking up. Self-supporting. |
| Expected filament | ~200 g PETG |
| Expected print time | ~11–14 hr on X1C at default quality |

### Multi-colour with AMS (RaceSims red logo)

1. Slice `cup-holder-v3.stl`.
2. In Bambu Studio, open the sliced preview and use **Paint Bucket** on the raised wordmark top face (1.5 mm of the letters).
3. Assign RaceSims red PETG to the painted region, matte black PETG to the rest.
4. Done — single print, two-colour branded badge.

Alternative without AMS: print all-black, hand-paint the letters with a Molotow 127HS enamel pen.

## Assembly + fit

1. Two M6 T-nuts into the extrusion slot at 60 mm vertical centres.
2. Mount plate against the extrusion, M6 × 20 mm socket-head caps through the counterbored holes, hand-snug, final tighten with 5 mm hex.
3. Drop a 500 ml bottle / 330–500 ml can into the ring. It sits in the 65 mm centring recess. Cable drains through the 20 mm hole in the base. Wordmark reads forward to the driver.

## Regenerating

```bash
cd racesims/technical/3d-printing/cad/rs-cup-03-cup-holder-badge
uvx --from build123d python cup_holder_v3.py
```

Parameters at the top of `cup_holder_v3.py`:
- `TEXT` — change the wordmark (e.g., "RaceSims PRO" for limited runs)
- `BADGE_W` / `BADGE_H` — badge plate dimensions
- `TEXT_SIZE` / `TEXT_DEPTH` — logo size and proud height
- `RING_ID` — inside diameter; bump to 85–90 mm for travel mugs
- `BADGE_EDGE_CHAMFER` — 3 mm default; set to 0 for a plain rectangle

## QA protocol before selling

Per [[in-house-3d-printing]]:
1. **Vibration test** — 100 hr at FFB 80 %, bottle inside, full of water.
2. **Heat soak** — 48 hr at 45 °C. PETG good to 70 °C; confirm no warping.
3. **Drain test** — 250 ml of water into the ring; should fully drain within 60 sec.
4. **Fit test** — 500 ml Gatorade, 330 ml / 500 ml cans, 16 oz Klean Kanteen, 75 mm vacuum flask.
5. **Wordmark legibility** — read the RaceSims wordmark from the driver seat at typical rig distance (arm's reach). Should be clearly readable without leaning forward.

## Known issues / V2 ideas

- **Ring has no C-cut** (bottle drops in from the top, can't slide in from the side). The community reference has a C-cut opening that lets you slide the bottle in horizontally — handy when the rig is below the driver's line of sight. Adding a C-cut is a trivial V2 change: subtract a sector from the ring at the 12 o'clock position (opposite the mount plate).
- **Badge is flat rectangular** — could be replaced with a V-shaped or hexagonal badge for more visual dynamism. Change the `Box()` call to a sketch + extrude.
- **Bolt head is recessed on the mount plate** — same as our other parts. Bolts are visible from the front when installed (on the +Y side of the plate). Not an issue for function, but if you want fully hidden bolts we'd need to move the plate to rear-fix and use studs.

## Product listing notes (race-engineer voice)

Copy angle for racesims.in:
> *"Flat front badge. Because a logo that's crisp at 60 cm matters to a driver who's 60 cm from the rig. Drain hole in the base — condensation is real in a 45 °C Chennai session, we designed around it not against it. Same M6 mount pattern as every RaceSims accessory; you tighten with one hex key, once, and it's done."*

Not: *"Premium 3D printed cup holder for sim racing enthusiasts."*
