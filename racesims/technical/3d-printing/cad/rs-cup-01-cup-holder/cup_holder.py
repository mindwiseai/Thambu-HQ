#!/usr/bin/env python3
"""
RaceSims Cup Holder RS-CUP-01.

Ring fits a 500 ml sports bottle, 330/500 ml can, or a water bottle
(up to ~80 mm diameter). Mounts to 2040/4040 aluminium extrusion via two M6
T-slot bolts on the same 60 mm vertical centres as RS-PH-01.

Monolithic V1 — ring rigidly attached to the arm (no flat-pack bolt-join in
this first revision; the M4 seam is noted in the README for V2).

Coordinate system:
  X — tangent to the ring (horizontal, perpendicular to arm)
  Y — arm extension (away from rig, toward the driver)
  Z — vertical (ring axis)
Origin at centre of mount plate's mating face.
"""

import math
from build123d import (
    Align,
    Box,
    Compound,
    Cylinder,
    Pos,
    Rot,
    export_gltf,
    export_step,
    export_stl,
)

# === Mount plate (identical to RS-PH-01) ===
PLATE_W = 40
PLATE_T = 6
PLATE_H = 100
BOLT_DIA = 6.5
BOLT_HOLE_FROM_EDGE = 20
CBORE_DIA = 11
CBORE_DEPTH = 2
EMBOSS_W = 30
EMBOSS_H = 10
EMBOSS_DEPTH = 2

# === Arm ===
ARM_W = 8      # X
ARM_L = 70     # Y
ARM_H = 20     # Z

# === Ring ===
RING_OD = 100
RING_ID = 82
RING_H = 60
BASE_T = 10           # base thickness (closed floor)
INNER_RECESS_D = 50   # centring recess for bottle
INNER_RECESS_H = 5
DRAIN_D = 20          # drain hole through base
SLOT_W = 15           # tangential width
SLOT_H = 40           # vertical height
N_SLOTS = 3

PLATE_FRONT_Y = PLATE_T / 2            # +3
ARM_END_Y = PLATE_FRONT_Y + ARM_L      # +73
# Ring is attached at its 3-o'clock position (arm meets the side of the ring,
# not the bottom). Ring centre is 70 mm from the mount plate front, so the ring
# centre sits at Y = ARM_END_Y + RING_OD/2 - ARM_LENGTH
# But user spec says "70 mm extension from mount plate to ring center", so
# ring centre at Y = 73 (ARM_END_Y), and arm overlaps the ring wall slightly
# to produce a solid fused joint.
RING_CENTRE_Y = ARM_END_Y                          # 73
RING_CENTRE_X = 0                                  # centred
# Ring sits vertically with its axis along Z, centred at Z=0 (same mid-line as
# the arm and the mount plate's middle).
RING_CENTRE_Z = 0

# ---------------------------------------------------------------------------
# Mount plate
# ---------------------------------------------------------------------------
plate = Box(PLATE_W, PLATE_T, PLATE_H,
            align=(Align.CENTER, Align.CENTER, Align.CENTER))

for z in (PLATE_H / 2 - BOLT_HOLE_FROM_EDGE,
          -PLATE_H / 2 + BOLT_HOLE_FROM_EDGE):
    hole = Rot(90, 0, 0) * Cylinder(BOLT_DIA / 2, PLATE_T + 2)
    hole = Pos(0, 0, z) * hole
    plate = plate - hole

    cbore = Rot(90, 0, 0) * Cylinder(CBORE_DIA / 2, CBORE_DEPTH + 0.1)
    cbore = Pos(0, PLATE_T / 2 - CBORE_DEPTH / 2, z) * cbore
    plate = plate - cbore

emboss = Box(EMBOSS_W, EMBOSS_DEPTH + 0.1, EMBOSS_H,
             align=(Align.CENTER, Align.CENTER, Align.CENTER))
emboss = Pos(0, PLATE_T / 2 - EMBOSS_DEPTH / 2, 0) * emboss
plate = plate - emboss

# ---------------------------------------------------------------------------
# Arm — extends slightly past its nominal end so it fuses into the ring wall.
# ---------------------------------------------------------------------------
ARM_OVERLAP = 8  # mm of penetration into the ring wall for a solid fuse
arm = Box(ARM_W, ARM_L + ARM_OVERLAP + 0.1, ARM_H,
          align=(Align.CENTER, Align.MIN, Align.CENTER))
arm = Pos(0, PLATE_FRONT_Y - 0.1, 0) * arm

# ---------------------------------------------------------------------------
# Ring (outer cylinder − inner pocket − centring recess − drain − 3 slots).
# The ring axis is along Z. Ring sits so its outer radius is tangent to the
# arm-ring junction on the -Y side of the ring.
# ---------------------------------------------------------------------------
# Outer solid
ring_outer = Cylinder(RING_OD / 2, RING_H,
                      align=(Align.CENTER, Align.CENTER, Align.MIN))
ring_outer = Pos(RING_CENTRE_X, RING_CENTRE_Y + RING_OD / 2,
                 RING_CENTRE_Z - RING_H / 2) * ring_outer

# Inner pocket (hollow the ring, leaving the base intact at the bottom)
ring_inner = Cylinder(RING_ID / 2, RING_H - BASE_T + 0.1,
                      align=(Align.CENTER, Align.CENTER, Align.MIN))
ring_inner = Pos(RING_CENTRE_X, RING_CENTRE_Y + RING_OD / 2,
                 RING_CENTRE_Z - RING_H / 2 + BASE_T) * ring_inner

ring = ring_outer - ring_inner

# Centring recess on top of the base (stepped detail the bottle sits into)
recess = Cylinder(INNER_RECESS_D / 2, INNER_RECESS_H + 0.1,
                  align=(Align.CENTER, Align.CENTER, Align.MIN))
recess = Pos(RING_CENTRE_X, RING_CENTRE_Y + RING_OD / 2,
             RING_CENTRE_Z - RING_H / 2 + BASE_T - INNER_RECESS_H) * recess
ring = ring - recess

# Drain hole through base (co-axial with ring)
drain = Cylinder(DRAIN_D / 2, BASE_T + 1,
                 align=(Align.CENTER, Align.CENTER, Align.MIN))
drain = Pos(RING_CENTRE_X, RING_CENTRE_Y + RING_OD / 2,
            RING_CENTRE_Z - RING_H / 2 - 0.5) * drain
ring = ring - drain

# Three tangential ventilation slots, 120° apart, centred vertically on ring.
# Each slot is a 15 wide x 40 tall x wall-depth box oriented radially.
WALL_DEPTH = (RING_OD - RING_ID) / 2  # 9 mm
for i in range(N_SLOTS):
    theta_deg = 90 + i * (360 / N_SLOTS)   # first slot at top (+Y direction — away from arm)
    # Place slot in the wall — box centred at the wall mid-radius, then rotate around ring axis.
    slot = Box(SLOT_W, WALL_DEPTH + 4, SLOT_H,
               align=(Align.CENTER, Align.CENTER, Align.CENTER))
    r_mid = (RING_OD / 2 + RING_ID / 2) / 2  # 45.5 mm
    # Offset the slot along +Y by r_mid (relative to ring centre),
    # then rotate about the ring's axis (Z) by theta.
    slot = Pos(0, r_mid, 0) * slot
    slot = Rot(0, 0, theta_deg) * slot
    # Translate to ring's world centre
    slot = Pos(RING_CENTRE_X, RING_CENTRE_Y + RING_OD / 2, RING_CENTRE_Z) * slot
    ring = ring - slot

# ---------------------------------------------------------------------------
# Fuse everything
# ---------------------------------------------------------------------------
fused = plate + arm + ring

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
export_step(model, "cup-holder.step")
export_stl(model, "cup-holder.stl")
export_gltf(model, "cup-holder.glb", binary=True)
print("Exported STEP, STL, GLB.")
