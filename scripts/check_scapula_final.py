import cv2
import numpy as np

img = cv2.imread('public/images/menu/drinks/scapula.webp')
h, w = img.shape[:2]
cx, cy = w / 2.0, h / 2.0
R = min(h, w) * 0.125

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

in_ring = gray[(dist >= R * 0.85) & (dist <= R * 0.98)]
out_ring = gray[(dist >= R * 1.05) & (dist <= R * 1.18)]
print("In ring median:", np.median(in_ring))
print("Out ring median:", np.median(out_ring))
print("Difference (should be near 0):", np.median(in_ring) - np.median(out_ring))
