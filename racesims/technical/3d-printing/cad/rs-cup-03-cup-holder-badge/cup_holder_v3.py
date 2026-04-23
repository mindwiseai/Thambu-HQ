#!/usr/bin/env python3
"""
RS-CUP-03 — Cup Holder V3 with front badge plate.

Clean-sheet RaceSims-original design. Form-factor inspired by a popular
community sim-rig cup holder (T-slot mount + ring cradle, compact
footprint) but engineered with:
  - A dedicated flat front badge plate where the RaceSims wordmark sits
    — so the logo reads cleanly from the driver's seat without
    curve-wrapping gymnastics.
  - Drain hole + bottle centring recess (both absent in the community
    reference).
  - Chamfered badge edges for a motorsport-ish silhouette.
  - Standard RaceSims mount geometry (2× M6 on 60 mm centres) — shares
    the T-slot bolt pattern with RS-PH-01, RS-CUP-01, etc.

Coordinate system:
  X — horizontal, tangent to mount plate
  Y — depth (from rig toward the driver)
  Z — vertical (ring axis)

Output files go in the same folder as this script.
"""

from build123d import (
    Align,
    Axis,
    Box,
    Compound,
    Cylinder,
    FontStyle,
    Plane,
    Pos,
    Rot,
    BuildSketch,
    Text,
    extrude,
    chamfer,
    export_gltf,
    export_step,
    export_stl,
)

# =============================================================================
# PARAMETERS
# =============================================================================

# Mount plate (shared RaceSims geometry)
PLATE_W = 40                  # X
PLATE_T = 6                   # Y (thickness)
PLATE_H = 100                 # Z
BOLT_DIA = 6.5
BOLT_HOLE_FROM_EDGE = 20      # 20 mm in from top and bottom edge
CBORE_DIA = 11
CBORE_DEPTH = 2

# Short neck between mount and ring
NECK_W = 24                   # X
NECK_L = 20                   # Y (depth out)
NECK_H = 30                   # Z

# Ring cradle
RING_OD = 100                 # outer diameter
RING_ID = 82                  # inner diameter (fits standard 500 ml bottles
                              # with room for a 65 mm bottom)
RING_H = 80                   # height
BASE_T = 10                   # closed-base thickness at bottom
DRAIN_DIA = 20                # drain-hole diameter through base
RECESS_DIA = 65               # bottle centring-recess inside-diameter
RECESS_DEPTH = 5              # recess depth (into the base)

# Front badge plate (logo canvas)
BADGE_W = 64                  # X
BADGE_H = 30                  # Z
BADGE_T = 8                   # Y (thickness)
BADGE_EDGE_CHAMFER = 3        # chamfer on top/bottom long edges

# Logo text
TEXT = "RaceSims"
TEXT_SIZE = 12                # font em-height
TEXT_DEPTH = 1.5              # how far the wordmark stands proud
TEXT_FONT = "Arial"
TEXT_FONT_STYLE = FontStyle.BOLD

# Derived Y coordinates
PLATE_FRONT_Y = PLATE_T / 2                               # +3
NECK_BACK_Y = PLATE_FRONT_Y                               # +3
NECK_FRONT_Y = NECK_BACK_Y + NECK_L                       # +23
RING_BACK_Y = NECK_FRONT_Y                                # +23
RING_CENTRE_Y = RING_BACK_Y + RING_OD / 2                 # +73
RING_FRONT_Y = RING_CENTRE_Y + RING_OD / 2                # +123
BADGE_BACK_Y = RING_FRONT_Y - 2                           # 2 mm embed into ring
BADGE_CENTRE_Y = BADGE_BACK_Y + BADGE_T / 2
BADGE_FRONT_Y = BADGE_BACK_Y + BADGE_T                    # 129

# =============================================================================
# BUILD
# =============================================================================

# ---- Mount plate ----
plate = Box(PLATE_W, PLATE_T, PLATE_H,
            align=(Align.CENTER, Align.CENTER, Align.CENTER))

for z in (PLATE_H / 2 - BOLT_HOLE_FROM_EDGE,
          -PLATE_H / 2 + BOLT_HOLE_FROM_EDGE):
    # Through-hole along Y
    hole = Rot(90, 0, 0) * Cylinder(BOLT_DIA / 2, PLATE_T + 2)
    plate = plate - Pos(0, 0, z) * hole
    # Counterbore on FRONT face (+Y side) for the bolt head
    cbore = Rot(90, 0, 0) * Cylinder(CBORE_DIA / 2, CBORE_DEPTH + 0.1)
    plate = plate - Pos(0, PLATE_T / 2 - CBORE_DEPTH / 2, z) * cbore

# ---- Neck (short box between mount and ring) ----
# Overlap 0.1 mm into the plate and into the ring so the union fuses cleanly
neck = Box(NECK_W, NECK_L + 0.2, NECK_H,
           align=(Align.CENTER, Align.MIN, Align.CENTER))
neck = Pos(0, PLATE_FRONT_Y - 0.1, 0) * neck

# ---- Ring cradle (outer cylinder minus inner pocket) ----
ring_outer = Cylinder(RING_OD / 2, RING_H,
                      align=(Align.CENTER, Align.CENTER, Align.CENTER))
ring_outer = Pos(0, RING_CENTRE_Y, 0) * ring_outer

# Inner pocket — starts BASE_T above the ring bottom so we leave a floor
inner_pocket_h = RING_H - BASE_T + 0.1
ring_inner = Cylinder(RING_ID / 2, inner_pocket_h,
                      align=(Align.CENTER, Align.CENTER, Align.MIN))
ring_inner = Pos(0, RING_CENTRE_Y, -RING_H / 2 + BASE_T) * ring_inner
ring = ring_outer - ring_inner

# Centring recess on TOP of the base (bottle sits in this step)
recess = Cylinder(RECESS_DIA / 2, RECESS_DEPTH + 0.1,
                  align=(Align.CENTER, Align.CENTER, Align.MIN))
recess = Pos(0, RING_CENTRE_Y, -RING_H / 2 + BASE_T - RECESS_DEPTH) * recess
ring = ring - recess

# Drain hole through base, co-axial with ring
drain = Cylinder(DRAIN_DIA / 2, BASE_T + 1,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))
drain = Pos(0, RING_CENTRE_Y, -RING_H / 2 - 0.5) * drain
ring = ring - drain

# ---- Front badge plate ----
badge = Box(BADGE_W, BADGE_T, BADGE_H,
            align=(Align.CENTER, Align.CENTER, Align.CENTER))
badge = Pos(0, BADGE_CENTRE_Y, 0) * badge

# Chamfer the top and bottom long edges (edges running along X)
# to give the badge a motorsport silhouette instead of a flat rectangle.
top_bottom_edges = badge.edges().filter_by(Axis.X)
badge = chamfer(top_bottom_edges, BADGE_EDGE_CHAMFER)

# ---- Logo text on the badge front face ----
# Build the text as a sketch in a vertical plane whose normal is +Y,
# centred on the badge front face. Extrude toward +Y by TEXT_DEPTH.
text_plane = Plane(
    origin=(0, BADGE_FRONT_Y, 0),
    x_dir=(1, 0, 0),   # sketch X = world +X
    z_dir=(0, 1, 0),   # sketch normal = world +Y
)
with BuildSketch(text_plane) as text_sketch:
    Text(TEXT, font_size=TEXT_SIZE, font=TEXT_FONT, font_style=TEXT_FONT_STYLE)
logo = extrude(text_sketch.sketch, amount=TEXT_DEPTH)

# =============================================================================
# UNION & EXPORT
# =============================================================================

fused = plate + neck + ring + badge + logo
if hasattr(fused, 'bounding_box'):
    model = fused
else:
    parts = list(fused) if hasattr(fused, '__iter__') else [fused]
    model = Compound(children=parts)

bbox = model.bounding_box()
print(f"Bounding box:   "
      f"{bbox.max.X - bbox.min.X:.1f} x "
      f"{bbox.max.Y - bbox.min.Y:.1f} x "
      f"{bbox.max.Z - bbox.min.Z:.1f} mm")
try:
    vol = model.volume
    print(f"Volume:         {vol / 1000:.1f} cm^3")
    eff_fill = 0.55
    mass_g = vol / 1000 * 1.27 * eff_fill
    print(f"Est. filament:  {mass_g:.0f} g PETG (approx, 40% infill + walls)")
except Exception as e:
    print(f"Volume calc skipped: {e}")

export_step(model, "cup-holder-v3.step")
export_stl(model, "cup-holder-v3.stl")
export_gltf(model, "cup-holder-v3.glb", binary=True)
print("Exported STEP, STL, GLB.")
