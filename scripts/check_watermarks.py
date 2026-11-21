import os
from PIL import Image
import numpy as np

# GoFood watermark is a white circle in the center of the image.
# Let's inspect the center of every image and see if there is circular watermark pattern or high brightness circular structure.
dirs_to_check = [
    'public/images/menu/drinks',
    'public/images/menu/foods',
    'public/assets/clavicula/drinks',
    'public/assets/clavicula/foods'
]

for d in dirs_to_check:
    print(f"\nChecking directory: {d}")
    if not os.path.exists(d):
        continue
    for f in sorted(os.listdir(d)):
        if f.endswith(('.webp', '.jpg', '.png')):
            p = os.path.join(d, f)
            im = Image.open(p).convert('RGB')
            arr = np.array(im)
            h, w, _ = arr.shape
            # check center 120x120 pixels
            ch, cw = h // 2, w // 2
            center_patch = arr[ch-50:ch+50, cw-50:cw+50]
            print(f" - {f} ({w}x{h}): center brightness mean={np.mean(center_patch):.1f}")
