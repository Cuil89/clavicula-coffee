import re
import os

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# find all image paths
imgs = set(re.findall(r'image:\s*"([^"]+)"', text))
imgs.update(re.findall(r'src:\s*"([^"]+)"', text))
imgs.update(re.findall(r'thumb:\s*"([^"]+)"', text))

print("All unique images referenced in src/app/menu/page.tsx:")
for img in sorted(imgs):
    local_path = 'public' + img if img.startswith('/') else os.path.join('public', img)
    exists = os.path.exists(local_path)
    size = os.path.getsize(local_path) if exists else 0
    print(f" - {img} (exists: {exists}, size: {size} bytes)")
