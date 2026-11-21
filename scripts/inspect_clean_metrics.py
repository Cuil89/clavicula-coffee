import cv2
import numpy as np

img = cv2.imread('scripts/clean_scapula.webp')
h, w = img.shape[:2]
cx, cy = w // 2, h // 2
R = int(min(h, w) * 0.125)

# Check standard deviation and gradient in the center area
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
center_patch = gray[cy-R:cy+R, cx-R:cx+R]
print("Center patch mean:", np.mean(center_patch), "std:", np.std(center_patch))

# Check circular watermark presence in clean_scapula
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
in_ring = gray[(dist >= R * 0.85) & (dist <= R * 0.98)]
out_ring = gray[(dist >= R * 1.05) & (dist <= R * 1.18)]
print("In ring median:", np.median(in_ring), "Out ring median:", np.median(out_ring), "diff:", np.median(in_ring) - np.median(out_ring))
