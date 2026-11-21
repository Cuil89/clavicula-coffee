import cv2
import numpy as np

img = cv2.imread('scripts/trapezius_disc_telea.png')
h, w = img.shape[:2]
cx, cy = w // 2, h // 2
R = int(min(h, w) * 0.125)

# Check center patch
patch = img[cy-R:cy+R, cx-R:cx+R]
print("Trapezius inpainted patch std:", np.std(patch))
cv2.imwrite('public/images/menu/drinks/trapezius.webp', img)
cv2.imwrite('public/assets/clavicula/drinks/trapezius.webp', img)
print("Updated trapezius in public/images and public/assets!")
