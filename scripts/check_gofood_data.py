import json
import os

json_path = 'extracted_gofood_pack/clavicula_gofood_clean_pack/gofood_menu_clean.json'
if os.path.exists(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Total categories: {len(data.get('categories', []))}")
    for cat in data.get('categories', []):
        cat_name = cat.get('name')
        items = cat.get('items', [])
        print(f"\nCategory: {cat_name} ({len(items)} items)")
        for it in items:
            print(f"  - {it.get('name')}: {it.get('price')} | img: {it.get('image')}")
