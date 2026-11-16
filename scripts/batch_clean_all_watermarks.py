import os
import cv2
import numpy as np
import shutil

def detect_gofood_watermark(img):
    if img is None:
        return False, 0.0
    h, w = img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    in_ring = gray[(dist >= R * 0.82) & (dist <= R * 0.96)]
    out_ring = gray[(dist >= R * 1.04) & (dist <= R * 1.18)]
    if len(in_ring) == 0 or len(out_ring) == 0:
        return False, 0.0
    diff = float(np.median(in_ring) - np.median(out_ring))
    return diff > 3.5, diff

def remove_gofood_watermark_perfect(img):
    h, w = img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125

    # Circular mask covering watermark ring and interior
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    
    # Estimate background using inpaint of the whole disc
    disc_mask = (dist <= R * 1.10).astype(np.uint8) * 255
    bg_est = cv2.inpaint(img, disc_mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

    img_f = img.astype(np.float32)
    bg_f = bg_est.astype(np.float32)
    diff = np.mean(img_f - bg_f, axis=2)

    # Selective mask: the watermark ring + fork/spoon features
    ring_mask = (dist >= R * 0.86) & (dist <= R * 1.08)
    core_mask = (diff > 5.0) & (dist <= R * 1.10)
    
    wm_mask = (ring_mask | core_mask).astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated_mask = cv2.dilate(wm_mask, kernel)

    # Clean with Telea inpainting on selective mask
    cleaned = cv2.inpaint(img, dilated_mask, inpaintRadius=4, flags=cv2.INPAINT_TELEA)

    # Check if any ring trace remains
    has_wm, rem_diff = detect_gofood_watermark(cleaned)
    if has_wm or rem_diff > 2.5:
        # If ring still slightly detectable, inpaint the ring zone smoothly
        ring_dilated = (dist >= R * 0.84) & (dist <= R * 1.10)
        cleaned = cv2.inpaint(cleaned, ring_dilated.astype(np.uint8) * 255, inpaintRadius=4, flags=cv2.INPAINT_TELEA)

    return cleaned

# All items in ALL_MENU_ITEMS
items_to_clean = [
    # Drinks
    ('public/images/raw_with_watermark/scapula.webp', [
        'public/images/menu/drinks/scapula.webp',
        'public/assets/clavicula/drinks/scapula.webp'
    ]),
    ('public/images/raw_with_watermark/trapezius.webp', [
        'public/images/menu/drinks/trapezius.webp',
        'public/assets/clavicula/drinks/trapezius.webp'
    ]),
    ('public/images/raw_with_watermark/sternum.webp', [
        'public/images/menu/drinks/sternum.webp',
        'public/assets/clavicula/drinks/sternum.webp'
    ]),
    ('public/images/raw_with_watermark/acromion.webp', [
        'public/images/menu/drinks/acromion.webp',
        'public/assets/clavicula/drinks/acromion.webp'
    ]),
    ('public/images/raw_with_watermark/costa.webp', [
        'public/images/menu/drinks/costa.webp',
        'public/assets/clavicula/drinks/costa.webp'
    ]),
    ('public/images/raw_with_watermark/cookies-coffee.webp', [
        'public/images/menu/drinks/cookies-coffee.webp',
        'public/assets/clavicula/drinks/cookies-coffee.webp'
    ]),
    ('public/images/raw_with_watermark/matcha-coffee-latte.webp', [
        'public/images/menu/drinks/matcha-coffee-latte.webp',
        'public/assets/clavicula/drinks/matcha-coffee-latte.webp'
    ]),
    ('public/images/raw_with_watermark/caramel-machiato.webp', [
        'public/images/menu/drinks/caramel-machiato.webp',
        'public/assets/clavicula/drinks/caramel-macchiato.webp'
    ]),
    ('public/images/raw_with_watermark/coffee-lemonade.webp', [
        'public/images/menu/drinks/coffee-lemonade.webp',
        'public/assets/clavicula/drinks/coffee-lemonade.webp'
    ]),
    ('public/images/raw_with_watermark/flavour-americano.webp', [
        'public/images/menu/drinks/flavour-americano.webp',
        'public/assets/clavicula/drinks/flavour-americano.webp'
    ]),
    ('public/images/raw_with_watermark/flavour-latte.webp', [
        'public/images/menu/drinks/flavour-latte.webp',
        'public/assets/clavicula/drinks/flavour-latte.webp'
    ]),
    ('public/images/raw_with_watermark/affogato.webp', [
        'public/images/menu/drinks/affogato.webp',
        'public/assets/clavicula/drinks/affogato.webp'
    ]),
    ('public/images/raw_with_watermark/kopi-susu-ori.webp', [
        'public/images/menu/drinks/kopi-susu-ori.webp',
        'public/assets/clavicula/drinks/kopi-susu-ori.webp'
    ]),
    ('public/images/raw_with_watermark/carcoal-blend.webp', [
        'public/images/menu/drinks/carcoal-blend.webp',
        'public/assets/clavicula/drinks/charcoal-blend.webp'
    ]),
    
    # Foods
    ('public/images/raw_with_watermark/gochucula-chicken-wings.webp', [
        'public/images/menu/foods/gochucula-chicken-wings.webp',
        'public/assets/clavicula/foods/gochucula-chicken-wings.webp'
    ]),
    ('public/images/raw_with_watermark/javanese-fried-noodles.webp', [
        'public/images/menu/foods/javanese-fried-noodles.webp',
        'public/assets/clavicula/foods/javanese-fried-noodles.webp'
    ]),
    ('public/images/raw_with_watermark/yakitori.webp', [
        'public/images/menu/foods/yakitori.webp',
        'public/assets/clavicula/foods/yakitori.webp'
    ]),
    ('public/images/raw_with_watermark/mille-crepes.webp', [
        'public/images/menu/foods/mille-crepes.webp',
        'public/assets/clavicula/foods/mille-crepes.webp'
    ]),
    ('public/images/raw_with_watermark/sate-taichan-mozarella.webp', [
        'public/images/menu/foods/sate-taichan-mozarella.webp',
        'public/assets/clavicula/foods/sate-taichan-mozarella.webp'
    ]),
    ('public/images/raw_with_watermark/dimsum-mentai.webp', [
        'public/images/menu/foods/dimsum-mentai.webp',
        'public/assets/clavicula/foods/dimsum-mentai.webp'
    ]),
    ('public/images/raw_with_watermark/dimsum-ori.webp', [
        'public/images/menu/foods/dimsum-ori.webp',
        'public/assets/clavicula/foods/dimsum-ori.webp'
    ]),
    ('public/images/raw_with_watermark/chicken-katsu-spicy.webp', [
        'public/images/menu/foods/chicken-katsu-spicy.webp',
        'public/assets/clavicula/foods/chicken-katsu-spicy.webp'
    ]),
    ('public/images/raw_with_watermark/chicken-katsu-with-sauce.webp', [
        'public/images/menu/foods/chicken-katsu-with-sauce.webp',
        'public/assets/clavicula/foods/chicken-katsu-with-sauce.webp'
    ]),
    ('public/images/raw_with_watermark/mentai-rice.webp', [
        'public/images/menu/foods/mentai-rice.webp',
        'public/assets/clavicula/foods/mentai-rice.webp'
    ]),
    ('public/images/raw_with_watermark/javanese-fried-rice.webp', [
        'public/images/menu/foods/javanese-fried-rice.webp',
        'public/assets/clavicula/foods/javanese-fried-rice.webp'
    ]),
    ('public/images/raw_with_watermark/hotdog.webp', [
        'public/images/menu/foods/hotdog.webp',
        'public/assets/clavicula/foods/hotdog.webp'
    ]),
    ('public/images/raw_with_watermark/tiramisu-cake.webp', [
        'public/images/menu/foods/tiramisu-cake.webp',
        'public/assets/clavicula/foods/tiramisu-cake.webp'
    ]),
]

print("=== STARTING COMPREHENSIVE WATERMARK REMOVAL ===")
for raw_file, targets in items_to_clean:
    if not os.path.exists(raw_file):
        print(f"[SKIP] Raw file not found: {raw_file}")
        continue
    img = cv2.imread(raw_file)
    if img is None:
        print(f"[ERROR] Could not read {raw_file}")
        continue
        
    has_wm, diff_val = detect_gofood_watermark(img)
    if has_wm or diff_val > 3.0:
        cleaned = remove_gofood_watermark_perfect(img)
        print(f"[CLEANED] {os.path.basename(raw_file)} (initial diff: {diff_val:.2f})")
    else:
        cleaned = img
        print(f"[OK] {os.path.basename(raw_file)} already clean (diff: {diff_val:.2f})")
        
    for target in targets:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        cv2.imwrite(target, cleaned)
        print(f"  -> Wrote {target}")

print("\n=== COMPREHENSIVE WATERMARK REMOVAL COMPLETED ===")
