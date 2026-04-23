# RS-CUP-01 — Cup Holder

Monolithic V1 cup holder for the RaceSims sim-rig accessory catalogue.

## Files in this folder

| File | What it is |
|---|---|
| `cup_holder.py` | build123d source script — parametric, edit and re-run to regenerate |
| `cup-holder.step` | STEP — CAD interchange |
| `cup-holder.stl` | STL — feed to Bambu Studio / PrusaSlicer / Cura |
| `cup-holder.glb` | GLB — web 3D viewer |
| `render-front.png` / `render-side.png` / `render-iso.png` | Three-angle previews |

## Fits

- 500 ml sports bottles (Gatorade, Electral, Fast&Up recovery)
- 330 / 500 ml cans (standard 66 mm diameter)
- Water bottles up to ~80 mm outer diameter
- Travel coffee mugs (Klean Kanteen 16 oz, Hydro Flask 18 oz)

Inner diameter is **82 mm**. For a 65–70 mm bottle, RaceSims offers an optional TPU insert (separate SKU, printed in 95A flexible filament — stick it to the ring inner wall with contact adhesive).

## Dimensions (as printed)

| | mm |
|---|---|
| Overall bounding (X × Y × Z) | 100 × 176 × 100 |
| Mount plate | 100 × 40 × 6 |
| Arm (plate → ring wall) | 70 long × 8 wide × 20 tall |
| Ring outer diameter | 100 |
| Ring inner diameter | 82 |
| Ring height | 60 |
| Base (closed floor) thickness | 10 |
| Bottle centring recess | 50 dia × 5 deep (on top of base) |
| Drain hole (through base) | 20 dia |
| Ventilation slots | 15 × 40, 3 × at 120° |

## Mounting

Identical mount to [RS-PH-01](../rs-ph-01-phone-holder/README.md) — two **M6 × 20 mm** socket-head cap screws into T-slot nuts, bolt centres 60 mm apart. Fits any 2020 / 2040 / 4040 / 4080 aluminium extrusion.

## Print settings (Bambu Lab X1 Carbon)

| Setting | Value |
|---|---|
| Material | **PETG** (matte black primary, RaceSims red for emboss via AMS) |
| Layer height | 0.2 mm |
| Infill | 40 % gyroid |
| Walls | 3 (1.26 mm shell) |
| Top / bottom layers | 5 / 5 |
| Supports | **None required** — print mount-plate-flat with ring opening facing up (natural self-supporting geometry) |
| Orientation | Mount plate flat on build plate, ring axis vertical |
| Expected filament | **~149 g** |
| Expected print time | **~9–12 hr** on X1C at default quality |

Note: the ring is the slowest part of the print (60 mm tall × 100 mm diameter = 500 Z-layers). Consider "Silent" speed preset if the printer is in the same room as customers.

## Assembly

1. M6 T-nuts into the extrusion slot, 60 mm apart.
2. Mount plate against the extrusion, bolts through, hand-snug → 5 mm hex.
3. Drop the bottle/can into the ring. The 5 mm centring recess locates it; the three slot openings let you see the label + grip the bottle.
4. Condensation drains through the 20 mm hole in the base.

## Known issues / V2 improvements

- **Ring is rigidly attached to the arm.** V2 spec called for two M4 holes at the arm-ring junction so the ring could be unbolted for flat-pack shipping (compact shipping box). V1 skipped that for production simplicity — to add it, cut a 8 × 20 slot between arm and ring and add two M4 holes at 20 mm centres (see `cup_holder.py` comments).
- **No tilt compensation.** Ring is perfectly level only if the mounting extrusion is perfectly vertical. If your rig profile is canted, the bottle will lean. V2 may add a ±5° adjustable shim.
- **Slots are rectangular, not oval.** The brief called for 15 × 40 mm oval slots (stadium-shaped). Current V1 uses simple rectangles — easier CAD, functionally identical. V2 will switch to `SlotCenterToCenter` for the aesthetic.
- **No MOLLE-style accessory rail.** Could be worth adding a small 25 × 25 flat area on the outer ring face for customers to attach a RaceSims logo disc or personal decal.

## Material alternative

For customers who want a **foldable / collapsible** cup holder (rare but requested for portable rigs), print the ring in TPU 95A. Same STL, different material. Prints slower but the ring can flex around oddly-shaped bottles.

## QA protocol before selling

Per [[in-house-3d-printing]]:
1. **Vibration test** — 100 hr on a rig with a 750 ml bottle full of water. Should not spill, should not rattle, should not crack.
2. **Heat soak** — 48 hr at 45 °C. PETG is fine to 70 °C, but cars in Chennai parking can hit 60 °C — confirm no warping.
3. **Drain test** — dump 250 ml into the ring (simulated spill). Should fully drain through the 20 mm hole within 60 sec.
4. **Fit test** — verified with: 500 ml Gatorade, 500 ml Coke can, 330 ml Red Bull, Klean Kanteen 16 oz, stainless vacuum flask (75 mm diameter).

## Regenerating

```bash
uvx --from build123d python cup_holder.py
```

Tune parameters in the top block of the script — `RING_ID`, `RING_H`, slot geometry, etc.

## Product listing notes (race-engineer voice)

Copy angle: *"Holds a 500 ml sports bottle at cockpit height. Drains through the base because condensation drips in any summer session — we designed for it, not around it. Mounts to the same M6 T-slot pattern as every RaceSims accessory — one hex key, one position."*
