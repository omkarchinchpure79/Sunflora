"""
Composite the built pieces onto the plate to check placement, light and shadow.

This mirrors what the browser will do (CSS drop-shadow follows the alpha the
same way), so if it looks right here it looks right on the page.

Two different shadows, because they are two different things:
  * a CAST shadow - the silhouette displaced along the light, onto the wall or
    table behind. It is what tells you the object is in front of something.
  * a CONTACT shadow - tight, dark and small, right where the object meets a
    surface. It is what tells you the object is ON that surface rather than
    hovering above it. The old scene had neither, which is why the latkans
    floated and the asaan never sat on its plinth.

Run from the repo root:  python scripts/preview_hero.py
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from build_hero import SCENE, HOOK_X, HANG_Y, PW, PH, PLATE, OUT, EXPORT_SCALE

SHADOW_RGB = (74, 52, 92)          # sampled from the plate's own shadows
# The hooks' cast shadows run +145px across for +15px down, which fixes the
# light's DIRECTION (right, slightly down) - but not the distance. Offset scales
# with how far the object stands off the surface, and a garland hangs far closer
# to the wall than a hook bracket stands off it. Pushed out to the hooks' own
# 145px, with a blur wide enough to cover a thin chain, the shadow detaches into
# a soft rectangle beside the product instead of reading as attached to it.
HANG_OFFSET = (94, 18)
REST_OFFSET = (80, 32)


def silhouette(img, rgb, opacity, blur):
    """
    A cast shadow: the piece's own silhouette, displaced along the light.

    Padded by 3x the blur radius for the same reason as the contact shadow -
    these cut-outs are cropped tight to the product, so blurring in place
    clips the falloff at the canvas edge and the shadow composites as a
    rectangle with visible straight sides instead of the product's outline.
    Returns the padding so the caller can keep the shadow registered.
    """
    pad = int(blur * 3)
    a = (np.asarray(img)[..., 3].astype(np.float32) * opacity).astype(np.uint8)
    out = np.zeros((a.shape[0] + pad * 2, a.shape[1] + pad * 2, 4), np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = rgb
    out[pad:pad + a.shape[0], pad:pad + a.shape[1], 3] = a
    return Image.fromarray(out, 'RGBA').filter(ImageFilter.GaussianBlur(blur)), pad


def contact_shadow(width, height, blur):
    """
    A soft ellipse hugging the base, so the piece reads as resting ON the
    surface rather than hovering over it.

    The canvas is padded by 3x the blur radius on every side. Without that
    headroom a Gaussian this wide has nowhere to fall off, so the ellipse
    smears flat against the canvas edges and composites as a dark RECTANGLE
    under the product - which looks far worse than having no contact shadow.
    """
    pad = int(blur * 3)
    im = Image.new('RGBA', (width + pad * 2, height + pad * 2), (0, 0, 0, 0))
    ImageDraw.Draw(im).ellipse((pad, pad, pad + width, pad + height), fill=(*SHADOW_RGB, 165))
    return im.filter(ImageFilter.GaussianBlur(blur))


# The plate is a quarter of the virtual space the geometry lives in.
plate = Image.open(PLATE).convert('RGBA').resize((PW, PH), Image.LANCZOS)

for it in SCENE:
    piece = Image.open(f'{OUT}/{it["id"]}.webp').convert('RGBA')
    # Pieces ship at EXPORT_SCALE of the virtual space (the browser scales them
    # back up via percentage sizing), so undo that here to place them correctly.
    piece = piece.resize((round(piece.width / EXPORT_SCALE), round(piece.height / EXPORT_SCALE)),
                         Image.LANCZOS)
    hanging = it['kind'] in ('pair', 'single', 'duo')
    if hanging:
        x, y = HOOK_X[it['hook']] - piece.width // 2, HANG_Y
        dx, dy, blur, op = *HANG_OFFSET, 23, 0.30
    else:
        x, y = it['x'] - piece.width // 2, it['base'] - piece.height
        dx, dy, blur, op = *REST_OFFSET, 30, 0.26
        cw = int(piece.width * 0.66)
        cs = contact_shadow(cw, int(cw * 0.26), blur=cw * 0.075)
        plate.alpha_composite(cs, (it['x'] - cs.width // 2, it['base'] - cs.height // 2))

    sh, pad = silhouette(piece, SHADOW_RGB, op, blur)
    plate.alpha_composite(sh, (x + dx - pad, y + dy - pad))
    plate.alpha_composite(piece, (x, y))

rgb = plate.convert('RGB')
rgb.save('brand-assets/hero/_preview.jpg', quality=92)
small = rgb.copy()
small.thumbnail((1800, 1800))
small.save('brand-assets/hero/_preview-small.jpg', quality=88)
print('preview written')
