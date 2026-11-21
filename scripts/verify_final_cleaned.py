import cv2
import numpy as np

# Load scapula.webp
img_scapula = cv2.imread('public/images/menu/drinks/scapula.webp')
h, w = img_scapula.shape[:2]
cx, cy = w // 2, h // 2
R = int(min(h, w) * 0.125)

# Save center 150x150 patch of scapula
crop_scapula = img_scapula[cy-75:cy+75, cx-75:cx+75]
cv2.imwrite('scripts/scapula_final_center.png', crop_scapula)

# Check all drinks in public/images/menu/drinks/
import os
for f in sorted(os.listdir('public/images/menu/drinks')):
    if f.endswith('.webp'):
        im = cv2.imread(os.path.join('public/images/menu/drinks', f))
        print(f"Drink {f}: {im.shape}")

for f in sorted(os.listdir('public/images/menu/foods')):
    if f.endswith('.webp'):
        im = cv2.imread(os.path.join('public/images/menu/foods', f))
        print(f"Food {f}: {im.shape}")
