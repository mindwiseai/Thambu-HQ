#!/usr/bin/env python3
"""
Take the reference sim-rig cup holder (base.stl) and emboss the RaceSims
wordmark on the outer face of the ring.

Method:
1. Generate "RaceSims" text as 2D polygons using matplotlib's TextPath.
2. Extrude those polygons into 3D using trimesh.creation.extrude_polygon.
3. Orient the text so it lies tangent to the ring's outer surface (ring axis
   is Z, so the text sits in a plane whose normal is +X), with a small
   embed depth so it fuses cleanly into the curved wall when the slicer
   processes it.
4. Concatenate with the base mesh and export.

The result prints as a single piece; the slicer unions the overlapping
volumes automatically. No boolean engine required.

Run with:  uvx --from trimesh --with matplotlib --with shapely --with numpy \
             python add_logo.py
"""
from pathlib import Path

import matplotlib.font_manager as fm
import numpy as np
import trimesh
from matplotlib.font_manager import FontProperties
from matplotlib.textpath import TextPath
from shapely.geometry import Polygon
from shapely.ops import unary_union

HERE = Path(__file__).parent
BASE_PATH = HERE / "reference" / "base.stl"
OUT_PATH = HERE / "racesims-cup-holder.stl"

# Logo placement / sizing
TEXT = "RaceSims"
TEXT_HEIGHT_MM = 11          # font em-height (Arial Bold cap-height ≈ 0.73×)
TEXT_DEPTH_MM = 3.0          # radial thickness of the logo solid (embed + proud)
EMBED_MM = 1.5               # depth the logo's inner face sinks into the ring
                             # wall (logo stands 1.5 mm proud of the surface)
# The reference STL is a ~38 mm-outer-radius ring whose axis is parallel to Z
# and whose cylinder centre lies on the X axis at ~X=10. Logo is wrapped
# onto this cylinder so the text follows the curved wall cleanly instead of
# floating off as a flat billboard.
RING_CENTRE_X = 10.16        # derived from base mesh (max_x - outer_radius)
RING_OUTER_R = 38.10         # outer radius of the ring
RING_Z_CENTRE = 50.0         # mid-height where the logo is centred


def text_to_polygons(text: str, size: float, font: FontProperties):
    """Convert a string to a list of shapely polygons (one per glyph
    outer boundary, with any interior counters as holes). Uses
    TextPath.to_polygons(), which flattens Bezier curves to fine line
    segments, so letters like R, a, e, S stay rounded in the mesh."""
    tp = TextPath((0, 0), text, size=size, prop=font)
    # to_polygons returns a list of vertex arrays — one per closed subpath.
    # Each subpath is either a glyph outer contour or an interior hole.
    raw_polys = []
    for poly_verts in tp.to_polygons(closed_only=True):
        if len(poly_verts) < 3:
            continue
        p = Polygon(poly_verts)
        if p.is_valid and p.area > 1e-6:
            raw_polys.append(p)

    # Classify outer contours vs holes using containment + area.
    outers = []
    holes_for = {i: [] for i in range(len(raw_polys))}
    for i, p in enumerate(raw_polys):
        containers = [
            j for j, q in enumerate(raw_polys)
            if i != j and q.contains(p)
        ]
        if not containers:
            outers.append(i)
        else:
            container = min(containers, key=lambda j: raw_polys[j].area)
            holes_for[container].append(list(p.exterior.coords))

    result = []
    for i in outers:
        outer_coords = list(raw_polys[i].exterior.coords)
        holes = holes_for[i]
        poly = Polygon(outer_coords, holes)
        if poly.is_valid and poly.area > 1e-6:
            result.append(poly)
    return result


def main():
    # --- Build the RaceSims text as a 3D mesh ---
    # Prefer a bold sans-serif font available on macOS
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    font_file = next((f for f in candidates if Path(f).exists()), None)
    if font_file:
        fp = FontProperties(fname=font_file, weight="bold", size=TEXT_HEIGHT_MM)
    else:
        fp = FontProperties(family="sans-serif", weight="bold",
                            size=TEXT_HEIGHT_MM)
    print(f"Using font: {font_file or fp.get_family()}")

    polys = text_to_polygons(TEXT, TEXT_HEIGHT_MM, fp)
    print(f"Generated {len(polys)} letter polygons")

    # Extrude each letter into a slab
    letter_meshes = [
        trimesh.creation.extrude_polygon(p, height=TEXT_DEPTH_MM)
        for p in polys
    ]
    logo = trimesh.util.concatenate(letter_meshes)

    # Centre the logo on its BOUNDING-BOX centre (not its mass centroid —
    # letter density in "RaceSims" varies). After this: logo bbox is
    # centred at origin; letters lie in local XY (X = horizontal along text,
    # Y = vertical text height), and Z = extrusion depth, also centred.
    bbox_lo, bbox_hi = logo.bounds
    bbox_centre = (bbox_lo + bbox_hi) / 2.0
    logo.apply_translation(-bbox_centre)

    # WRAP the logo around the ring's outer cylinder.
    # Map each vertex (local_x, local_y, local_z) -> world (wx, wy, wz):
    #   local_x  — horizontal position along text (will become arc length)
    #   local_y  — vertical position on text (becomes world Z)
    #   local_z  — extrusion depth (becomes radial offset from ring surface)
    # World:
    #   theta       = local_x / R_base       (arc length / radius = angle)
    #   R_at_vertex = R_base + local_z       (push +z outward, -z inward)
    #   wx          = RING_CENTRE_X + R_at_vertex * cos(theta)
    #   wy          =                 R_at_vertex * sin(theta)
    #   wz          = RING_Z_CENTRE + local_y
    # R_base is the radius at which the local z=0 plane lies. Because the
    # logo is centred on z=0 with extrusion ±TEXT_DEPTH_MM/2, we want the
    # back of the logo (z = -TEXT_DEPTH_MM/2) to sit EMBED_MM inside the
    # ring surface => R_base = RING_OUTER_R - EMBED_MM + TEXT_DEPTH_MM/2.
    R_base = RING_OUTER_R - EMBED_MM + TEXT_DEPTH_MM / 2.0

    verts = logo.vertices.copy()
    lx = verts[:, 0]
    ly = verts[:, 1]
    lz = verts[:, 2]
    theta = lx / R_base
    r_at = R_base + lz
    wx = RING_CENTRE_X + r_at * np.cos(theta)
    wy = r_at * np.sin(theta)
    wz = RING_Z_CENTRE + ly
    logo.vertices = np.column_stack([wx, wy, wz])
    # Recompute normals / clear caches after vertex surgery
    logo.process(validate=True)

    bb_min, bb_max = logo.bounds
    print(f"Logo mesh bounds:")
    print(f"  X: {bb_min[0]:.2f} to {bb_max[0]:.2f}")
    print(f"  Y: {bb_min[1]:.2f} to {bb_max[1]:.2f}")
    print(f"  Z: {bb_min[2]:.2f} to {bb_max[2]:.2f}")

    # --- Combine with the base cup holder ---
    base = trimesh.load(str(BASE_PATH))
    if isinstance(base, trimesh.Scene):
        base = trimesh.util.concatenate(list(base.dump()))

    combined = trimesh.util.concatenate([base, logo])
    combined.export(str(OUT_PATH))
    print(f"Wrote {OUT_PATH}")
    print(f"  Triangles: {len(combined.faces)} "
          f"(base {len(base.faces)} + logo {len(logo.faces)})")


if __name__ == "__main__":
    main()
