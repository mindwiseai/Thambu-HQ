# RS-CUP-02 — Cup Holder (Thambu-pick base design + RaceSims logo)

Version that branches off a community-designed sim-rig cup holder that
Thambu selected as the preferred form. The base geometry is kept
unchanged; the RaceSims wordmark is wrapped onto the outer face of the
ring as an embossed logo.

## Files in this folder

| File | What it is |
|---|---|
| `add_logo.py` | Script that generates the RaceSims text wrapped onto the ring cylinder and concatenates it with the base STL. Re-run to regenerate. |
| `racesims-cup-holder.stl` | Final printable STL (base + logo). This is the file to slice. |
| `render-front.png` / `render-side.png` / `render-iso.png` / `render-logo.png` | Four-angle previews. `render-logo.png` is a dedicated camera angle that reveals the embossed wordmark on the ring's outer face. |
| `reference/base.stl` | The clean community base design — no logo. Kept for diffing / re-running `add_logo.py`. |
| `reference/original-with-logo.stl` | The original (community) STL with the designer's wordmark (NOT RaceSims). Reference only — do NOT print. |
| `reference/source-model-card.pdf` | Original listing / model card for the community design. |
| `reference/ref-*.png` | Renders of the base STL (no logo), for comparison. |

## What was changed vs the base

| Aspect | Base (community) | RS-CUP-02 |
|---|---|---|
| Overall geometry | ring + arm + T-slot mount | **unchanged** |
| Dimensions | 86 × 76 × 102 mm | **88 × 76 × 102 mm** (only +2 mm X — the logo proud surface) |
| Branding | none (base.stl) | **"RaceSims" embossed**, wrapped on the outer ring face, centred vertically |

Logo geometry (from `add_logo.py`):

| Parameter | Value |
|---|---|
| Text | `RaceSims` |
| Font | Arial Bold (`/System/Library/Fonts/Supplemental/Arial Bold.ttf`) |
| Em-height | 11 mm |
| Radial thickness | 3 mm total (1.5 mm into the ring wall + 1.5 mm proud) |
| Tangential span | ≈ 50 mm (wraps ~ 75° of the 38 mm outer radius) |
| Vertical position | centred at Z = 50 mm (ring mid-height) |

The text is **wrapped**, not billboarded — each vertex is re-positioned
so letters follow the cylinder surface and the back face of every letter
embeds cleanly into the ring wall. This eliminates the floating-edge
problem you get when you plaster a flat text block onto a curved
surface.

## Mounting (unchanged from base)

Slot-on mount with two through-holes. The clamp slides onto a
rig-profile T-slot and bolts in with **two M6 × ~20 mm** bolts on **50 mm
vertical centres** (inherited from the community design — verify with
your own calipers before drilling).

## Print settings (Bambu Lab X1 Carbon — reference profile)

| Setting | Value |
|---|---|
| Material | **PETG** (matte black primary; RaceSims red on the logo via AMS or paint-on post-process) |
| Layer height | 0.2 mm |
| Infill | 40 % gyroid |
| Walls | 3 (1.26 mm shell) |
| Top / bottom | 5 / 5 |
| Supports | **None** required — ring prints flat-side down with the logo facing up |
| Orientation | Mount block flat on the build plate, ring axis vertical |
| Expected filament | ~100 g PETG (ring + base + logo) |
| Expected print time | ~6–8 hr |

### Multi-colour with AMS

The logo sits 1.5 mm proud of the ring surface — easy to highlight as a
different colour in Bambu Studio:

1. Slice `racesims-cup-holder.stl`.
2. Use Bambu Studio's Paint Bucket tool on the top 1.5 mm of each letter
   face.
3. Assign RaceSims red PETG to that colour; matte black PETG to the rest.
4. Slice → single print, two-colour branded logo.

Alternative without AMS: print in matte black, then hand-paint the
letters with an enamel paint pen (Molotow 127HS or Montana ACRYLIC
marker — acid-free, UV-stable, doesn't peel off PETG).

## Regenerating / modifying the logo

```bash
cd racesims/technical/3d-printing/cad/rs-cup-02-cup-holder-sim-rig
uvx --from trimesh --with matplotlib --with shapely --with numpy \
    --with mapbox_earcut --with manifold3d --with scipy \
    python add_logo.py
```

Parameters live in the top block of `add_logo.py`:

- `TEXT` — change the wordmark (e.g. "RaceSims PRO" for a limited run)
- `TEXT_HEIGHT_MM` — font em-height (larger = bigger text, wider arc)
- `TEXT_DEPTH_MM` — total radial thickness
- `EMBED_MM` — depth the logo sinks into the ring wall (higher = more secure fuse)
- `RING_OUTER_R` / `RING_CENTRE_X` / `RING_Z_CENTRE` — ring geometry; only change if the base STL is swapped

## Credit / licensing note

**The base geometry is not our design.** It comes from a community
sim-rig cup-holder listing (see `reference/source-model-card.pdf` — the
reference model ID is the filename prefix `1358777`). The original is
typically distributed under a Creative Commons licence; confirm the
specific terms on the source listing before any commercial sale.

Acceptable uses of this derivative:

1. **Internal / gifting** — print for RaceSims test rigs, founder use,
   giveaways to partners. Safe under most CC variants.
2. **Commercial resale** — requires the source licence to permit it
   (e.g. CC-BY, not CC-BY-NC). If the source is NC-licensed, either
   negotiate a commercial licence with the original designer or move to
   our own `rs-cup-01-cup-holder` design (which is 100 % RaceSims IP).

Do NOT claim the base geometry as original RaceSims IP.

## Known issues / V2 possibilities

- **Logo wraps ~ 75° of the ring**, which is at the upper end of
  comfortable readability. If Thambu wants it more compact, drop
  `TEXT_HEIGHT_MM` to 8–9 mm.
- The low-poly ring triangulation (the striated vertical lines in the
  renders) is inherited from the base STL's coarse tesselation. Re-exporting
  from the original CAD at higher resolution would smooth this, but
  practically the print comes out fine — the slicer re-tessellates
  anyway.
- **No drain hole** in the base design. Condensation pools inside. If
  this becomes a problem in commercial use, add a 20 mm hole through the
  bottom-centre before committing to production runs.
- **M6 bolt spacing (50 mm) differs from RS-CUP-01 (60 mm).** Not a
  cross-compatibility issue (both use standard 20 mm T-slot pitch), but
  worth flagging when writing product copy.
