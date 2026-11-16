import os
from PIL import Image

files = sorted(os.listdir('foto_menu_desert'))
print("Files in foto_menu_desert:")
for f in files:
    if f.endswith('.png'):
        p = os.path.join('foto_menu_desert', f)
        im = Image.open(p)
        print(f"{f}: size={im.size}")
