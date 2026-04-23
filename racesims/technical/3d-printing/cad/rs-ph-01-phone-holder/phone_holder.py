#!/usr/bin/env python3
"""
RaceSims Phone Holder RS-PH-01 — iPhone Pro Max (with case), landscape.

Monolithic V1: rigid cradle fixed at arm end (no tilt pivot — added in V2).
Mounts to 2040/4040 aluminium extrusion via two M6 T-slot bolts on 60 mm centres
(20 mm from each edge of a 100 mm plate — compatible with standard T-slot pitch).

Coordinate system:
  X — phone long axis (landscape)
  Y — arm extension direction (away from rig, toward driver)
  Z — vertical
Origin at centre of mount plate's mating face (back of plate sits on extrusion).
"""

from build123d import (
    Align,
    Box,
    Compound,
    Cylinder,
    Part,
    Pos,
    Rot,
    export_gltf,
    export_step,
    export_stl,
)

# === Mount plate ===
PLATE_W = 40   # X
PLATE_T = 6    # Y
PLATE_H = 100  # Z
BOLT_DIA = 6.5
BOLT_HOLE_FROM_EDGE = 20
CBORE_DIA = 11
CBORE_DEPTH = 2
EMBOSS_W = 30
EMBOSS_H = 10
EMBOSS_DEPTH = 2

# === Arm ===
ARM_W = 8     # X (horizontal thickness)
ARM_L = 70    # Y (extension)
ARM_H = 20    # Z (vertical height)

# === Cradle (iPhone Pro Max with case) ===
POCKET_W = 172   # X — phone long axis
POCKET_H = 83    # Z — phone short axis
POCKET_D = 14    # Y — phone thickness (with case)
BACK_WALL = 4
WALL_MARGIN = 5      # side margin each side
BOTTOM_LIP = 10      # Z — lip below pocket that retains the phone
BACK_CUTOUT_W = 60   # weight-reduction cutout in back wall
BACK_CUTOUT_H = 30
CABLE_CUTOUT_W = 40  # X
TOP_CUTAWAY = 25     # top-left corner cut-away for speaker/mic

CRADLE_X = POCKET_W + 2 * WALL_MARGIN   # 182
CRADLE_Y = BACK_WALL + POCKET_D         # 18
CRADLE_Z = POCKET_H + BOTTOM_LIP        # 93

# Y reference planes
PLATE_FRONT_Y = PLATE_T / 2            # +3
CRADLE_BACK_Y = PLATE_FRONT_Y + ARM_L  # +73
POCKET_FRONT_Y = CRADLE_BACK_Y + BACK_WALL  # +77

# Z reference for cradle (cradle is offset down because of lip)
CRADLE_Z_CENTER = -BOTTOM_LIP / 2      # -5

# ---------------------------------------------------------------------------
# Build the mount plate
# ---------------------------------------------------------------------------
plate = Box(PLATE_W, PLATE_T, PLATE_H,
            align=(Align.CENTER, Align.CENTER, Align.CENTER))

# M6 through-holes (axis along Y)
for z in (PLATE_H / 2 - BOLT_HOLE_FROM_EDGE,
          -PLATE_H / 2 + BOLT_HOLE_FROM_EDGE):
    hole = Rot(90, 0, 0) * Cylinder(BOLT_DIA / 2, PLATE_T + 2)
    hole = Pos(0, 0, z) * hole
    plate = plate - hole

    # Counterbore on FRONT face (+Y side), 2 mm deep
    cbore = Rot(90, 0, 0) * Cylinder(CBORE_DIA / 2, CBORE_DEPTH + 0.1)
    cbore = Pos(0, PLATE_T / 2 - CBORE_DEPTH / 2, z) * cbore
    plate = plate - cbore

# RaceSims emboss pocket (shallow rectangle on front face)
emboss = Box(EMBOSS_W, EMBOSS_DEPTH + 0.1, EMBOSS_H,
             align=(Align.CENTER, Align.CENTER, Align.CENTER))
emboss = Pos(0, PLATE_T / 2 - EMBOSS_DEPTH / 2, 0) * emboss
plate = plate - emboss

# ---------------------------------------------------------------------------
# Build the arm — overlap 0.1 mm into plate and cradle so the boolean
# union fuses rather than returning three disjoint parts.
# ---------------------------------------------------------------------------
arm = Box(ARM_W, ARM_L + 0.2, ARM_H,
          align=(Align.CENTER, Align.MIN, Align.CENTER))
arm = Pos(0, PLATE_FRONT_Y - 0.1, 0) * arm

# ---------------------------------------------------------------------------
# Build the cradle
# ---------------------------------------------------------------------------
# Outer solid
cradle = Box(CRADLE_X, CRADLE_Y, CRADLE_Z,
             align=(Align.CENTER, Align.MIN, Align.CENTER))
cradle = Pos(0, CRADLE_BACK_Y, CRADLE_Z_CENTER) * cradle

# Subtract pocket (phone cavity) — centred at Z=0
pocket = Box(POCKET_W, POCKET_D + 0.1, POCKET_H,
             align=(Align.CENTER, Align.MIN, Align.CENTER))
pocket = Pos(0, POCKET_FRONT_Y, 0) * pocket
cradle = cradle - pocket

# Top-left corner cut-away (25 x 25, top of cradle, left side when viewed
# from the driver, so -X side and +Z side)
top_left = Box(TOP_CUTAWAY + 0.1, CRADLE_Y + 0.2, TOP_CUTAWAY + 0.1,
               align=(Align.MIN, Align.MIN, Align.MIN))
top_left = Pos(-CRADLE_X / 2 - 0.05,
               CRADLE_BACK_Y - 0.05,
               POCKET_H / 2 - TOP_CUTAWAY) * top_left
cradle = cradle - top_left

# Charging cable cut-out through bottom lip (cable exits downward)
cable = Box(CABLE_CUTOUT_W, POCKET_D + 0.2, BOTTOM_LIP + 0.2,
            align=(Align.CENTER, Align.MIN, Align.MAX))
cable = Pos(0, POCKET_FRONT_Y - 0.05, -POCKET_H / 2) * cable
cradle = cradle - cable

# Back-wall weight-reduction cut-out (60 x 30 centred)
back_cut = Box(BACK_CUTOUT_W, BACK_WALL + 0.2, BACK_CUTOUT_H,
               align=(Align.CENTER, Align.MIN, Align.CENTER))
back_cut = Pos(0, CRADLE_BACK_Y - 0.05, 0) * back_cut
cradle = cradle - back_cut

# ---------------------------------------------------------------------------
# Union everything
# ---------------------------------------------------------------------------
fused = plate + arm + cradle

# build123d returns a ShapeList when the `+` chain produces multiple solids;
# wrap in Compound so we always have a single object with .bounding_box / .volume.
if hasattr(fused, 'bounding_box'):
    model = fused
else:
    parts = list(fused) if hasattr(fused, '__iter__') else [fused]
    model = Compound(children=parts)

# ---------------------------------------------------------------------------
# Inspect
# ---------------------------------------------------------------------------
bbox = model.bounding_box()
dx = bbox.max.X - bbox.min.X
dy = bbox.max.Y - bbox.min.Y
dz = bbox.max.Z - bbox.min.Z
print(f"Bounding box:   {dx:.1f} x {dy:.1f} x {dz:.1f} mm")
try:
    vol = model.volume
    print(f"Volume:         {vol / 1000:.1f} cm^3")
    eff_fill = 0.55
    mass_g = vol / 1000 * 1.27 * eff_fill
    print(f"Est. filament:  {mass_g:.0f} g PETG (approx, 40% infill + walls)")
except Exception as e:
    print(f"Volume calc skipped: {e}")

# ---------------------------------------------------------------------------
# Export
# ---------------------------------------------------------------------------
export_step(model, "phone-holder.step")
export_stl(model, "phone-holder.stl")
export_gltf(model, "phone-holder.glb", binary=True)
print("Exported STEP, STL, GLB.")
