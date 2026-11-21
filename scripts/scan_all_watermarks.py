import os
import cv2
import numpy as np

def detect_watermark(img_path):
    img = cv2.imread(img_path)
    if img is None:
        return False, 0.0, "Cannot read"
    h, w = img.shape[:2]
    cx, cy = w / 2.0, h / 2.0
    R = min(h, w) * 0.125
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    in_ring = gray[(dist >= R * 0.82) & (dist <= R * 0.96)]
    out_ring = gray[(dist >= R * 1.04) & (dist <= R * 1.18)]
    if len(in_ring) == 0 or len(out_ring) == 0:
        return False, 0.0, "Ring empty"
    diff = float(np.median(in_ring) - np.median(out_ring))
    return diff > 4.0, diff, f"diff={diff:.2f}"

scan_dirs = [
    'public/images/menu/drinks',
    'public/images/menu/foods',
    'public/assets/clavicula/drinks',
    'public/assets/clavicula/foods'
]

flagged = []
for d in scan_dirs:
    if not os.path.exists(d):
        continue
    for f in sorted(os.listdir(d)):
        if f.endswith(('.webp', '.jpg', '.png')):
            p = os.path.join(d, f)
            has_wm, diff_val, desc = detect_watermark(p)
            print(f"[{'WM' if has_wm else 'OK'}] {p}: {desc}")
            if has_wm:
                flagged.append((p, diff_val))

print(f"\nTotal flagged with watermark: {len(flagged)}")
for p, diff_val in flagged:
    print(f" - {p} (diff={diff_val:.2f})")
