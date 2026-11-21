import sys
import os
sys.path.append(os.path.abspath('.'))

import cv2
from scripts.batch_clean_all_watermarks import detect_gofood_watermark, remove_gofood_watermark_perfect

for p in [
    'public/assets/clavicula/drinks/caramel-macchiato.webp',
    'public/assets/clavicula/drinks/charcoal-blend.webp'
]:
    img = cv2.imread(p)
    has_wm, diff = detect_gofood_watermark(img)
    print(f"{p}: has_wm={has_wm}, diff={diff:.2f}")
    if has_wm or diff > 3.0:
        cleaned = remove_gofood_watermark_perfect(img)
        cv2.imwrite(p, cleaned)
        dest = 'public/images/menu/drinks/' + p.split('/')[-1]
        cv2.imwrite(dest, cleaned)
        print(f"Cleaned and saved {p} and {dest}")
