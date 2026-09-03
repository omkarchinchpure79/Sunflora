"""
Build the hero scene: cut-outs -> graded, correctly-scaled webp + a preview.

Everything here exists to fix one thing: cut-outs pasted over a photo look
pasted. Four tells give it away, and all four are handled below.

1. LIGHT DIRECTION. The plate's window is on the far left, and every shadow in
   it falls right and slightly down - measured off the brass hooks' own cast
   shadows, +145px across for +15px down. The cut-outs were all shot under flat
   frontal light, so each gets a directional grade baked in: warm and bright on
   its left flank, cooler and dimmer on its right.

2. LOCAL EXPOSURE. Half the wall sits inside the window's cast shadow. A piece
   hung there but lit as if in full sun reads as a sticker no matter how good
   its edge is, so each piece is dimmed to match the plate's own luminance
   where it actually lands.

3. HARD ALPHA EDGES. A razor edge against a softly-rendered background reads as
   a sticker, so every alpha channel is feathered ~1px. Cut-outs save LOSSLESS:
   lossy WebP leaves 1-7 alpha noise across the whole bounding box, and with
   rembg's light leftover RGB underneath that noise renders as a pale
   rectangle around every product.

4. SCALE. Sizes used to be arbitrary percentages, so a 5ft garland and a 15cm
   asaan came out identical. Now every piece is sized from its real dimension.
   True scale is impossible in one frame: the products span 10:1 (152cm to
   15cm) but the plate's furniture is drawn ~4x oversized for them, so a
   literal 15cm asaan lands at 119px on a 1168px plinth. Sizes therefore run
   through a compression curve - size = K * cm**EXP - which preserves the ORDER
   and keeps the differences obvious while pulling the spread to about 4:1.
   TABLE_BOOST is not a fudge: the table really is nearer the camera than the
   wall, so things on it are genuinely larger in frame.

Run from the repo root:  python scripts/build_hero.py
"""
import json
import os
import numpy as np
from PIL import Image, ImageFilter

RAW = 'brand-assets/hero/cutouts'
OUT = 'web/public/assets/hero'
PLATE = 'brand-assets/hero/plate-v3.jpg'

# ---- plate geometry ---------------------------------------------------------
# Measured off plate-v3.jpg. That file is only 1376x768 — exactly a quarter of
# plate-v2 — so all geometry is kept in a 5504x3072 VIRTUAL space (measured
# values x PLATE_SCALE) and the plate is only sampled at its own resolution.
# Working virtual keeps the cut-outs generated at a usable resolution instead of
# collapsing them to the plate's, and keeps these constants comparable to v2's.
PW, PH = 5504, 3072
PLATE_W, PLATE_H = 1376, 768
PLATE_SCALE = PW // PLATE_W          # 4

# v3 moved the rod to the very top of the frame (5.9% of height, was 34.5%),
# which is what freed the wall space for the larger products below.
HOOK_X = [1144, 1937, 2730, 3524, 4317, 5110]
PRONG_DX = 76        # centre of each prong's U, from the hook's centre
HANG_Y = 322         # y at which a clip or loop grips the prong

# ---- scale ------------------------------------------------------------------
# The founder asked for roughly double. The rod moving up gives 2218px of wall
# between the hang point and the table (was 1262), so the 5ft Lotus Latkan can
# run to 2150px — 1.79x its old size — and still clear the table it hangs above.
# Everything else follows from the same curve, so the true-scale ordering the
# last round established is preserved.
ANCHOR_CM, ANCHOR_PX = 152.0, 2150.0
EXP = 0.62
TABLE_BOOST = 1.45
K = ANCHOR_PX / ANCHOR_CM ** EXP


# Geometry is virtual; the scene never renders wider than ~1440 CSS px, so at
# 2x DPR a piece needs about 2880/5504 of its virtual width. Exporting at full
# virtual size shipped a 3.3MB hero. 0.6 keeps a retina margin at a third of the
# bytes; layout is unaffected because every size is a percentage.
EXPORT_SCALE = 0.6


def px_for(cm, on_table=False):
    return K * cm ** EXP * (TABLE_BOOST if on_table else 1.0)


# ---- the roster -------------------------------------------------------------
# `cm` comes from lib/site.ts wherever the product states a size ("5 ft each",
# "~12 in tall") and from the founder's measurements otherwise. A piece whose
# size is unknown is not in the scene; nothing here is invented.
#
# `x`/`base` are in the virtual space above. Hanging pieces are pinned to a
# hook; resting pieces stand on a surface, so `base` is where they touch it.
# Surfaces, measured off plate-v3 (virtual px). Both display surfaces are seen
# nearly edge-on, so their top FACES are much shallower than they look:
#   table   x from ~996 leftward-limit, top face y 2560 (back) – 2888 (front)
#   plinth  x 1736–2908, top face y 2512 (back) – 2640 (front)
#   riser   x 3232–4712, top face y 2520 (back) – 2600 (front)
# `base` must land in or just past that band. Well below the front edge sinks
# the piece into the surface's front FACE and it reads as hovering in front of
# the surface; well above it and the piece hovers behind the back edge. A wide
# piece like the asaan is deeper than the riser's 76px of projected top face,
# so it should sit just past the front edge and drape over it, which is what a
# real flower on a narrow ledge does.
SCENE = [
    dict(id='lotus-latkan', src='_raw-wa-3.png', kind='pair', cm=152, hook=5,
         name='Lotus Latkan', price='₹849', slug='lotus-latkan',
         alt='Lotus Latkan — handmade pink lotus and pearl garland, set of 2, 5 ft each'),
    # The three latkans on hooks 0, 2 and 4 were each photographed as a single
    # strand, so they hang as `duo` — one strand mirrored onto both prongs.
    # Their cm are measured, not guessed: the pearls are a standard 8mm bead and
    # the chain is exactly one bead wide, so the strand's own height in beads
    # gives its length. All three come out near 3 ft, like the purple.
    dict(id='door-latkan-orange', src='_raw-latkan-orange-0.png', kind='duo', cm=95, hook=0,
         name='Orange Lotus Latkan', price='₹799', slug='door-latkan-5ft-orange',
         alt='Orange Lotus Latkan — handmade orange velvet lotus blooms on a pearl chain, set of 2'),
    dict(id='decorative-latkan', src='latkan-red-rose.png', kind='pair', cm=61, hook=1,
         name='Lotus Decorative Latkan', price='₹449', slug='lotus-decorative-latkan',
         alt='Lotus Decorative Latkan — red velvet roses on triple pearl strands, set of 2'),
    dict(id='door-latkan-maroon', src='_raw-latkan-maroon.png', kind='duo', cm=90, hook=2,
         name='Maroon Lotus Latkan', price='₹649', slug='door-side-latkan-4ft',
         alt='Maroon Lotus Latkan — handmade deep-red velvet lotus blooms on a pearl chain, set of 2'),
    dict(id='door-latkan-pink', src='_raw-latkan-pink-1.png', kind='duo', cm=100, hook=4,
         name='Pink Lotus Latkan', price='₹799', slug='door-latkan-3ft-pink',
         alt='Pink Lotus Latkan — handmade pink velvet lotus blooms on a pearl chain, set of 2'),

    dict(id='purple-latkan', src='_raw-purple-violet.png', kind='duo', cm=91, hook=3,
         name='Purple Lotus Latkan', price='₹699', slug='purple-lotus-latkan',
         alt='Purple Lotus Latkan — handmade purple lotus and pearl garland, set of 2, 3 ft each'),

    # The resting pieces are listed back to front, by `base`: whichever sits
    # nearer the camera is pasted last and so wins where two overlap. Order it
    # any other way and the frame on the table's front lip ends up *behind* the
    # bouquet standing on the plinth well beyond it.
    # The three bouquets are the flagship, so they get the two raised surfaces
    # and the clearest run of table between them. All three are sized by HEIGHT
    # at the same cm: they are the same product in three colourways, and sizing
    # any of them by width makes the narrowest one (the blush, aspect 0.61) tower
    # over the others.
    #
    # cm=26 is not a guess and not a shrink. The old cut-outs were cropped at the
    # collar — flowers and ribbon only — so the same real bouquet drew SHORTER
    # than these do, which include the whole wrap down to its hem. Sized any
    # taller than this, a bouquet's paper reaches the lowest bloom of the latkan
    # hanging above it and cuts it in half, which reads as damage rather than as
    # depth. 1043px on a 2596 base clears every garland bottom on the rod.
    dict(id='bouquet-pink', src='_raw-bouquet-pink-v2.png', kind='rest', cm=26, axis='h',
         x=3660, base=2596, name='Pink Bouquet', price='₹999', slug='bouquets',
         alt='Everlasting Bouquet — handmade pink lilies and tulips in a cream wrap'),
    # Left of the plinth's centre, not on it: the wrap is wide enough that a
    # centred bouquet reaches hook 2 and eats the near strand of the latkan
    # hanging there, which reads as a broken garland rather than as depth.
    dict(id='bouquet', src='_raw-bouquet-purple-v3.png', kind='rest', cm=26, axis='h',
         x=2180, base=2624, name='Purple Bouquet', price='₹999', slug='bouquets',
         alt='Everlasting Bouquet — handmade lavender lilies and purple lavender sprigs in a lilac wrap'),
    dict(id='mini-frame', src='_raw-frame-5.png', kind='rest', cm=13, axis='h',
         x=5025, base=2800, name='Mini Frame', price='₹399', slug='mini-frame',
         alt='Mini Frame — a small handmade craft-wire bloom in a keepsake frame'),
    dict(id='photo-frame', src='_raw-photo-frame.png', kind='rest', cm=24, axis='h',
         x=1400, base=2830, name='Signature Frame', price='₹999', slug='signature-frame',
         alt='Signature Frame — your photo framed inside hand-shaped craft-wire flowers'),
    dict(id='asaan', src='asaan-v2.png', kind='rest', cm=15, axis='w',
         x=2950, base=2860, name='Lotus Asaan', price='₹349', slug='lotus-asaan',
         alt='Lotus Asaan — handmade pink lotus seat on green leaves, for your Ganpati idol'),
    # The third bouquet stands on the table itself rather than on the riser, so
    # it reads as the nearest thing in the frame and its top stays well below the
    # garlands. Its own base is the LAST in this list for the same reason.
    dict(id='bouquet-blush', src='_raw-bouquet-blush.png', kind='rest', cm=26, axis='h',
         x=4300, base=2864, name='Blush Bouquet', price='₹999', slug='bouquets',
         alt='Everlasting Bouquet — a handmade pink lily and white daisies in a blush wrap'),
]

# ---- grading ----------------------------------------------------------------
WARM = np.array([1.060, 1.012, 0.955])   # left flank: sunlit
COOL = np.array([0.895, 0.888, 0.950])   # right flank: lavender ambient only


def _lum(a):
    return a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114


def grade(img, exposure=1.0):
    """Bake a left-to-right directional light, plus the local exposure, into a cut-out."""
    a = np.asarray(img).astype(np.float32)
    rgb, alpha = a[..., :3], a[..., 3]
    t = np.linspace(0.0, 1.0, rgb.shape[1])[None, :, None] ** 0.85
    rgb = rgb * (WARM * (1 - t) + COOL * t) * exposure
    rgb = np.clip(rgb + 3.0, 0, 255)
    return Image.fromarray(np.dstack([rgb, alpha]).astype(np.uint8), 'RGBA')


def despeckle(mask, keep_frac=0.02, work=360):
    """
    Drop the stray fragments rembg leaves behind - a scrap of the backdrop fur,
    half a petal from a neighbouring product. One floating speck beside a
    product is enough to give the whole composite away.

    Components are labelled on a downscaled mask (cheap) by propagating each
    pixel's minimum neighbouring label until it settles, then anything smaller
    than keep_frac of the biggest component is discarded.
    """
    h, w = mask.shape
    s = max(1, int(max(h, w) / work))
    small = mask[::s, ::s]
    lab = np.where(small, np.arange(small.size).reshape(small.shape), -1)
    while True:
        prev = lab
        cur = np.where(small, lab, np.iinfo(np.int64).max).astype(np.int64)
        for shift in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            cur = np.minimum(cur, np.roll(np.where(small, lab, np.iinfo(np.int64).max), shift, (0, 1)))
        lab = np.where(small, cur, -1)
        if np.array_equal(lab, prev):
            break
    ids, counts = np.unique(lab[small], return_counts=True)
    if len(counts) == 0:
        return mask
    keep = set(ids[counts >= counts.max() * keep_frac].tolist())
    keep_small = np.isin(lab, list(keep)) & small
    # nearest-neighbour back up to full size
    full = keep_small[np.minimum(np.arange(h) // s, keep_small.shape[0] - 1)][
        :, np.minimum(np.arange(w) // s, keep_small.shape[1] - 1)]
    return mask & full


def clean_alpha(img, floor=60):
    """
    Turn rembg's soft matte into a solid, clean-edged cut-out.

    rembg hands back a partial-alpha halo wherever the product met its own
    backdrop - the white table under the asaan, the lit table under the frames.
    Left in, that halo composites as a pale rectangle around every product, and
    it is the single most obvious "this is a PNG" tell in the whole scene.

    So the alpha is BINARISED at `floor` (these are solid objects; a glass-
    fronted shadow box should not show the wall through it either), then eroded
    1px to drop the fringe pixels that carry bleed from the old background,
    then despeckled, and only then feathered back to a soft edge.
    """
    r, g, b, a = img.split()
    arr = np.asarray(a)
    solid = arr >= floor
    solid = np.asarray(
        Image.fromarray((solid * 255).astype(np.uint8), 'L').filter(ImageFilter.MinFilter(3))
    ) > 127
    solid &= despeckle(solid)
    a = Image.fromarray((solid * 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(1.1))
    return Image.merge('RGBA', (r, g, b, a))


# ---- geometry helpers -------------------------------------------------------
def load(name):
    im = Image.open(f'{RAW}/{name}').convert('RGBA')
    return im.crop(im.getbbox())


def scale_to_h(img, h):
    return img.resize((max(1, round(img.width * h / img.height)), round(h)), Image.LANCZOS)


def scale_to_w(img, w):
    return img.resize((round(w), max(1, round(img.height * w / img.width))), Image.LANCZOS)


def duo(strand_img, height_px):
    """
    Two prongs from a single strand photo, for a set-of-2 product where only one
    strand was ever photographed. The right copy is mirrored so the pair does
    not read as one image pasted twice - lotus blooms are near enough
    symmetrical for the flip to be invisible, and the directional grade is
    applied afterwards, so both strands still catch the light from the left.
    """
    left = scale_to_h(strand_img, height_px)
    right = left.transpose(Image.FLIP_LEFT_RIGHT)
    w = PRONG_DX * 2 + left.width + right.width
    canvas = Image.new('RGBA', (w, round(height_px)), (0, 0, 0, 0))
    canvas.paste(left, (w // 2 - PRONG_DX - left.width // 2, 0), left)
    canvas.paste(right, (w // 2 + PRONG_DX - right.width // 2, 0), right)
    return canvas.crop(canvas.getbbox())


def hanger(pair_img, height_px):
    """
    Compose a two-strand assembly whose strand tops land on the hook's two
    prongs. Pasting the pair as one centred image leaves the hook in the empty
    gap between the strands, gripping neither - which is exactly what made the
    old scene's latkans look like they were floating in front of the wall.
    """
    a = np.asarray(pair_img)[..., 3]
    col = (a > 24).sum(0)
    lo, hi = int(len(col) * 0.30), int(len(col) * 0.70)
    split = lo + int(np.argmin(col[lo:hi]))
    left = scale_to_h(pair_img.crop((0, 0, split, pair_img.height)), height_px)
    right = scale_to_h(pair_img.crop((split, 0, pair_img.width, pair_img.height)), height_px)

    w = PRONG_DX * 2 + left.width + right.width
    canvas = Image.new('RGBA', (w, round(height_px)), (0, 0, 0, 0))
    canvas.paste(left, (w // 2 - PRONG_DX - left.width // 2, 0), left)
    canvas.paste(right, (w // 2 + PRONG_DX - right.width // 2, 0), right)
    return canvas.crop(canvas.getbbox())


def local_exposure(plate_arr, x, y, w, h):
    """How bright is the plate where this piece lands, against its sunlit wall?"""
    x, y, w, h = (v // PLATE_SCALE for v in (x, y, w, h))
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(PLATE_W, x + w), min(PLATE_H, y + h)
    if x1 <= x0 or y1 <= y0:
        return 1.0
    local = float(_lum(plate_arr[y0:y1, x0:x1]).mean())
    ref = float(np.percentile(_lum(plate_arr[PLATE_H // 4:PLATE_H * 3 // 4, :]), 92))
    return float(np.clip((local / ref) ** 0.7, 0.80, 1.02))


# ---- build ------------------------------------------------------------------
def build():
    plate = Image.open(PLATE).convert('RGB')
    parr = np.asarray(plate).astype(np.float32)
    items = []

    for it in SCENE:
        if not os.path.exists(f'{RAW}/{it["src"]}'):
            print(f'  {it["id"]:20} SKIPPED — {it["src"]} not cut yet')
            continue
        raw = load(it['src'])
        if it['kind'] == 'pair':
            piece = hanger(raw, px_for(it['cm']))
        elif it['kind'] == 'duo':
            piece = duo(raw, px_for(it['cm']))
        elif it['kind'] == 'single':
            piece = scale_to_h(raw, px_for(it['cm']))
        else:
            piece = (scale_to_h(raw, px_for(it['cm'], True)) if it['axis'] == 'h'
                     else scale_to_w(raw, px_for(it['cm'], True)))

        if it['kind'] in ('pair', 'single', 'duo'):
            x, y = HOOK_X[it['hook']] - piece.width // 2, HANG_Y
        else:
            x, y = it['x'] - piece.width // 2, it['base'] - piece.height

        exp = local_exposure(parr, x, y, piece.width, piece.height)
        piece = clean_alpha(grade(piece, exp))
        piece = piece.crop(piece.getbbox())   # despeckling can shrink the bounds
        if it['kind'] in ('pair', 'single', 'duo'):
            x = HOOK_X[it['hook']] - piece.width // 2
        else:
            x, y = it['x'] - piece.width // 2, it['base'] - piece.height
        # Lossless is needed only where the alpha has soft edges: lossy WebP's
        # alpha noise is what produced the pale rectangles around every product.
        # A piece that is fully opaque (a framed picture is just a rectangle)
        # has no alpha to corrupt, so it ships as ordinary lossy WebP — which
        # for the photo frame is the difference between 963KB and ~60KB.
        out_img = piece.resize(
            (max(1, round(piece.width * EXPORT_SCALE)), max(1, round(piece.height * EXPORT_SCALE))),
            Image.LANCZOS)
        opaque = bool((np.asarray(out_img)[..., 3] > 250).all())
        if opaque:
            out_img.convert('RGB').save(f'{OUT}/{it["id"]}.webp', quality=86, method=6)
        else:
            out_img.save(f'{OUT}/{it["id"]}.webp', lossless=True, method=6)

        items.append(dict(it, px=piece.width, py=piece.height, ix=x, iy=y, exposure=round(exp, 3)))
        print(f'  {it["id"]:20} {piece.width:5}x{piece.height:<5} exposure {exp:.2f}')
    return items


def emit_ts(items):
    """One source of truth for geometry, so the preview and the component can't drift."""
    rows = []
    for it in items:
        rows.append({
            'id': it['id'], 'name': it['name'], 'price': it['price'], 'slug': it['slug'],
            'alt': it['alt'], 'src': f'/assets/hero/{it["id"]}.webp',
            'hang': it['kind'] in ('pair', 'single', 'duo'),
            # percentages of the scene box, so one set of numbers holds at every width
            'left': round(100 * (it['ix'] + it['px'] / 2) / PW, 3),
            'top': round(100 * it['iy'] / PH, 3),
            'w': round(100 * it['px'] / PW, 3),
            'h': round(100 * it['py'] / PH, 3),
        })
    body = json.dumps(rows, indent=2, ensure_ascii=False)
    with open('web/lib/heroScene.ts', 'w', encoding='utf-8') as f:
        f.write(
            '// GENERATED by scripts/build_hero.py — do not edit by hand.\n'
            '// Positions are percentages of the scene box, measured off the backdrop\n'
            '// plate, so one set of coordinates holds at every viewport width.\n'
            'export type HeroItem = {\n'
            '  id: string\n  name: string\n  price: string\n  slug: string | null\n'
            '  alt: string\n  src: string\n  hang: boolean\n'
            '  left: number\n  top: number\n  w: number\n  h: number\n}\n\n'
            f'export const HERO_ITEMS: HeroItem[] = {body}\n'
        )
    print('  web/lib/heroScene.ts')


def build_backdrop():
    """The plate itself, at two widths. Lossy is fine here - it has no alpha."""
    plate = Image.open(PLATE).convert('RGB')
    # v3's source is only 1376px wide, so 'backdrop' is a mild Lanczos upscale.
    # It adds no detail — it just avoids the browser doing a worse job of it.
    for name, w in (('backdrop', 2064), ('backdrop-1400', 1376)):
        im = plate.resize((w, round(w * PLATE_H / PLATE_W)), Image.LANCZOS)
        im.save(f'{OUT}/{name}.webp', quality=86, method=6)
        print(f'  {name+".webp":26} {im.width:5}x{im.height:<5}')


if __name__ == '__main__':
    print('backdrop:')
    build_backdrop()
    print('pieces:')
    items = build()
    print('generated:')
    emit_ts(items)
