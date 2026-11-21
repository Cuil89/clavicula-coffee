import cv2
import numpy as np

img_raw = cv2.imread('public/images/raw_with_watermark/scapula.webp')
img_prev = cv2.imread('public/images/menu/drinks/scapula.webp')
img_clean = cv2.imread('scripts/clean_scapula.webp')
img_telea = cv2.imread('scripts/test_scapula_telea.png')

h, w = img_raw.shape[:2]
cx, cy = w // 2, h // 2
R = int(min(h, w) * 0.125)

# Save center comparison side by side
box = (cy - R - 15, cy + R + 15, cx - R - 15, cx + R + 15)
c_raw = img_raw[box[0]:box[1], box[2]:box[3]]
c_prev = img_prev[box[0]:box[1], box[2]:box[3]]
c_clean = img_clean[box[0]:box[1], box[2]:box[3]]
c_telea = img_telea[box[0]:box[1], box[2]:box[3]]

combo = np.hstack([c_raw, c_prev, c_clean, c_telea])
cv2.imwrite('scripts/scapula_comparison.png', combo)
print("Saved comparison side by side: Raw | Prev | Clean Selective | Full Disc Inpaint")
