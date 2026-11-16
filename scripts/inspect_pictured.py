import json
import os

path = 'extracted_gofood_pack/clavicula_gofood_clean_pack/data/clavicula_gofood_pictured_menus_only.json'
with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f)

print(f"Total pictured menus: {len(d.get('pictured_menus', []))}")
for i, m in enumerate(d.get('pictured_menus', []), 1):
    name = m.get('name')
    cat = m.get('category')
    price = m.get('price_gofood_idr')
    img_path = m.get('laravel_public_path')
    exists = os.path.exists(img_path) if img_path else False
    print(f"{i}. [{cat}] {name} (Rp {price:,}) -> {img_path} (exists: {exists})")
