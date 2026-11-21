import cv2
import numpy as np

img = cv2.imread('public/assets/clavicula/drinks/manubrium-fullcard.jpg')
print("manubrium-fullcard shape:", img.shape)

# Let's inspect the cup in the poster
# Where is the cup located?
# Let's check center of the cup
h, w = img.shape[:2]
# Save the cup crop to inspect
crop = img[int(h*0.35):int(h*0.8), int(w*0.2):int(w*0.8)]
cv2.imwrite('scripts/manubrium_fullcard_cup.png', crop)
print("Saved cup crop to scripts/manubrium_fullcard_cup.png")
