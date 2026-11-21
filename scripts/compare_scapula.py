from PIL import Image
import numpy as np

arr1 = np.array(Image.open('public/assets/clavicula/drinks/scapula.webp'))
arr2 = np.array(Image.open('public/images/menu/drinks/scapula.webp'))

diff = np.abs(arr1.astype(int) - arr2.astype(int))
print("Max diff between assets and images scapula:", np.max(diff), "Mean diff:", np.mean(diff))

# Let's inspect the center region (where watermark is)
h, w, _ = arr2.shape
center = arr2[h//4:3*h//4, w//4:3*w//4]
print("Center shape:", center.shape)
