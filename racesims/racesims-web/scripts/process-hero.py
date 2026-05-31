#!/usr/bin/env python3
"""
process-hero.py — turn the customer-room rig photo into a clean studio hero.

Pipeline:
  1. open the original full-res shot, bake EXIF orientation
  2. correct the slight tilt (rotate a few degrees, expand)
  3. rembg: remove the room background -> transparent PNG cutout
  4. composite onto a deep carbon-black canvas with a flame radial glow + soft
     contact shadow, so it reads as a premium product-on-black hero.

Output: public/hero/rig-studio.png  (transparent cutout: rig-cutout.png too)
"""
from PIL import Image, ImageOps, ImageFilter, ImageDraw
from rembg import remove, new_session
import os

SRC = "../marketing/assets/Product Images/IMG_8519.jpeg"
OUT_DIR = "public/hero"
os.makedirs(OUT_DIR, exist_ok=True)

CARBON = (11, 11, 12)          # --carbon
FLAME = (255, 59, 29)          # brand flame
TILT_DEG = -2.2                # correct the lean (negative = clockwise)

# 1+2 — load, fix EXIF, rotate to straighten
img = Image.open(SRC)
img = ImageOps.exif_transpose(img)          # bake camera orientation
img = img.rotate(TILT_DEG, expand=True, resample=Image.BICUBIC)

# downscale a touch for speed/size (keep it crisp though)
max_w = 2200
if img.width > max_w:
    img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)

# 3 — background removal (isnet model = cleaner edges on hard products)
session = new_session("isnet-general-use")
cut = remove(
    img.convert("RGBA"),
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=250,
    alpha_matting_background_threshold=20,
    alpha_matting_erode_size=12,
)

# Harden the matte: push near-opaque to solid, kill the translucent halo, then
# erode 1px so no background fringe survives on the rim.
r, g, b, a = cut.split()
a = a.point(lambda v: 0 if v < 130 else (255 if v > 205 else int((v - 130) / 75 * 255)))
a = a.filter(ImageFilter.MinFilter(3))      # 1px erode
a = a.filter(ImageFilter.GaussianBlur(0.6)) # re-soften the cut edge slightly
cut = Image.merge("RGBA", (r, g, b, a))
cut = cut.crop(cut.getbbox())               # tight-crop to the rig
cut.save(os.path.join(OUT_DIR, "rig-cutout.png"))
print(f"cutout: {cut.size}")

# 4 — composite on carbon canvas with glow + contact shadow
PAD = 0.14
cw = round(cut.width * (1 + PAD * 2))
ch = round(cut.height * (1 + PAD * 1.5))
canvas = Image.new("RGBA", (cw, ch), (*CARBON, 255))

# radial flame glow behind the rig
glow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gx, gy = int(cw * 0.52), int(ch * 0.42)
gr = int(min(cw, ch) * 0.42)
for i in range(gr, 0, -3):
    a = int(60 * (i / gr) ** 0.5 * (1 - i / gr))   # peak mid-radius
    gd.ellipse([gx - i, gy - i, gx + i, gy + i], fill=(*FLAME, max(a, 0)))
glow = glow.filter(ImageFilter.GaussianBlur(40))
canvas = Image.alpha_composite(canvas, glow)

# soft contact shadow under the rig
shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
smask = cut.split()[3].point(lambda a: int(a * 0.55))
sh = Image.new("RGBA", cut.size, (0, 0, 0, 255))
sh.putalpha(smask)
sx = int((cw - cut.width) / 2)
sy = int(ch - cut.height - ch * 0.02) + int(cut.height * 0.04)
shadow.paste(sh, (sx, sy), sh)
shadow = shadow.filter(ImageFilter.GaussianBlur(30))
canvas = Image.alpha_composite(canvas, shadow)

# the rig itself
rx = int((cw - cut.width) / 2)
ry = int((ch - cut.height) / 2)
canvas.alpha_composite(cut, (rx, ry))

out = os.path.join(OUT_DIR, "rig-studio.png")
canvas.convert("RGB").save(out, quality=92)
print(f"studio hero: {canvas.size} -> {out}")
