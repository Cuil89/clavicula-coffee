import os
from PIL import Image

folder = 'foto_menu_desert'
if os.path.exists(folder):
    files = [f for f in os.listdir(folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    print(f"Total images in {folder}: {len(files)}")
    for f in files[:10]:
        p = os.path.join(folder, f)
        try:
            with Image.open(p) as img:
                print(f" - {f}: {img.size}, mode: {img.mode}")
        except Exception as e:
            print(f" - {f}: err {e}")
