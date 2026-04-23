# RS-PH-01 — Phone Holder (iPhone Pro Max, landscape)

Monolithic V1 phone cradle for the RaceSims sim-rig accessory catalogue.

## Files in this folder

| File | What it is |
|---|---|
| `phone_holder.py` | build123d source script — parametric, edit and re-run to regenerate |
| `phone-holder.step` | STEP — CAD interchange (open in Fusion 360 / SolidWorks / FreeCAD) |
| `phone-holder.stl` | STL — feed to Bambu Studio / PrusaSlicer / Cura for printing |
| `phone-holder.glb` | GLB — web 3D viewer / Three.js |
| `render-front.png` | driver's-view render (tilted down slightly to show pocket) |
| `render-side.png` | side profile — shows plate / arm / cradle stack |
| `render-iso.png` | 3/4 isometric — overall shape |

## Target device

Fits **iPhone 15 / 16 / 17 Pro Max** with a typical case (up to ~13 mm total thickness).

Internal pocket: **172 × 83 × 14 mm**. If your phone+case is >14 mm, scale the Y dim in `phone_holder.py`.

## Dimensions (as printed)

| | mm |
|---|---|
| Overall bounding (X × Y × Z) | 182 × 94 × 102 |
| Mount plate | 100 × 40 × 6 |
| Arm (plate → cradle) | 70 long × 8 wide × 20 tall |
| Cradle outer | 182 × 18 × 93 |

## Mounting

Mounts to **standard aluminium extrusion** (2020 / 2040 / 4040 / 4080) using two **M6 × 20 mm** socket-head cap screws into T-slot nuts. Bolt centres are **60 mm apart** (20 mm from each edge of the 100 mm plate) — matches the 20 mm T-slot pitch of the RaceSims Pro Cockpit and every mainstream sim-rig profile.

Counterbores on the front face recess the bolt heads flush.

## Print settings (Bambu Lab X1 Carbon — reference profile)

| Setting | Value |
|---|---|
| Material | **PETG** (matte black primary, RaceSims red for logo/accent if using AMS) |
| Layer height | 0.2 mm |
| Infill | 40 % gyroid |
| Walls | 3 (1.26 mm shell) |
| Top / bottom layers | 5 / 5 |
| Supports | **None required** — model is self-supporting with the mount plate flat on the build plate |
| Orientation | Mount plate flat on build plate, arm + cradle extending upward |
| Build plate | Textured PEI or smooth PEI (textured preferred for the matte finish on the plate face) |
| Expected filament | **~85 g** |
| Expected print time | **~5–7 hr** on X1C at default quality |

### Multi-colour (AMS)

The RaceSims emboss pocket on the mount plate front is a 30 × 10 × 2 mm recess. For the 4-colour print:
1. Lay out the emboss area as a filament-change zone in Bambu Studio (Paint Bucket tool).
2. Primary colour: matte black PETG.
3. Emboss area: RaceSims red PETG.
4. Optional: grey or silver accent along the chamfered edges (decorative only).

## Assembly

1. Slot two M6 T-nuts into the extrusion slot at the intended height (bolt centres 60 mm apart).
2. Place the phone holder's mount plate against the extrusion, bolt holes aligned.
3. Drop M6 × 20 mm socket-heads through the counterbored holes, engage T-nuts, hand-snug.
4. Final tighten with a 5 mm hex key — firm, not crushed (PETG).
5. Insert the phone landscape, long edge into the pocket, screen facing outward.
6. The charging cable passes through the bottom-lip cutout.

## Known issues / V2 improvements

- **No tilt adjustment.** Cradle is fixed perpendicular to the arm. V2 will add a clevis joint at the arm-cradle junction (two 4 mm arm tabs, one 8 mm cradle tab, M6 through-bolt pivot) so the user can angle the phone down for screen visibility.
- **No landscape ↔ portrait rotation.** V2 may add a ball-joint mount between arm and plate if demand warrants it.
- **MagSafe not supported.** Phone sits in mechanical cradle, not magnetic. Could add a 54 mm diameter × 3 mm recess in the back wall to accept a MagSafe puck if customers ask.
- **Thicker cases.** Cases >13 mm (Otterbox Defender, Lifeproof) won't fit. V2 may ship with swappable depth inserts.

## QA protocol before selling

Per [[in-house-3d-printing]] quality procedure:
1. **Vibration test** — 100 hr mounted on a rig, FFB at 80 % max, phone in cradle.
2. **Heat soak** — 48 hr at 45 °C (Chennai summer worst case). Measure any deformation.
3. **Drop test** — 250 g dummy phone from 700 mm (seat height). Cradle must not crack; dummy must not escape pocket.
4. **Fit test** — verified with real iPhone 16 Pro Max + common cases (Apple silicone, Spigen Ultra Hybrid, Otterbox Commuter).

## Regenerating

```bash
uvx --from build123d python phone_holder.py
```

Edit the parameter block at the top of the script (POCKET_W / POCKET_H / POCKET_D etc.) to accommodate other phones.

## Product listing notes (race-engineer voice)

Copy angle for racesims.in: *"Measured for the iPhone Pro Max, printed for the Indian summer. Landscape orientation because telemetry apps are landscape. Cable passes through the base because one-hand cable routing in a live session matters. The pocket has a 14 mm tolerance because your case has a 14 mm spec — we didn't guess."*

Not: *"Premium 3D printed phone mount for sim racing enthusiasts."*
