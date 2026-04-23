#!/usr/bin/env python3
"""
Render 3 views (front, side, iso) of a 3D-printable part from its STL,
writing PNGs next to the STL.

Usage:  python render.py <path/to/part.stl> <name-prefix>
Example: python render.py rs-ph-01-phone-holder/phone-holder.stl render
  -> writes render-front.png, render-side.png, render-iso.png next to the STL
"""
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import trimesh
from mpl_toolkits.mplot3d.art3d import Poly3DCollection


VIEWS = {
    # (elev, azim) — matplotlib view_init convention.
    # In my model coord system: +Y points toward the driver (arm extends in +Y).
    # matplotlib azim=0 places the camera at +X (side view).
    # azim=+90 is right-handed rotation → camera moves to +Y (front view from driver's eye).
    "front": (20, 90),   # camera at +Y, tilted down 20° so the pocket/ring cavity is readable
    "side":  (5, 0),     # camera at +X, looking toward -X (side profile)
    "iso":   (25, 55),   # 3/4 isometric from the +X / +Y / +Z octant
    "logo":  (5, 15),    # camera near +X, slight offset — reveals the +X face where
                         # curved branding / side details tend to sit
}


def shade_intensity(normals: np.ndarray, light_dir: np.ndarray) -> np.ndarray:
    """Simple Lambertian shading: intensity is max(0, dot(n, light)).

    Returns an array in [0, 1] with one value per face.
    """
    light = light_dir / np.linalg.norm(light_dir)
    n = normals / np.linalg.norm(normals, axis=1, keepdims=True).clip(min=1e-9)
    return np.clip((n @ light) * 0.5 + 0.5, 0.0, 1.0)


def render(stl_path: Path, prefix: str) -> None:
    mesh = trimesh.load(str(stl_path))
    if isinstance(mesh, trimesh.Scene):
        mesh = trimesh.util.concatenate(list(mesh.dump()))

    verts = mesh.vertices
    faces = mesh.faces
    triangles = verts[faces]
    face_normals = mesh.face_normals

    bb_min = verts.min(axis=0)
    bb_max = verts.max(axis=0)
    span = bb_max - bb_min
    max_span = float(span.max())
    centre = (bb_min + bb_max) / 2.0

    # A neutral mid-grey body — RaceSims red accents go on the real print, not
    # in this preview. Lambert shading gives readable relief.
    base_rgb = np.array([0.62, 0.62, 0.66])
    # Light from camera-upper-right area (keeps surfaces readable across views).
    light_dir = np.array([0.5, -0.5, 1.0])
    intensity = shade_intensity(face_normals, light_dir)
    face_rgb = np.clip(base_rgb[None, :] * (0.45 + 0.55 * intensity[:, None]), 0, 1)
    face_rgba = np.concatenate([face_rgb, np.ones((len(face_rgb), 1))], axis=1)

    for name, (elev, azim) in VIEWS.items():
        fig = plt.figure(figsize=(11, 8.5), dpi=150)
        ax = fig.add_subplot(111, projection="3d")
        ax.set_proj_type("ortho")

        pc = Poly3DCollection(
            triangles,
            linewidths=0.15,
            edgecolors=(0.12, 0.12, 0.12, 0.7),
        )
        pc.set_facecolor(face_rgba)
        ax.add_collection3d(pc)

        pad = max_span * 0.08
        ax.set_xlim(centre[0] - max_span / 2 - pad, centre[0] + max_span / 2 + pad)
        ax.set_ylim(centre[1] - max_span / 2 - pad, centre[1] + max_span / 2 + pad)
        ax.set_zlim(centre[2] - max_span / 2 - pad, centre[2] + max_span / 2 + pad)
        ax.set_box_aspect((1, 1, 1))
        ax.view_init(elev=elev, azim=azim)

        ax.grid(False)
        ax.set_axis_off()
        fig.patch.set_facecolor("white")
        ax.set_facecolor("white")

        # Title + dimensions strip at top
        fig.text(
            0.5, 0.93,
            f"{stl_path.stem.replace('-', ' ').title()} — {name.upper()} view",
            ha="center", fontsize=14, fontweight="bold", color="#1a1a1a",
        )
        fig.text(
            0.5, 0.89,
            f"{span[0]:.0f} × {span[1]:.0f} × {span[2]:.0f} mm (X × Y × Z)",
            ha="center", fontsize=10, color="#666",
        )
        # Brand strip
        fig.text(
            0.5, 0.05,
            "RaceSims — racesims.in",
            ha="center", fontsize=9, color="#c8102e", fontweight="bold",
        )

        out = stl_path.parent / f"{prefix}-{name}.png"
        fig.savefig(out, bbox_inches="tight", pad_inches=0.2, facecolor="white")
        plt.close(fig)
        print(f"Wrote {out}")


if __name__ == "__main__":
    stl = Path(sys.argv[1]).resolve()
    prefix = sys.argv[2] if len(sys.argv) > 2 else "render"
    render(stl, prefix)
