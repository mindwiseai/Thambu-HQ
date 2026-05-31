#!/usr/bin/env python3
"""
process-hero.py — turn customer-room / white-bg product photos into clean
studio heroes: de-tilt, rembg background removal, hardened matte, composite
onto deep carbon-black with a flame radial glow + soft contact shadow.

Usage:
  python3 scripts/process-hero.py <src> <out-stem> [tilt_deg]

Examples:
  python3 scripts/process-hero.py "../marketing/assets/Product Images/IMG_8519.jpeg" rig-studio -2.2
  python3 scripts/process-hero.py "../marketing/assets/Product Images/IMG_8361.jpeg" rig-studio-2 0
"""
import sys, os
from PIL import Image, ImageOps, ImageFilter, ImageDraw
from rembg import remove, new_session

SRC = sys.argv[1]
STEM = sys.argv[2]
TILT = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0

OUT_DIR = "public/hero"
os.makedirs(OUT_DIR, exist_ok=True)
CARBON = (11, 11, 12)
FLAME = (255, 59, 29)

img = Image.open(SRC)
img = ImageOps.exif_transpose(img)
if TILT:
    img = img.rotate(TILT, expand=True, resample=Image.BICUBIC)
max_w = 2200
if img.width > max_w:
    img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)

session = new_session("isnet-general-use")
cut = remove(
    img.convert("RGBA"), session=session, alpha_matting=True,
    alpha_matting_foreground_threshold=250,
    alpha_matting_background_threshold=20,
    alpha_matting_erode_size=12,
)
r, g, b, a = cut.split()
a = a.point(lambda v: 0 if v < 130 else (255 if v > 205 else int((v - 130) / 75 * 255)))
a = a.filter(ImageFilter.MinFilter(3))
a = a.filter(ImageFilter.GaussianBlur(0.6))
cut = Image.merge("RGBA", (r, g, b, a)).crop(Image.merge("RGBA", (r, g, b, a)).getbbox())
print(f"cutout: {cut.size}")

PAD = 0.14
cw = round(cut.width * (1 + PAD * 2))
ch = round(cut.height * (1 + PAD * 1.5))
canvas = Image.new("RGBA", (cw, ch), (*CARBON, 255))

glow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gx, gy = int(cw * 0.52), int(ch * 0.42)
gr = int(min(cw, ch) * 0.42)
for i in range(gr, 0, -3):
    al = int(60 * (i / gr) ** 0.5 * (1 - i / gr))
    gd.ellipse([gx - i, gy - i, gx + i, gy + i], fill=(*FLAME, max(al, 0)))
glow = glow.filter(ImageFilter.GaussianBlur(40))
canvas = Image.alpha_composite(canvas, glow)

shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
smask = cut.split()[3].point(lambda v: int(v * 0.55))
sh = Image.new("RGBA", cut.size, (0, 0, 0, 255)); sh.putalpha(smask)
sx = int((cw - cut.width) / 2)
sy = int(ch - cut.height - ch * 0.02) + int(cut.height * 0.04)
shadow.paste(sh, (sx, sy), sh)
shadow = shadow.filter(ImageFilter.GaussianBlur(30))
canvas = Image.alpha_composite(canvas, shadow)

canvas.alpha_composite(cut, (int((cw - cut.width) / 2), int((ch - cut.height) / 2)))
out = os.path.join(OUT_DIR, f"{STEM}.png")
canvas.convert("RGB").save(out, quality=92)
print(f"studio hero: {canvas.size} -> {out}")
