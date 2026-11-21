import sys
import os
sys.path.append(os.path.abspath('.'))

import cv2
import numpy as np

img = cv2.imread('public/images/raw_with_watermark/trapezius.webp')
h, w = img.shape[:2]
cx, cy = w / 2.0, h / 2.0
R = min(h, w) * 0.125

yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

# Create mask covering R * 1.08
mask = (dist <= R * 1.08).astype(np.uint8) * 255
cleaned_telea = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
cleaned_ns = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_NS)

cv2.imwrite('scripts/trapezius_disc_telea.png', cleaned_telea)
cv2.imwrite('scripts/trapezius_disc_ns.png', cleaned_ns)

from scripts.scan_all_watermarks import detect_watermark
print("Raw:", detect_watermark('public/images/raw_with_watermark/trapezius.webp'))
print("Telea disc:", detect_watermark('scripts/trapezius_disc_telea.png'))
print("NS disc:", detect_watermark('scripts/trapezius_disc_ns.png'))
