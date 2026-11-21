import cv2
import numpy as np

# Load original raw scapula
raw_path = 'public/images/raw_with_watermark/scapula.webp'
img = cv2.imread(raw_path)
h, w = img.shape[:2]
cx, cy = w / 2.0, h / 2.0
R = min(h, w) * 0.125

print(f"Scapula size: {w}x{h}, center: ({cx}, {cy}), R={R}")

# Let's create a circle mask covering the watermark
# Radius R is around 62.5px. A circle of radius R * 1.05 covers the entire watermark ring
mask = np.zeros((h, w), dtype=np.uint8)
cv2.circle(mask, (int(round(cx)), int(round(cy))), int(round(R * 1.06)), 255, -1)

# Inpaint using cv2.INPAINT_TELEA and cv2.INPAINT_NS
inp_telea = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
inp_ns = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_NS)

# Save both test outputs
cv2.imwrite('scripts/test_scapula_telea.png', inp_telea)
cv2.imwrite('scripts/test_scapula_ns.png', inp_ns)

# What about a refined mask? Only where the white watermark pixels actually are!
# In the circle, the watermark is white/semi-transparent white (higher brightness)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# Let's check difference between inpaint and original inside the circle
diff = cv2.absdiff(gray, cv2.cvtColor(inp_telea, cv2.COLOR_BGR2GRAY))
# Watermark pixels are those where img was significantly brighter than surrounding inpainting
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
in_circle = dist <= R * 1.05

wm_pixels = (img.astype(np.float32) - inp_telea.astype(np.float32)).mean(axis=2)
# Positive difference where watermark is additive white
wm_mask = (wm_pixels > 8) & in_circle
wm_mask_u8 = (wm_mask.astype(np.uint8)) * 255
# Dilate slightly by 2px to ensure full coverage of edges
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
wm_mask_dilated = cv2.dilate(wm_mask_u8, kernel)

# Inpaint only the watermark pixels!
inp_selective = cv2.inpaint(img, wm_mask_dilated, inpaintRadius=4, flags=cv2.INPAINT_TELEA)
cv2.imwrite('scripts/test_scapula_selective.png', inp_selective)

print("Saved test outputs: telea, ns, and selective.")
