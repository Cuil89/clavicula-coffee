import cv2
import numpy as np
import os

items_to_clean_disc = [
    ('public/images/raw_with_watermark/affogato.webp', [
        'public/images/menu/drinks/affogato.webp',
        'public/assets/clavicula/drinks/affogato.webp'
    ]),
    ('public/images/raw_with_watermark/coffee-lemonade.webp', [
        'public/images/menu/drinks/coffee-lemonade.webp',
        'public/assets/clavicula/drinks/coffee-lemonade.webp'
    ]),
    ('public/images/raw_with_watermark/sternum.webp', [
        'public/images/menu/drinks/sternum.webp',
        'public/assets/clavicula/drinks/sternum.webp'
    ]),
    ('public/images/raw_with_watermark/gochucula-chicken-wings.webp', [
        'public/images/menu/foods/gochucula-chicken-wings.webp',
        'public/assets/clavicula/foods/gochucula-chicken-wings.webp'
    ]),
    ('public/images/raw_with_watermark/manubrium.webp', [
        'public/images/menu/drinks/manubrium.webp',
        'public/assets/clavicula/drinks/manubrium.webp'
    ]),
]

for raw_p, targets in items_to_clean_disc:
    if not os.path.exists(raw_p):
        continue
    img = cv2.imread(raw_p)
    if img is None:
        continue
    h, w = img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125
    
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    
    # Inpaint disc
    mask = (dist <= R * 1.08).astype(np.uint8) * 255
    cleaned = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
    
    for t in targets:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        cv2.imwrite(t, cleaned)
        print(f"Inpainted disc and wrote {t}")

print("Completed disc inpainting on remaining flagged items!")
