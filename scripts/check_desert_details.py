import os
from PIL import Image

for f in sorted(os.listdir('foto_menu_desert'))[:12]:
    if f.endswith('.png'):
        p = os.path.join('foto_menu_desert', f)
        im = Image.open(p)
        print(f"{f}: size={im.size}, mode={im.mode}")
