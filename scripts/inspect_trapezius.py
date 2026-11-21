import cv2
import numpy as np

img = cv2.imread('public/images/menu/drinks/trapezius.webp')
h, w = img.shape[:2]
cx, cy = w / 2.0, h / 2.0
R = min(h, w) * 0.125
print(f"Trapezius shape: {w}x{h}, cx={cx}, cy={cy}, R={R}")

# Let's check why diff is 15.00
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
in_ring = gray[(dist >= R * 0.82) & (dist <= R * 0.96)]
out_ring = gray[(dist >= R * 1.04) & (dist <= R * 1.18)]
print("In ring median:", np.median(in_ring), "Out ring median:", np.median(out_ring))

# Let's save a crop of the center of trapezius
crop = img[int(cy - R * 1.3):int(cy + R * 1.3), int(cx - R * 1.3):int(cx + R * 1.3)]
cv2.imwrite('scripts/trapezius_crop.png', crop)
print("Saved trapezius center crop to scripts/trapezius_crop.png")
