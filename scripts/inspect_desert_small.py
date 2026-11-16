import os
from PIL import Image

# Let's check the images from 16:18 to 16:24
for i in [
    'Screenshot 2026-11-16 161831.png',
    'Screenshot 2026-11-16 161841.png',
    'Screenshot 2026-11-16 161853.png',
    'Screenshot 2026-11-16 162045.png',
    'Screenshot 2026-11-16 162304.png',
    'Screenshot 2026-11-16 162316.png',
    'Screenshot 2026-11-16 162323.png',
    'Screenshot 2026-11-16 162335.png',
    'Screenshot 2026-11-16 162344.png',
    'Screenshot 2026-11-16 162350.png',
    'Screenshot 2026-11-16 162401.png'
]:
    p = os.path.join('foto_menu_desert', i)
    im = Image.open(p)
    # get average color or save a copy to check
    print(f"{i}: {im.size}")
