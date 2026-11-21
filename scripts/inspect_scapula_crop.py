import cv2
import numpy as np

# Let's inspect scapula in both locations
p1 = 'public/assets/clavicula/drinks/scapula.webp'
p2 = 'public/images/menu/drinks/scapula.webp'

img1 = cv2.imread(p1)
img2 = cv2.imread(p2)

print("img1 (assets) shape:", img1.shape)
print("img2 (images) shape:", img2.shape)

# Let's check difference
diff = cv2.absdiff(img1, img2)
print("Max diff:", np.max(diff), "Mean diff:", np.mean(diff))

# Let's check the watermark region in img2:
# Is the circle watermark still visible?
h, w = img2.shape[:2]
cx, cy = w // 2, h // 2
R = int(min(h, w) * 0.125)
print(f"Center ({cx}, {cy}), R={R}")

# Let's crop around center and inspect
crop1 = img1[cy-R-10:cy+R+10, cx-R-10:cx+R+10]
crop2 = img2[cy-R-10:cy+R+10, cx-R-10:cx+R+10]

cv2.imwrite('scripts/scapula_crop_assets.png', crop1)
cv2.imwrite('scripts/scapula_crop_cleaned.png', crop2)
print("Saved crops to scripts/scapula_crop_*.png")
